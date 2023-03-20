import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Footer from "./Footer";
import Homepage from "./homepage/Homepage";
import MyPage from "./mypage/MyPage";
import { UserContext } from "./UserContext";
import Sidebar from "./Sidebar";

const App = () => {
  const { userId } = useContext(UserContext);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Wrapper>
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={
              userId ? <Navigate replace to={"/mypage"} /> : <Homepage />
            }
          />
          <Route
            path="/mypage"
            element={userId ? <MyPage /> : <Navigate replace to={"/"} />}
          />
        </Routes>
      </Wrapper>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

const Wrapper = styled.div`
  max-width: var(--max-content-width);
  width: 100%;
  min-height: calc(100vh - 170px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 175px;
  grid-template-rows: auto;
  padding: 0 20px;
  gap: 10px;

  @media screen and (max-width: 600px) {
    grid-template-columns: 50px;
  }
`;
