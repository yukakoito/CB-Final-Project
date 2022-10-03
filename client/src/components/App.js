import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Footer from "./Footer";
import Homepage from "./homepage/Homepage";
import Profile from "./profile/Profile";
import Recipes from "./recipes/Recipes";
import Recipe from "./recipe/Recipe";
import { UserContext } from "./UserContext";

const App = () => {
  const { userId } = useContext(UserContext);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          {/* <Route path='/profile' element={userId ? <Navigate replace to={'/'} /> : <Profile />} /> */}
          <Route path='/profile' element={<Profile />} />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/recipes/:recipe' element={<Recipe />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
