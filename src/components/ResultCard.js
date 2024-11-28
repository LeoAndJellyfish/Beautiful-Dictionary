import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const ResultCard = ({ result, onAskOpenAI, aiResponse }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (result) {
      setShowAnimation(true);
    }
  }, [result]);

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
      <ReactMarkdown>{aiResponse}</ReactMarkdown>
      {/* OpenAI 请求按钮 */}
      <button
        onClick={() => onAskOpenAI(result.word)}
        className="bottom-4 right-4 bg-purple-500 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-purple-600 transition"
      >
        Ask AI
      </button>
    </div>
  );
};

export default ResultCard;
