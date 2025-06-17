import React from "react";

function ComparisonBar({ selected, setSelected }) {
  const clearAll = () => setSelected([]);

  return (
    <div className="comparison-bar">
      <h2>Comparison</h2>
      <div className="compare-table">
        {selected.map((product) => (
          <div key={product.id} className="compare-item">
            <img src={product.thumbnail} alt={product.title} />
            <h4  className="product-title">{product.title}</h4>
            <p className="product-detail"><span>Brand :</span>{" "}{product.brand}</p>
            <p className="product-detail" style={{margin:'0px'}}><span>Price :</span>{" "}${product.price}</p>
            <ul className="feature-list">
              <li>{product.category}</li>
              <li>{product.rating} ⭐</li>
              <li>{product.stock} in stock</li>
            </ul>
            <button
            className="cart-btn" 
              onClick={() =>
                setSelected(selected.filter((p) => p.id !== product.id))
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button onClick={clearAll}>Clear All</button>
    </div>
  );
}

export default ComparisonBar;