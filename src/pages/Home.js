import React, { useState, } from "react";
import Guide from "../components/Guide";
import Header from "../components/Header";
import ResultCard from "../components/ResultCard";
import SearchBar from "../components/SearchBar";
import { askOpenAI, fetchWordDefinition } from "../services/api";

const Home = () => {
  const [result, setResult] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [showGuide, setShowGuide] = useState(false);

  const handleSearch = async (query) => {
    const data = await fetchWordDefinition(query);
    setResult(data);
    setAiResponse("");
  };
  const handleGuideClick = () => {
    setShowGuide(true);
  };
  const handleGuideClose = () => {
    setShowGuide(false);
  };
  const handleAskOpenAI = async (word) => {
    const response = await askOpenAI(word);
    setAiResponse(response);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center px-4 pb-28 pt-2">
        <ResultCard result={result} onAskOpenAI={handleAskOpenAI} aiResponse={aiResponse} />
      </div>
      <SearchBar onSearch={handleSearch} />
      <button
        className="fixed top-5 right-5 glass rounded-xl px-4 py-2 text-xs font-medium hover:brightness-105 active:scale-95 transition-all z-40"
        style={{ color: '#777' }}
        onClick={handleGuideClick}
      >
        新手引导
      </button>
      {showGuide && <Guide showGuide={showGuide} handleGuideClose={handleGuideClose} />}
    </div>
  );
};

export default Home;
