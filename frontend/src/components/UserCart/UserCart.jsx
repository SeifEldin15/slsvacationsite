import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserCart.css';
axios.defaults.withCredentials = true;

const CartItem = ({ item, onQuantityChange, onDelete }) => (
  <div className="cart-item">
    <img src={require(`../media/offers/${item.product_img}`)} alt={item.title} className="item-image" />
    <div className="item-details">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className="item-actions">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onQuantityChange(item.product_id, parseInt(e.target.value))}
        />
        <button className='DeleteBtn' onClick={() => onDelete(item.product_id)}>Delete</button>
      </div>
    </div>
    <div className="item-price">
      $ {parseFloat(item.price).toFixed(2)}
    </div>
  </div>
);

const UserCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getProductsCart', { withCredentials: true });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      await axios.post('http://localhost:5000/updateCartItem', { productId, quantity: newQuantity }, { withCredentials: true });
      setCartItems(cartItems.map(item =>
        item.product_id === productId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/deleteCartItem/${productId}`, {
        withCredentials: true
      });
      setCartItems(cartItems.filter(item => item.product_id !== productId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  

  const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  return (
    <div className="shopping-cart">
      <h3>Shopping Cart</h3>
      {cartItems.map(item => (
        <CartItem
          key={item.product_id}
          item={item}
          onQuantityChange={handleQuantityChange}
          onDelete={handleDelete}
        />
      ))}
      <div className="cart-summary">
        <p>Subtotal ({cartItems.length} items): $ {subtotal.toFixed(2)}</p>
        <button className="proceed-to-buy">Proceed to Buy</button>
      </div>
    </div>
  );
};

export default UserCart;
