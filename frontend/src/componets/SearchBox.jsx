import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const SearchBox = ({ setProducts, setSummary, fetchProducts }) => {
  const [query, setQuery] = useState("");

  const handleAsk = async () => {
    const res = await fetch("https://discvr-ai.onrender.com/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();

    setProducts(data.products || []);
    setSummary(data.summary || "");
  };

  //   !query.trim() && alert("Please enter a query"); fefetchProducts();

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setSummary("");
      fetchProducts();
    }
  }, [query]);

  return (
    <div className="ask-box">
      <input
        type="text"
        placeholder="Ask something like 'laptop , mobile, headphones'..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleAsk}>Ask AI</button>
    </div>
  );
};

export default SearchBox;
