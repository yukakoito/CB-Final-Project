import styled from "styled-components";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Pantry from "./Pantry";
import ItemList from "./ItemList";
import { UserContext } from "../UserContext";
import ShoppingList from "./ShoppingList";
import SavedRecipes from "./SavedRecipes";

const Profile = () => {
  const { userId } = useParams();
  const {pantry, shoppingList} = useContext(UserContext)

  return (
    <Wrapper>
      <h1>Profile Page</h1>
      <Container>
        <Pantry data={pantry} />
        <ShoppingList data={shoppingList} />
        <SavedRecipes />
      </Container>
    </Wrapper>
  )
}

export default Profile;

const Wrapper = styled.div`
`
const Container = styled.div`
  display: inline-flex;
`