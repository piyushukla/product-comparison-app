import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products/search?q=phone")
      .then((res) => res.json())
      .then((data) => {
        const sliced = data.products.slice(0, 12);
        setProducts(sliced);
      });

    const saved = localStorage.getItem("compareProducts");
    if (saved) {
      setSelected(JSON.parse(saved));
    }
  }, []);

  const toggleCompare = (product) => {
    if (selected.find((item) => item.id === product.id)) {
      const selectProd = selected.filter((item) => item.id !== product.id);
      localStorage.setItem("compareProducts", JSON.stringify(selectProd));
      setSelected([...selectProd]);
    } else if (selected.length < 3) {
      const newSelected = [...selected, product];
      localStorage.setItem("compareProducts", JSON.stringify(newSelected));
      setSelected(newSelected);
    }
  };

  const goToCompare = () => {
    localStorage.setItem("compareProducts", JSON.stringify(selected));
    navigate("/compare");
  };

  const uniqueBrands = ["All", ...new Set(products.map((p) => p.brand))];

  const filteredProducts = products.filter((product) => {
    const matchTitle = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchBrand = brandFilter === "All" || product.brand === brandFilter;
    return matchTitle && matchBrand;
  });

  return (
    <>
      <div className="product-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="product-filter"
        >
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="image-wrapper">
              <img src={product.thumbnail} alt={product.title} />
            </div>
            <h3 className="product-title">{product.title}</h3>
            <p className="product-detail">
              <span className="brand-tag">Brand:</span> {product.brand}
            </p>
            <p className="product-detail" style={{ marginTop: "0px" }}>
              <span className="brand-tag">Price:</span> ${product.price}
            </p>
            <ul className="feature-list">
              <li>{product.category}</li>
              <li>Rating: {product.rating} ⭐</li>
              <li>{product.stock} in stock</li>
            </ul>
            <div className="btn-container">
              <button
                className="cart-btn"
                onClick={() => toggleCompare(product)}
              >
                {selected.find((item) => item.id === product.id)
                  ? "Remove"
                  : "Add to Compare"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected.length >= 2 && (
        <button type="button" className="compare-btn" onClick={goToCompare}>
          Compare Products
        </button>
      )}
    </>
  );
}

export default ProductList;
