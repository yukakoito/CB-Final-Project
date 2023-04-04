import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Recipes from "../components/Recipes";
import NoSavedRecipeMsg from "../components/NoSavedRecipeMsg";

const MyMealPlan = () => {
  const { mealPlans } = useContext(UserContext);
  return (
    <Wrapper>
      <h1>My Meal Plan For This Week</h1>

      {mealPlans.length === 0 ? (
        <NoSavedRecipeMsg />
      ) : (
        <Recipes recipes={mealPlans} isSavedRecipe={true} />
      )}
    </Wrapper>
  );
};

export default MyMealPlan;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
