// Edge Functions API服务
// 部署到EdgeOne后，这些URL将自动映射到对应的Edge Functions

const EDGE_FUNCTIONS_BASE_URL = ''; // 部署后自动映射，本地开发时可使用代理

export const fetchWordDefinition = async (word) => {
  if (!word) {
    return { error: "No data found for the given word." };
  }

  try {
    // 调用Edge Functions字典API
    const response = await fetch(`/api/dictionary/${word}`);
    
    if (!response.ok) {
      throw new Error(`Dictionary API returned ${response.status}`);
    }
    
    const data = await response.json();
    return {
      word: word,
      meaning: data.meaning || "No definition found",
      audio: data.audio || "No audio found",
      source: data.source || "edge-function"
    };
  } catch (error) {
    console.error("Dictionary API request failed:", error);
    return { word: word, meaning: "No definition found", error: error.message };
  }
};

export const askOpenAI = async (word) => {
  if (!word) {
    return "请输入要查询的单词";
  }

  try {
    // 调用Edge Functions AI API
    const response = await fetch(`/api/ai/${word}`);
    
    if (!response.ok) {
      throw new Error(`AI API returned ${response.status}`);
    }
    
    const data = await response.json();
    return data.meaning || "获取AI释义失败";
  } catch (error) {
    console.error("AI API request failed:", error);
    return "获取AI释义时出现错误，请稍后重试";
  }
};

// 统一查询函数 - 同时获取字典和AI释义
export const fetchWordWithAI = async (word) => {
  if (!word) {
    return { error: "Word parameter is required" };
  }

  try {
    // 调用Edge Functions统一查询API
    const response = await fetch(`/api/query/${word}`);
    
    if (!response.ok) {
      throw new Error(`Query API returned ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Query API request failed:", error);
    return { 
      word: word, 
      error: "查询过程中出现错误",
      dictionary: { meaning: "查询失败", success: false },
      ai: { meaning: "查询失败", success: false }
    };
  }
};
