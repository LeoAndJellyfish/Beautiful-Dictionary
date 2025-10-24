import axios from "axios";

export const fetchWordDefinition = async (word) => {
  if (!word) {
    return { error: "No data found for the given word." };
  }

  try {
    // 调用外部字典 API（如 Free Dictionary API）
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = response.data[0];
    return {
      word: word,
      meaning: data.meanings[0]?.definitions[0]?.definition || "No definition found",
      audio: data.phonetics[0]?.audio || "No audio found",
    };
  } catch (error) {
    return { word: word, meaning: "No definition found" };
  }
};
export const askOpenAI = async (word) => {
  if (!word) {
    return "请输入要查询的单词";
  }

  try {
    // 直接调用 01-AI API
    const apiKey = process.env.OPENAI_API_KEY; // 从环境变量获取 API 密钥
    const prompt = `你是一个词典，请给出中文释义: ${word}`;
    
    const response = await axios.post(
      "https://api.lingyiwanwu.com/v1/chat/completions",
      {
        model: "yi-lightning",
        messages: [
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content; // 返回 01-AI 的回应
  } catch (error) {
    console.error("01-AI request failed:", error);
    return "获取AI释义时出现错误，请稍后重试";
  }
};
