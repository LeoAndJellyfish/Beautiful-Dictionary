import React, { useEffect, useRef } from "react";

const Guide = ({ showGuide, handleGuideClose }) => {
  const guideRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (guideRef.current &&!guideRef.current.contains(event.target)) {
        handleGuideClose();
      }
    };

    if (showGuide) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showGuide, handleGuideClose]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50" ref={guideRef} style={{ transform: 'scale(1.3)' }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
        <h2 className="text-3xl font-bold mb-4">新手引导</h2>
        <p className="text-gray-700 mb-4 text-lg">欢迎使用Beautiful Dictionary！以下是一些使用说明：</p>
        <ul className="list-disc pl-8 mb-4 text-lg">
          <li>按下空格键即可快速聚焦到输入框，开始输入单词。</li>
          <li>在搜索栏中输入单词，点击搜索按钮或按下回车键即可查询单词释义。</li>
          <li>点击单词卡片上的“Ask AI”按钮或按下 Tab 键，可以让 AI 解释此单词。</li>
          <li>您可以通过点击右上角的“新手引导”按钮随时查看本引导。</li>
        </ul>
        <button
          className="bg-purple-500 text-white rounded-full px-4 py-2 text-lg font-medium hover:bg-purple-600 transition"
          onClick={handleGuideClose}
        >
          关闭
        </button>
      </div>
    </div>
  );
};

export default Guide;
