import React, { useEffect, useRef, useState } from "react";

const SearchBar = ({ onSearch }) => {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      setQuery(""); // 清空输入框
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      inputRef.current.blur();
      handleSearch();
    }
    if (e.key === "Tab") {
      e.preventDefault(); // 阻止Tab键的默认行为
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " "&& document.activeElement !== inputRef.current) {
        e.preventDefault(); // 阻止空格键的默认行为
        inputRef.current.focus(); // 聚焦到输入框
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-center">
      <div className="w-1/2 bg-white shadow-t rounded-t-3xl px-6 py-4 flex items-center justify-center">
        <input
          ref={inputRef}
          type="text"
          className="flex-grow bg-gray-100 rounded-full px-4 py-2 text-lg border border-gray-300 focus:outline-none"
          placeholder="输入单词..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSearch}
          className="ml-4 bg-purple-500 text-white rounded-full px-6 py-2 text-lg font-medium hover:bg-purple-600 transition"
        >
          搜索
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
