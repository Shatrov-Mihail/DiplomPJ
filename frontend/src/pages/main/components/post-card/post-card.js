import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PostCardContainer = ({ className, id, title, imageUrl, additionalImages = [], price }) => {
  const allImages = [imageUrl, ...additionalImages];

  return (
    <div className={className}>
      <Link to={`/post/${id}`} className="post-card-link">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="post-card-swiper"
        >
          {allImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                className="post-image"
                src={img}
                alt={`${title} ${index + 1}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-image.jpg';
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <h4 className="post-title">{title}</h4>
        <div className="post-details">
          <div className="post-card-footer">Цена: {price} руб</div>
        </div>
      </Link>
    </div>
  );
};

export const PostCard = styled(PostCardContainer)`
  border: 3px solid #f0d7a8;
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  width: 32%;


  & .post-card-swiper {
    width: 100%;
    height: 400px;
  }

  & .post-card-link {
    text-decoration: none;
  }

  & .post-card-footer {
    font-size: 20px;
    margin: 3px 0;
    display: flex;
    justify-content: end;
  }

  & .post-details {
    margin-left: 20px;
    margin-top: 20px;
  }

  & .post-title {
    font-size: 25px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 5px;
  }

  & .post-image {
    border-radius: 5px;
    border: 1px solid #f0d7a8;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #f0d7a8;
  }

  .swiper-pagination-bullet-active {
    background: #f0d7a8;
  }
`;

PostCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  additionalImages: PropTypes.arrayOf(PropTypes.string),
  price: PropTypes.number.isRequired,
};
