import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const ResultCard = ({ result, onAskOpenAI, aiResponse }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [aing, setaing] = useState(false);

  useEffect(() => {
    if (result) {
      setShowAnimation(true);
    }
  }, [result]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        e.preventDefault(); // 阻止Tab键的默认行为
        if(result && !aing){
          handleAskOpenAI(result.word)
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onAskOpenAI,result,aing]);

  const handleAskOpenAI = (word) => {
    setaing(true); // 开始请求时禁用按钮以及Tab快速询问
    onAskOpenAI(word).finally(() => {
      setaing(false); // 请求完成后启用按钮
    });
  };

  if (!result) {
    return (
      <p className="text-gray-500 text-center text-lg">
        输入一个单词以获取解释。
      </p>
    );
  }
  const handleAnimationEnd = () => {
    setShowAnimation(false);
  };

  return (
    <div
      className={`bg-white shadow-lg rounded-xl p-6 text-center max-w-3xl w-full ${showAnimation? 'fade-in' : ''}`}
      onAnimationEnd={handleAnimationEnd}
      style={{ transform: 'scale(1.5)' }} // 放大单词卡
    >
      <h1 className="text-3xl font-bold text-gray-800">{result.word}</h1>
      <p className="text-2xl text-gray-600 mt-2">{result.meaning}</p>
      <div className="flex justify-center">
        {result.audio !== "No audio found" && (
          <audio key={result.audio} id="myAudio" controls>
            <source src={result.audio} type="audio/mpeg" />
          </audio>
        )}
      </div>
      <ReactMarkdown>{aiResponse}</ReactMarkdown>
      {/* OpenAI 请求按钮 */}
      <button
        onClick={() => handleAskOpenAI(result.word)}
        disabled={aing}
        className={`bottom-4 right-4 bg-purple-500 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-purple-600 transition ${aing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Ask AI
      </button>
    </div>
  );
};

export default ResultCard;
