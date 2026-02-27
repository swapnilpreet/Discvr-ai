import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import SearchBox from './componets/SearchBox';
import Product from './componets/Product';

function App() {
  const [products, setProducts] = useState([]);
  const [summary, setSummary] = useState("");
   

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://discvr-ai-backend.vercel.app/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // console.log("Products:", products);
  return (
    <div className="container">
      <h1>AI Discovery</h1>
      <SearchBox setProducts={setProducts} setSummary={setSummary} fetchProducts={fetchProducts}/>
      {summary && <div className="summary">{summary}</div>}
      <Product products={products} />
    </div>
  )
}

export default App
