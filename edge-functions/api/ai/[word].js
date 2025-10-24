// AI释义Edge Function
export async function onRequestGet(context) {
  const { params, env } = context;
  const word = params.word;

  if (!word) {
    return new Response(JSON.stringify({ error: "Word parameter is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // 从环境变量获取API密钥
    const apiKey = env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return new Response(JSON.stringify({ 
        error: "API key not configured" 
      }), {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    const prompt = `你是一个词典，请给出中文释义: ${word}`;
    
    const response = await fetch("https://api.lingyiwanwu.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "yi-lightning",
        messages: [
          { role: "user", content: prompt },
        ],
      })
    });

    if (!response.ok) {
      throw new Error(`AI API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "获取AI释义失败";

    const result = {
      word: word,
      meaning: aiResponse,
      source: "ai-api"
    };

    return new Response(JSON.stringify(result), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS"
      }
    });

  } catch (error) {
    console.error("AI request failed:", error);
    
    return new Response(JSON.stringify({ 
      word: word, 
      meaning: "获取AI释义时出现错误，请稍后重试",
      error: error.message 
    }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS"
      }
    });
  }
}

// 处理OPTIONS请求（CORS预检）
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}