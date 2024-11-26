import axios from "axios";

const API_URL = "http://localhost:5000/api/define";

export const fetchWordDefinition = async (word) => {
  try {
    const response = await axios.get(`${API_URL}?word=${word}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching word definition:", error);
    return { word, meaning: "No definition found." };
  }
};
export const askOpenAI = async (word) => {
  try {
    const response = await fetch("http://localhost:5000/api/openai", {
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
