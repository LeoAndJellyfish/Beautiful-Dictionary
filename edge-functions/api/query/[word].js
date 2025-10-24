// 统一查询Edge Function - 同时获取字典和AI释义
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
    // 并行调用字典API和AI API
    const [dictionaryResponse, aiResponse] = await Promise.allSettled([
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`),
      fetchAIResponse(word, env.OPENAI_API_KEY)
    ]);

    let dictionaryResult = {};
    let aiResult = {};

    // 处理字典API响应
    if (dictionaryResponse.status === 'fulfilled' && dictionaryResponse.value.ok) {
      const data = await dictionaryResponse.value.json();
      const firstEntry = data[0];
      
      dictionaryResult = {
        meaning: firstEntry.meanings[0]?.definitions[0]?.definition || "No definition found",
        audio: firstEntry.phonetics[0]?.audio || "No audio found",
        source: "dictionary-api",
        success: true
      };
    } else {
      dictionaryResult = {
        meaning: "No definition found",
        audio: "No audio found",
        source: "dictionary-api",
        success: false
      };
    }

    // 处理AI API响应
    if (aiResponse.status === 'fulfilled') {
      aiResult = {
        meaning: aiResponse.value,
        source: "ai-api",
        success: true
      };
    } else {
      aiResult = {
        meaning: "获取AI释义失败",
        source: "ai-api",
        success: false
      };
    }

    const result = {
      word: word,
      dictionary: dictionaryResult,
      ai: aiResult,
      timestamp: new Date().toISOString()
    };

    return new Response(JSON.stringify(result), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS"
      }
    });

  } catch (error) {
    console.error("Query request failed:", error);
    
    return new Response(JSON.stringify({ 
      word: word, 
      error: "查询过程中出现错误",
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS"
      }
    });
  }
}

// AI API调用函数
async function fetchAIResponse(word, apiKey) {
  if (!apiKey) {
    throw new Error("API key not configured");
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
    throw new Error(`AI API returned ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || "获取AI释义失败";
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