import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { BsSuitHeartFill } from "react-icons/bs";
import { MdOpenInNew } from "react-icons/md";
import { GiMeal, GiNotebook } from "react-icons/gi";
import IconButton from "../IconButton";
import Notes from "./Notes";

const RecipeActionBar = ({ recipe }) => {
  const { updateUser } = useContext(UserContext);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const { url, isLiked, isPlanned, notes } = recipe;
  const iconSize = 30;

  // View details of recipe. It opens a new tab and direct to the source
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Wrapper>
      <div>
        <IconButton onClickFunc={openInNewTab} data={url} title={`${url}`}>
          <MdOpenInNew size={iconSize} />
        </IconButton>
        <IconButton
          onClickFunc={updateUser}
          data={{
            savedRecipes: {
              ...recipe,
              isLiked: isLiked ? false : true,
            },
          }}
          color={isLiked ? "#e63946" : null}
          title={isLiked ? "Remove from My Favorites" : "Add to My Favorites"}
        >
          <BsSuitHeartFill size={iconSize} />
        </IconButton>
        <IconButton
          onClickFunc={updateUser}
          data={{
            savedRecipes: {
              ...recipe,
              isPlanned: isPlanned ? false : true,
            },
          }}
          color={isPlanned ? "#e63946" : null}
          title={isPlanned ? "Remove from My Meal Plan" : "Add to My Meal Plan"}
        >
          <GiMeal size={iconSize} />
        </IconButton>
        {(isLiked || isPlanned) && (
          <IconButton
            onClickFunc={setIsNotesOpen}
            data={!isNotesOpen}
            color={notes ? "#e63946" : null}
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
