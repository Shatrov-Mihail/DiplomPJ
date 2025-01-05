import { useEffect, useMemo, useState } from "react";
import { CategoryList, Pagination, ProductCard, Search } from "./components";
import { PAGINATION_LIMIT } from "../../constants";
import { debounce } from "./utils";
import styled from "styled-components";
import { request } from "../../utils/request";

const MainContainer = ({ className }) => {
  const [productsList, setProductsList] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchProductsList = async () => {
      try {
        const url = `/productsList?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&sortOrder=${sortOrder}`;
        const response = await request(url);
        const {
          data: { productsList, lastPage },
        } = response;

        const filteredProductsList = categoryFilter
          ? productsList.filter((product) => product.category === categoryFilter)
          : productsList;

        setProductsList(filteredProductsList);
        setLastPage(lastPage);
      } catch (error) {
        console.error("Error fetching productsList:", error);
      }
    };

    fetchProductsList();
  }, [page, searchPhrase, categoryFilter, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const onCategorySearch = (category) => {
    if (isFiltering && categoryFilter === category) {
      setCategoryFilter("");
      setIsFiltering(false);
    } else {
      setSearchPhrase("");
      setShouldSearch(true);
      setCategoryFilter(category);
      setIsFiltering(true);
    }
  };

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value, target.category);
    startDelayedSearch(!shouldSearch);
  };

  return (
    <div className={className}>
      <div className="content">
        <CategoryList
          isFiltering={isFiltering}
          categoryFilter={categoryFilter}
          onCategorySearch={onCategorySearch}
        />
        <div className="productsList-and-search">
          <Search
            searchPhrase={searchPhrase}
            onChange={onSearch}
            toggleSortOrder={toggleSortOrder}
          />
        </div>
      </div>
      <div className="product-list-container">
        {productsList.length > 0 ? (
          <div className="product-list">
            {productsList.map(({ id, title, imageUrl, additionalImages, price }) => (
              <ProductCard
                key={id}
                id={id}
                title={title}
                imageUrl={imageUrl}
                additionalImages={additionalImages}
                price={price}
              />
            ))}
          </div>
        ) : (
          <div className="no-productsList-found">Товар не найден</div>
        )}
      </div>
      <div>
        {lastPage > 1 && productsList.length > 0 && (
          <Pagination page={page} lastPage={lastPage} setPage={setPage} />
        )}
      </div>
    </div>
  );
};

export const Main = styled(MainContainer)`
  .content {
    position: relative;
    padding: 20px;
  }

  & .handbag.active,
  .notebook.active,
  .backpacks.active,
  .belts.active,
  .bracelets.active,
  .keychains.active,
  .purses.active,
  .miscellaneous.active {
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }

  & .category-panel {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-radius: 5px;
    margin: 0 20px;
    gap: 10px;
  }


  & .product-list {
    display: flex;
    flex-wrap: wrap;
    gap: 48px;
    margin: 0 20px auto;
  }

  & .no-productsList-found {
    margin: 0 auto;
    font-size: 30px;
    font-weight: bold;
  }
`;
