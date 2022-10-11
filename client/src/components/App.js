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
              <Route path='/' element={userId ? <Navigate replace to={'/mypage'} /> : <Homepage />} />
              <Route path='/mypage' element={userId ? <MyPage /> : <Navigate replace to={'/'} />} />
            </Routes>
        </Wrapper>
        <Footer />
      </BrowserRouter>
  );
}

export default App;

const Wrapper = styled.div`
  width: 95vw;
  min-height: 80vh;
  padding: 20px 5vw;
  display: grid;
  grid-template-columns: 175px;
  grid-template-rows: auto;

  @media screen and (max-width: 600px){
    grid-template-columns: 50px;
  }

  @media screen and (min-width: 1200px){
    padding: 20px 20vw;
  }
`