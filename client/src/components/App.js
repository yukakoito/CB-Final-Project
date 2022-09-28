import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";

import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Footer from "./Footer";
import Homepage from "./homepage/Homepage";
import Profile from "./profile/Profile";
import Recipes from "./recipes/Recipes";
import Recipe from "./recipe/Recipe";

const App = () => {

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/recipes/:recipe' element={<Recipe />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
