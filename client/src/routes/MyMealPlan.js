import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Recipes from "../components/Recipes";

const MyMealPlan = () => {
  const { mealPlans } = useContext(UserContext);
  return (
    <Wrapper>
      <h1>My Meal Plan For This Week</h1>
      <Recipes recipes={mealPlans} notes={true} isSavedRecipe={true} />
    </Wrapper>
  );
};

export default MyMealPlan;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
