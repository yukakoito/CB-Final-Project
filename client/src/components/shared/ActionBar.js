import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { BsSuitHeartFill } from "react-icons/bs";
import { MdOpenInNew } from "react-icons/md";
import { GiMeal, GiNotebook } from "react-icons/gi";
import IconButton from "./IconButton";
import Notes from "./Notes";

const ActionBar = ({ notes, recipe, setAddRecipe }) => {
  const { updateUser, userId, setRecipeToAdd } = useContext(UserContext);
  const [editNotes, setEditNotes] = useState(false);
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
        <IconButton onClickFunc={openInNewTab} data={recipe.url}>
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
        >
          <GiMeal size={iconSize} />
        </IconButton>
        {notes && (
          <IconButton
            onClickFunc={setEditNotes}
            data={!editNotes}
            color={recipe.notes ? "#e63946" : null}
          >
            <GiNotebook size={iconSize} />
          </IconButton>
        )}
      </div>
      {editNotes && <Notes recipe={recipe} />}
    </Wrapper>
  );
};

export default ActionBar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: inline-flex;
    padding: 5px 0;
  }
`;
