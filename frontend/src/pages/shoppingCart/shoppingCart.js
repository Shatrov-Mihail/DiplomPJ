import { useEffect, useState } from "react";
import { H2 } from "../../components";

import styled from "styled-components";
import { request } from "../../utils/request";

const ShoppingCartContainer = ({ className }) => {
  const [shoppingCart, setShoppingCart] = useState([]);

  const calculateTotal = () => {
    return shoppingCart.reduce(
      (total, item) => total + item.postId.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await request("/shoppingCart");
        setShoppingCart(response.map((item) => ({ ...item, quantity: 1 })));
      } catch (error) {
        console.error("Ошибка при получении данных корзины:", error);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = (id, delta) => {
    setShoppingCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: Math.min(999, Math.max(1, item.quantity + delta)),
            }
          : item
      )
    );
  };

  const onPostRemove = async (id) => {
    try {
      await request(`/shoppingCart/${id}`, "DELETE");
      setShoppingCart((prevCart) => prevCart.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Ошибка при удалении из корзины:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      await request("/shoppingCart", "DELETE");
      setShoppingCart([]);
      alert("Заказ оформлен");
    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
    }
  };

  return (
    <div className={className}>
      <H2>Корзина</H2>
      <div className="cart-table">
        <div className="cart-header">
          <div>Изображение</div>
          <div>Наименование</div>
          <div>Количество</div>
          <div>Стоимость</div>
          <div>Удалить</div>
        </div>
        {shoppingCart.map(({ _id, postId, quantity }) => (
          <div className="cart-row" key={_id}>
            <div>
              <img
                src={postId.image}
                alt={postId.title}
                style={{ width: "150px", height: "75px" }}
              />
            </div>
            <div>{postId.title}</div>
            <div>
              <button onClick={() => updateQuantity(_id, -1)}>-</button>
              {quantity}
              <button onClick={() => updateQuantity(_id, 1)}>+</button>
            </div>
            <div>{postId.price * quantity} ₽</div>
            <div>
              <button onClick={() => onPostRemove(_id)}>✖</button>
            </div>
          </div>
        ))}
      </div>
      <h3>Итоговая стоимость: {calculateTotal()} ₽</h3>
      <button onClick={handleCheckout}>Оформить заказ</button>
    </div>
  );
};

export const ShoppingCart = styled(ShoppingCartContainer)`
  margin: 0 auto;
  H2 {
    display: flex;
    justify-content: center;
    font-size: 40px;
  }

  h3 {
    display: flex;
    justify-content: center;
    font-size: 25px;
  }

  .cart-table {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-bottom: 20px;
  }

  .cart-header,
  .cart-row {
    display: contents;
  }

  .cart-header > div,
  .cart-row > div {
    padding: 10px;
    font-size: 20px;
    border-bottom: 1px solid #ccc;
  }

  .cart-header {
    font-weight: bold;
  }

  img {
    object-fit: cover;
  }

  button {
    margin: 0 5px;
    border: none;
    background-color: transparent;
    font-size: 25px;
    cursor: pointer;
  }
  button:hover {
    color: #525252;
  }
`;
