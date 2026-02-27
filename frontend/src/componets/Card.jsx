import React from 'react'

const Card = ({ product }) => {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} srcset="" />
      <h3>{product.name}</h3>
      <p><b>Category:</b> {product.category}</p>
      <p><b>Price:</b> ₹{product.price}</p>
      <p>{product.description}</p>
    </div>
  )
}

export default Card