import React, { useEffect, useRef } from "react";

const Guide = ({ showGuide, handleGuideClose }) => {
  const guideRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (guideRef.current && !guideRef.current.contains(event.target)) {
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
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)', backdropFilter: 'blur(6px)' }}>
      <div ref={guideRef} className="glass-strong p-8 rounded-3xl w-[520px] max-w-[90vw] shadow-2xl" style={{ transform: 'scale(1.15)' }}>
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#222' }}>新手引导</h2>
        <p className="mb-5 text-base leading-relaxed" style={{ color: '#555' }}>
          欢迎使用 Beautiful Dictionary！以下是一些使用说明：
        </p>
        <ul className="space-y-3 mb-6 text-left pl-2" style={{ color: '#444', fontSize: '15px', lineHeight: '1.7' }}>
          <li className="flex items-start gap-2">
            <span style={{ color: '#999' }}>●</span>
            <span>按下空格键即可快速聚焦到输入框，开始输入单词。</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#999' }}>●</span>
            <span>在搜索栏中输入单词，点击搜索按钮或按下回车键即可查询单词释义。</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#999' }}>●</span>
            <span>点击单词卡片上的「Ask AI」按钮或按下 Tab 键，可以让 AI 解释此单词。</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#999' }}>●</span>
            <span>您可以通过点击右上角的按钮随时查看本引导。</span>
          </li>
        </ul>
        <button
          className="w-full py-3 rounded-xl text-base font-medium text-white hover:brightness-110 active:scale-[0.98] transition-all"
          style={{ background: '#555' }}
          onClick={handleGuideClose}
        >
          知道了
        </button>
      </div>
    </div>
  );
};

export default Guide;
