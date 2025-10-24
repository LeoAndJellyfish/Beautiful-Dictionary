// 字典查询Edge Function
export async function onRequestGet(context) {
  const { params } = context;
  const word = params.word;

  if (!word) {
    return new Response(JSON.stringify({ error: "Word parameter is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // 调用外部字典API
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    
    if (!response.ok) {
      return new Response(JSON.stringify({ 
        word: word, 
        meaning: "No definition found" 
      }), {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS"
        }
      });
    }

    const data = await response.json();
    const firstEntry = data[0];
    
    const result = {
      word: word,
      meaning: firstEntry.meanings[0]?.definitions[0]?.definition || "No definition found",
      audio: firstEntry.phonetics[0]?.audio || "No audio found",
      source: "dictionary-api"
    };

    return new Response(JSON.stringify(result), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS"
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      word: word, 
      meaning: "No definition found",
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