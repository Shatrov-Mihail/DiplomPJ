import { useLayoutEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Error, Header, Footer, Loader } from "./components";
import {
  Authorization,
  Main,
  Product,
  Registration,
  Users,
  ShoppingCart,
} from "./pages";
import { setUser } from "./actions";
import { ERROR } from "./constants";
import styled from "styled-components";

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fffff0;

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

export const Blog = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem("userData");

    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);

    dispatch(
      setUser({
        ...currentUserData,
        roleId: Number(currentUserData.roleId),
      })
    );
  }, [dispatch]);

  return (
    <AppColumn>
		{isLoading && <Loader />}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/users" element={<Users />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/product/:id/edit" element={<Product />} />
          <Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
        </Routes>
      </main>
      <Footer />
    </AppColumn>
  );
};
