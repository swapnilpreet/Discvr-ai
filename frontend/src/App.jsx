import { useState, useEffect } from "react";
import "./App.css";
import SearchBox from "./componets/SearchBox";
import Product from "./componets/Product";

function App() {
  const [products, setProducts] = useState([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false); 

  const fetchProducts = async () => {
    try {
      setLoading(true); 
      const res = await fetch("https://discvr-ai.onrender.com/api/products");
      const data = await res.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1>AI Discovery</h1>

      <SearchBox
        setProducts={setProducts}
        setSummary={setSummary}
        fetchProducts={fetchProducts}
        setLoading={setLoading}
      />

      {loading && <div className="loading">Loading...</div>}

      {summary && <div className="summary">{summary}</div>}

      <Product products={products} />
    </div>
  );
}

export default App;