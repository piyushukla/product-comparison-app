import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ComparePage = () => {
  const [compareItems, setCompareItems] = useState(() => {
    const data = localStorage.getItem("compareProducts");
    return data ? JSON.parse(data) : [];
  });
  const navigate = useNavigate();

  const removeItem = (id) => {
    const updated = compareItems.filter((item) => item.id !== id);
    setCompareItems(updated);
    localStorage.setItem("compareProducts", JSON.stringify(updated));
    if (updated.length === 0) {
      navigate("/");
      localStorage.clear();
    }
  };

  useEffect(()=>{

    if (compareItems.length === 0) {
        navigate("/");
      }
  },[compareItems])

  return (
    <div>
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>
      <h2>Comparison View</h2>
      <button
        className="clear-btn"
        onClick={() => {
          localStorage.removeItem("compareProducts");
          setCompareItems([])
        }}
      >
        Clear All
      </button>

      {compareItems.length === 0 ? (
        <p>No products selected for comparison.</p>
      ) : (
        <>
          <div className="compare-table">
            {compareItems.map((product) => (
              <div key={product.id} className="compare-item">
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
                    onClick={() => removeItem(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Table Below */}
          <h3>Summary Table</h3>
          <div className="comparison-table-wrapper">
            <table className="summary-table comparison-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Stock</th>
                  <th>Discount %</th>
                </tr>
              </thead>
              <tbody>
                {compareItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.brand}</td>
                    <td>${item.price}</td>
                    <td>{item.rating}</td>
                    <td>{item.stock}</td>
                    <td>{item.discountPercentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ComparePage;
