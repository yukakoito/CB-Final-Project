import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import Pantry from "./Pantry";
import ShoppingList from "./ShoppingList";
import SavedRecipes from "./SavedRecipes";

const Profile = () => {
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
  padding: var(--wrapper-padding);
  min-height: 80vh;
`
const Container = styled.div`
  display: inline-flex;
  
`