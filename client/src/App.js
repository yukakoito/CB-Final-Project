import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Homepage from "./routes/Homepage";
import { UserContext } from "./contexts/UserContext";
import Sidebar from "./Sidebar";
import MyFavorites from "./routes/MyFavorites";
import MyMealPlan from "./routes/MyMealPlan";
import APIBadge from "./components/APIBadge";

const App = () => {
  const { userId } = useContext(UserContext);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <header>
        <Header />
      </header>
      <Wrapper>
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route
              path="/my-favorites"
              element={userId ? <MyFavorites /> : <Navigate replace to={"/"} />}
            />
            <Route
              path="/my-meal-plan"
              element={userId ? <MyMealPlan /> : <Navigate replace to={"/"} />}
            />
          </Routes>
          <APIBadge />
        </div>
      </Wrapper>
      <footer />
    </BrowserRouter>
  );
};

export default App;

const Wrapper = styled.main`
  max-width: var(--max-content-width);
  width: 100%;
  min-height: calc(100vh - 170px);
  margin: 0 auto;
  padding: 10px 20px;
  gap: 10px;
  display: flex;
  flex-flow: row nowrap;
  position: relative;

  .sidebar {
    width: 185px;
    padding-top: 10px;

    @media screen and (max-width: 600px) {
      width: 35px;
    }
  }

  .main-container {
    width: calc(100% - 185px - 10px);

    @media screen and (max-width: 600px) {
      width: calc(100% - 35px - 10px);
    }
  }
`;
