import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { request } from "../../../../utils";
import { selectUserRole } from "../../../../selectors";
import { ROLE } from "../../../../constants";

const ProductContentContainer = ({
  className,
  product: { id, title, imageUrl, additionalImages = [], content, price },
}) => {
  const navigate = useNavigate();
  const userRole = useSelector(selectUserRole);
  const isAdmin = userRole === ROLE.ADMIN;
  const allImages = [imageUrl, ...additionalImages].filter(Boolean);


  const handleEdit = () => {
    navigate(`/product/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
      try {
        await request(`/productsList/${id}`, "DELETE");
        navigate("/");
      } catch (error) {
        console.error("Ошибка при удалении товара:", error);
      }
    }
  };

  const addToCart = async () => {
    try {
      await request("/shoppingCart", "POST", { productId: id });
      alert("Товар добавлен в корзину");
    } catch (error) {
      console.error("Ошибка при добавлении в корзину:", error);
    }
  };

  return (
    <div className={className}>
      <div className="content-wrapper">
        <div className="image-section">
          <Swiper
            modules={[Navigation, Thumbs]}
            navigation
            spaceBetween={10}
            slidesPerView={1}
            className="main-swiper"
          >
            {allImages.map((src, index) => (
              <SwiperSlide key={index}>
                <img src={src} alt={`${title} ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="info-section">
          <div className="header">
            <h1 className="title">{title}</h1>
            {isAdmin && (
              <div className="admin-controls">
                <button onClick={handleEdit} className="edit-button">
                  <i className="fa fa-edit"></i>
                </button>
                <button onClick={handleDelete} className="delete-button">
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            )}
          </div>

          <div className="description">{content}</div>

          <div className="purchase-section">
            <div className="price">
              <span className="amount">Цена: {price}</span>
              <span className="currency">₽</span>
            </div>
            <button onClick={addToCart} className="cart-button">
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductContent = styled(ProductContentContainer)`
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
  padding: 10px 10px;


  .image-section {
    .main-swiper {
      .swiper-slide {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          object-fit: contain;
        }
      }

      .swiper-button-next,
      .swiper-button-prev {
        color: #000;
        width: 40px;
        height: 40px;


        &::after {
          font-size: 40px;
        }
      }
    }
  }

  .info-section {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 30px;
  }

  .title {
    font-size: 36px;
    font-weight: 600;
    color: #333;
    margin: 0;
    flex: 1;
  }

  .admin-controls {
    display: flex;
    gap: 10px;

    button {
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 18px;
      }
    }

    .edit-button {
      background: #4CAF50;
      color: white;
      &:hover { background: #45a049; }
    }

    .delete-button {
      background: #f44336;
      color: white;
      &:hover { background: #da190b; }
    }
  }

  .description {
    font-size: 18px;
    line-height: 1.6;
    color: #666;
    flex: 1;
    margin-bottom: 40px;
  }

  .purchase-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 20px;
    border-top: 1px solid #eee;
  }

  .price {
    .amount {
      font-size: 32px;
      font-weight: 600;
      color: #333;
    }

    .currency {
      font-size: 24px;
      color: #666;
      margin-left: 5px;
    }
  }

  .cart-button {
    padding: 15px 30px;
    background: #f0d7a8;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 500;
    color: #333;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #e8c88e;
      transform: translateY(-2px);
    }
  }

  @media (max-width: 992px) {
    .content-wrapper {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .image-section {
      .main-swiper {
        max-height: 400px;
      }
    }
  }
`;

ProductContent.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    additionalImages: PropTypes.arrayOf(PropTypes.string),
    content: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
