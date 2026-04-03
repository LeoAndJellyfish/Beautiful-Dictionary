import React, { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const ResultCard = ({ result, onAskOpenAI, aiResponse }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [aing, setaing] = useState(false);

  const handleAskOpenAI = useCallback(
    (word) => {
      setaing(true);
      onAskOpenAI(word).finally(() => {
        setaing(false);
      });
    },
    [onAskOpenAI]
  );

  useEffect(() => {
    if (result) {
      setShowAnimation(true);
    }
  }, [result]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        if (result && !aing) {
          handleAskOpenAI(result.word);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onAskOpenAI, result, aing, handleAskOpenAI]);

  if (!result) {
    return (
      <div className="glass rounded-2xl px-10 py-12 text-center max-w-lg w-full float-animation">
        <p className="text-lg font-light" style={{ color: '#9ca3af' }}>
          输入一个单词以获取解释
        </p>
      </div>
    );
  }

  const handleAnimationEnd = () => {
    setShowAnimation(false);
  };

  return (
    <div
      className={`glass-strong rounded-3xl p-8 text-center max-w-2xl w-full ${showAnimation ? 'fade-in' : ''}`}
      onAnimationEnd={handleAnimationEnd}
      style={{ transform: 'scale(1.35)' }}
    >
      <h1 className="text-3xl font-semibold mb-2" style={{ color: '#222' }}>{result.word}</h1>
      <p className="text-xl font-normal mb-5" style={{ color: '#666' }}>{result.meaning}</p>
      <div className="flex justify-center mb-5">
        {result.audio && result.audio !== "No audio found" && (
          <audio key={result.audio} id="myAudio" controls className="rounded-lg">
            <source src={result.audio} type="audio/mpeg" />
          </audio>
        )}
      </div>
      <div className="text-left mb-6 prose prose-sm max-w-none" style={{ color: '#444' }}>
        <ReactMarkdown>{aiResponse}</ReactMarkdown>
      </div>
      <button
        onClick={() => handleAskOpenAI(result.word)}
        disabled={aing}
        className={`px-6 py-2.5 rounded-xl text-sm font-medium text-white hover:brightness-110 active:scale-95 transition-all ${
          aing ? 'opacity-45 cursor-not-allowed' : ''
        }`}
        style={{ background: '#555' }}
      >
        {aing ? '思考中...' : 'Ask AI'}
      </button>
    </div>
  );
};

export default ResultCard;
