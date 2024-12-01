import React, { useState, } from "react";
import Header from "../components/Header";
import ResultCard from "../components/ResultCard";
import SearchBar from "../components/SearchBar";
import { askOpenAI, fetchWordDefinition } from "../services/api";

const Home = () => {
  const [result, setResult] = useState(null); // 单词查询结果
  const [aiResponse, setAiResponse] = useState(""); // OpenAI 的回应

  const handleSearch = async (query) => {
    const data = await fetchWordDefinition(query);
    setResult(data);
    setAiResponse(""); // 清除 AI 响应
  };

  const handleAskOpenAI = async (word) => {
    const response = await askOpenAI(word);
    setAiResponse(response); // 设置 OpenAI 的返回结果
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-pink-50 text-gray-900">
      {/* 顶部标题 */}
      <Header />
      {/* 主内容 */}
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <ResultCard result={result} onAskOpenAI={handleAskOpenAI} aiResponse={aiResponse} />
      </div>
      {/* 底部搜索栏 */}
      <SearchBar onSearch={handleSearch} />
    </div>
  );
};

export default Home;
