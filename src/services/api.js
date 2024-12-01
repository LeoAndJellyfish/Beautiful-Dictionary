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
    };
  } catch (error) {
    return { word: word, meaning: "No definition found" };
  }
};
export const askOpenAI = async (word) => {
  try {
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: `给出中文释义: ${word}` }),
    });

    const data = await response.json();
    return data.response; // 返回 OpenAI 的回应
  } catch (error) {
    console.error("Failed to fetch OpenAI response:", error);
    return "There was an error fetching OpenAI's response.";
  }
};
