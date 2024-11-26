const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

// 配置环境变量
dotenv.config();

const app = express();
const PORT = 5000;


// Middleware
app.use(cors());
app.use(express.json());

// 路由：查询单词定义
app.get("/api/define", async (req, res) => {
  const { word } = req.query;

  if (!word) {
    return res.status(400).json({ error: "Word query parameter is required" });
  }

  try {
    // 调用外部字典 API（如 Free Dictionary API）
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = response.data[0];
    res.json({
      word: data.word,
      meaning: data.meanings[0]?.definitions[0]?.definition || "No definition found",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch word definition" });
  }
});

// 路由：调用 OpenAI API
app.post("/api/openai", async (req, res) => {
  const { prompt } = req.body;
  apiKey = process.env.OPENAI_API_KEY; // 从 .env 文件加载 API 密钥
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // 调用 OpenAI API 获取回应
    const data = {
      model: "yi-lightning",
      messages: [
        { role:"user", content: prompt},
      ],
    };
    const response = await axios.post(
      "https://api.lingyiwanwu.com/v1/chat/completions",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
      }
    );
    // 返回 OpenAI 的回应
    res.json({
      response: response.data.choices[0].message.content
    });
  } catch (error) {
    console.error("OpenAI request failed:", error);
    res.status(500).json({ error: "Failed to fetch OpenAI response" });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});