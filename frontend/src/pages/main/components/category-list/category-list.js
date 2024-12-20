import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const CategoryListContainer = ({
  className,
  isFiltering,
  categoryFilter,
  onCategorySearch,
}) => {
  return (
    <div className="category-panel">
      <Link
        className={`handbag ${
          isFiltering && categoryFilter === "handbag" ? "active" : ""
        }`}
        onClick={() => onCategorySearch("handbag")}
      >
        <h2>Сумки</h2>
      </Link>
      <Link
        className={`notebook ${
          isFiltering && categoryFilter === "notebook" ? "active" : ""
        }`}
        onClick={() => onCategorySearch("notebook")}
      >
        <h2>Тетради</h2>
      </Link>
      <Link
        className={`backpacks ${
          isFiltering && categoryFilter === "backpacks" ? "active" : ""
        }`}
        onClick={() => onCategorySearch("backpacks")}
      >
        <h2>Рюкзаки</h2>
      </Link>
      <Link
        className={`belts ${
          isFiltering && categoryFilter === "belts" ? "active" : ""
        }`}
        onClick={() => onCategorySearch("belts")}
      >
        <h2>Ремни</h2>
      </Link>
      <Link
        className={`bracelets ${
          isFiltering && categoryFilter === "bracelets" ? "active" : ""
        }`}
        onClick={() => onCategorySearch("bracelets")}
      >
        <h2>Браслеты</h2>
      </Link>
      <Link
        className={`keychains ${
          isFiltering && categoryFilter === "keychains" ? "active" : ""
        }`}
        onClick={() => onCategorySearch("keychains")}
      >
        <h2>Ключницы</h2>
      </Link>
      <Link
        className={`purses ${
          isFiltering && categoryFilter === "purses" ? "active" : ""
        }`}
        onClick={() => onCategorySearch("purses")}
      >
        <h2>Кошельки</h2>
      </Link>
      <Link
        className={`miscellaneous ${
          isFiltering && categoryFilter === "miscellaneous" ? "active" : ""
        }`}
        onClick={() => onCategorySearch("miscellaneous")}
      >
        <h2>Прочее</h2>
      </Link>
    </div>
  );
};

export const CategoryList = styled(CategoryListContainer)`
`;

CategoryList.propTypes = {
  className: PropTypes.string,
  isFiltering: PropTypes.bool,
  categoryFilter: PropTypes.string,
  onCategorySearch: PropTypes.func,
};
