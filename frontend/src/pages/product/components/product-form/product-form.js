import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveProductAsync } from "../../../../actions";
import { sanizeContent } from "./utils";
import styled from "styled-components";
import { PROP_TYPE } from "../../../../constants";

const ProductFormContainer = ({
  className,
  product: { id, title, imageUrl, additionalImages = [], content, category, price },
}) => {
  const [uploadedImages, setUploadedImages] = useState(
    [imageUrl, ...additionalImages].filter(Boolean)
  );
  const [titleValue, setTitleValue] = useState(title);
  const [categoryValue, setCategoryValue] = useState(category);
  const [priceValue, setPriceValue] = useState(price?.toString() || "");
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    setTitleValue(title);
    setCategoryValue(category);
    setPriceValue(price?.toString() || "");
  }, [title, category, price]);

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setUploadedImages((prev) => [...prev, ...data.paths]);
    } catch (error) {
      console.error('Ошибка загрузки изображений:', error);
      alert('Ошибка при загрузке изображений');
    }
  };

  const handleImageDelete = (indexToDelete) => {
    setUploadedImages(prevImages =>
      prevImages.filter((_, index) => index !== indexToDelete)
    );
  };

  const onSave = async () => {
    if (!categoryValue || uploadedImages.length === 0) {
      alert("Выберите категорию и загрузите хотя бы одно изображение");
      return;
    }

    const numericPrice = Number(priceValue);
    if (isNaN(numericPrice) || numericPrice < 0) {
      alert("Пожалуйста, введите корректную цену");
      return;
    }

    const newContent = sanizeContent(contentRef.current.innerHTML);
    const productData = {
      imageUrl: uploadedImages[0],
      additionalImages: uploadedImages.slice(1),
      title: titleValue,
      content: newContent,
      category: categoryValue,
      price: numericPrice,
    };

    try {
      const savedProduct = await dispatch(saveProductAsync(id, productData));
      if (savedProduct) {
        navigate(`/product/${savedProduct.id}`);
      }
    } catch (error) {
      console.error('Ошибка при сохранении товара:', error);
      alert('Произошла ошибка при сохранении товара');
    }
  };

  const onTitleChange = ({ target }) => setTitleValue(target.value);
  const onCategoryChange = ({ target }) => setCategoryValue(target.value);
  const onPriceChange = ({ target }) => setPriceValue(target.value);



  return (
    <div className={className}>
      <h2 className="form-header">
        {id ? "Редактирование товара" : "Добавление нового товара"}
      </h2>

      <div className="form-section upload-section">
        <label className="upload-button">
          <i className="fa fa-upload"></i> Загрузить изображения
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>

        <div className="image-preview">
          {uploadedImages.map((img, index) => (
            <div key={index} className="preview-item">
              <img src={img} alt={`Preview ${index + 1}`} />
              <button
                className="delete-image-button"
                onClick={() => handleImageDelete(index)}
                type="button"
              >
                <i className="fa fa-times"></i>
              </button>
              {index === 0 && (
                <span className="main-image-label">Главное изображение</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="form-section">
        <input
          type="text"
          value={titleValue}
          placeholder="Название товара..."
          onChange={onTitleChange}
        />
      </div>

      <div className="category-price-section">
        <select value={categoryValue} onChange={onCategoryChange}>
          <option value="">Выберите категорию</option>
          <option value="handbag">Сумки</option>
          <option value="notebook">Тетради</option>
          <option value="backpacks">Рюкзаки</option>
          <option value="belts">Ремни</option>
          <option value="bracelets">Браслеты</option>
          <option value="keychains">Ключницы</option>
          <option value="purses">Кошельки</option>
          <option value="miscellaneous">Прочее</option>
        </select>

        <input
          type="number"
          value={priceValue}
          placeholder="Цена..."
          onChange={onPriceChange}
        />
      </div>

      <div
        ref={contentRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="product-text"
        placeholder="Описание товара..."
      >
        {content}
      </div>

      <div className="buttons-section">
        <button className="cancel-button" onClick={() => navigate(-1)}>
          <i className="fa fa-times"></i> Отмена
        </button>
        <button className="save-button" onClick={onSave}>
          <i className="fa fa-save"></i> Сохранить
        </button>
      </div>
    </div>
  );
};

export const ProductForm = styled(ProductFormContainer)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
  background: transparent;

  .form-header {
    margin-bottom: 30px;
    text-align: center;
    font-size: 28px;
    color: #333;
  }

  .form-section {
    margin-bottom: 25px;
  }

  .upload-section {
    margin-bottom: 30px;

    .upload-button {
      display: inline-block;
      padding: 12px 24px;
      background: #f0d7a8;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s;
      border: 2px dashed #d4b785;

      &:hover {
        background: #e8c88e;
      }

      input[type="file"] {
        display: none;
      }
    }
  }

  .image-preview {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    margin: 20px 0;

    .preview-item {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

      &:hover .delete-image-button {
        opacity: 1;
      }

      img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        display: block;
      }

      .delete-image-button {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 24px;
        height: 24px;
        border-radius: 20%;
        background: transparent;
        color: black;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s, background-color 0.3s;

        i {
          font-size: 25px;
        }
      }

      .main-image-label {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(240, 215, 168, 0.9);
        color: #333;
        text-align: center;
        padding: 5px;
        font-size: 12px;
        font-weight: bold;
      }
    }
  }

  input[type="text"],
  input[type="number"],
  select,
  textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid #f0d7a8;
    border-radius: 4px;
    font-size: 16px;
    margin-bottom: 15px;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: #d4b785;
    }
  }

  select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 12px;
    padding-right: 40px;
  }

  .product-text {
    min-height: 200px;
    border: 2px solid #f0d7a8;
    border-radius: 4px;
    padding: 12px;
	background: #fff;
    font-size: 16px;
    margin-bottom: 20px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #d4b785;
    }
  }

  .buttons-section {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    button {
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.3s;
      display: flex;
      align-items: center;
      gap: 8px;

      &.save-button {
        background: #f0d7a8;
        color: black;

        &:hover {
          background: #45a049;
        }
      }

      &.cancel-button {
        background: #f0d7a8;
        color: black;

        &:hover {
          background: #da190b;
        }
      }
    }
  }

  .category-price-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }

  .error-message {
    color: #f44336;
    font-size: 14px;
    margin-top: -10px;
    margin-bottom: 15px;
  }

  .success-message {
    color: #4CAF50;
    font-size: 14px;
    margin-bottom: 15px;
    text-align: center;
  }
`;

ProductForm.propTypes = {
  product: PROP_TYPE.POST.isRequired,
};
