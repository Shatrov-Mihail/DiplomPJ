import { useEffect, useMemo, useState } from "react";
import { CategoryList, Pagination, PostCard, Search } from "./components";
import { PAGINATION_LIMIT } from "../../constants";
import { debounce } from "./utils";
import styled from "styled-components";
import { request } from "../../utils/request";

const MainContainer = ({ className }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = `/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&sortOrder=${sortOrder}`;
        const response = await request(url);
        const {
          data: { posts, lastPage },
        } = response;

        const filteredPosts = categoryFilter
          ? posts.filter((post) => post.category === categoryFilter)
          : posts;

        setPosts(filteredPosts);
        setLastPage(lastPage);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
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
        <div className="posts-and-search">
          <Search
            searchPhrase={searchPhrase}
            onChange={onSearch}
            toggleSortOrder={toggleSortOrder}
          />
        </div>
      </div>
      <div className="post-list-container">
        {posts.length > 0 ? (
          <div className="post-list">
            {posts.map(({ id, title, imageUrl, additionalImages, price }) => (
              <PostCard
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
          <div className="no-posts-found">Товар не найден</div>
        )}
      </div>
      <div>
        {lastPage > 1 && posts.length > 0 && (
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


  & .post-list {
    display: flex;
    flex-wrap: wrap;
    gap: 48px;
    margin: 0 20px auto;
  }

  & .no-posts-found {
    margin: 0 auto;
    font-size: 30px;
    font-weight: bold;
  }
`;
