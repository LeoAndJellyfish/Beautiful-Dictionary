import React, { useEffect, useRef, useState } from "react";

const SearchBar = ({ onSearch }) => {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      setQuery("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      inputRef.current.blur();
      handleSearch();
    }
    if (e.key === "Tab") {
      e.preventDefault();
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " " && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-center pb-5 px-4">
      <div className="glass-strong w-full md:w-[560px] max-w-3xl rounded-2xl px-5 py-4 flex items-center gap-3">
        <input
          ref={inputRef}
          type="text"
          className="flex-grow bg-white/60 backdrop-blur-sm rounded-xl px-5 py-3 text-base border border-black/8 placeholder:text-[#b0b5bf] focus:bg-white/80 focus:border-gray-300 focus:ring-2 focus:ring-gray-200/80 transition-all duration-300"
          style={{ color: '#374151' }}
          placeholder="输入单词..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSearch}
          className="px-7 py-3 rounded-xl text-base font-medium text-white whitespace-nowrap hover:brightness-110 active:scale-95"
          style={{ background: '#555' }}
        >
          搜索
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
