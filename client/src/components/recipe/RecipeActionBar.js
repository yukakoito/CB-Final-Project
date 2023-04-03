import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { BsSuitHeartFill } from "react-icons/bs";
import { MdOpenInNew } from "react-icons/md";
import { GiMeal, GiNotebook } from "react-icons/gi";
import IconButton from "../IconButton";
import Notes from "./Notes";

const RecipeActionBar = ({ notes, recipe, setAddRecipe }) => {
  const { updateUser, userId, setRecipeToAdd } = useContext(UserContext);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const iconSize = 30;

  // View details of recipe. It opens a new tab and direct to the source
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Save a recipe when user click on favorites or meals before logging in
  const saveRecipe = (data) => {
    setAddRecipe(true);
    setRecipeToAdd(data);
  };

  return (
    <Wrapper>
      <div>
        <IconButton
          onClickFunc={openInNewTab}
          data={recipe.url}
          title={`${recipe.url}`}
        >
          <MdOpenInNew size={iconSize} />
        </IconButton>
        <IconButton
          onClickFunc={userId ? updateUser : saveRecipe}
          data={{
            savedRecipes: {
              ...recipe,
              isLiked: recipe.isLiked ? false : true,
            },
          }}
          color={recipe.isLiked ? "#e63946" : null}
          title={
            recipe.isLiked ? "Remove from My Favorites" : "Add to My Favorites"
          }
        >
          <BsSuitHeartFill size={iconSize} />
        </IconButton>
        <IconButton
          onClickFunc={userId ? updateUser : saveRecipe}
          data={{
            savedRecipes: {
              ...recipe,
              isPlanned: recipe.isPlanned ? false : true,
            },
          }}
          color={recipe.isPlanned ? "#e63946" : null}
          title={
            recipe.isPlanned
              ? "Remove from My Meal Plan"
              : "Add to My Meal Plan"
          }
        >
          <GiMeal size={iconSize} />
        </IconButton>
        {notes && (
          <IconButton
            onClickFunc={setIsNotesOpen}
            data={!isNotesOpen}
            color={recipe.notes ? "#e63946" : null}
            title={isNotesOpen ? "Close Notes" : "Open Notes"}
          >
            <GiNotebook size={iconSize} />
          </IconButton>
        )}
      </div>
      {isNotesOpen && <Notes recipe={recipe} />}
    </Wrapper>
  );
};

export default RecipeActionBar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: inline-flex;
    padding: 5px 0;
  }
`;
