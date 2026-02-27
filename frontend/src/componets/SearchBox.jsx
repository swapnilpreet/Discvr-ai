import React, { useState, useEffect } from "react";

const SearchBox = ({ setProducts, setSummary, fetchProducts, setLoading }) => {
  const [query, setQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false); 

  const handleAsk = async () => {
    if (!query.trim()) return;

    try {
      setSearchLoading(true);
      setLoading(true);

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
    } catch (error) {
      console.error("Error asking AI:", error);
    } finally {
      setSearchLoading(false);
      setLoading(false);
    }
  };

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
        placeholder="Ask something like 'laptop, mobile, headphones'..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleAsk} disabled={searchLoading}>
        {searchLoading ? "Searching..." : "Ask AI"}
      </button>
    </div>
  );
};

export default SearchBox;