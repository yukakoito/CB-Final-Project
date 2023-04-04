import { useContext, useState, useRef } from "react";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import backupImage from "../../assets/noImage.png";
import RecipeActionBar from "./RecipeActionBar";
import AllIngredients from "./AllIngredients";

const Recipe = ({ recipe, isSavedRecipe }) => {
  const { userId } = useContext(UserContext);
  const [isImgErr, setIsImgErr] = useState(false);
  const imageRef = useRef();
  const { image, source, label, cuisineType } = recipe;

  // Capitalise every first letter of each word of cuisineType
  const formatCuisineType = (data) => {
    const arrOfWords = data
      ?.split(" ")
      .map((word) => word.replace(word[0], word[0].toUpperCase()));
    return arrOfWords?.join(" ");
  };

  // Get an updated image sourse if access to the saved image source is denied
  const updateImageSource = () => {
    const query = `userId=${userId}&recipeId=${recipe._id}`;
    fetch(`/api/update-image-source/${query}`)
      .then((res) => res.json())
      .then((data) => {
        // If an updated image source is receved, assign it to imageRef
        if (data.status === 200) {
          return (imageRef.current.src = data.updatedImgSrc);
          // If error, use the backupImage
        } else {
          return (imageRef.current.src = backupImage);
        }
      })
      .catch((err) => (imageRef.current.src = backupImage))
      .finally(setIsImgErr(true));
  };

  return (
    recipe && (
      <Wrapper>
        <RecipeBody>
          <img
            ref={imageRef}
            src={image}
            alt={label}
            onError={({ currentTarget }) => {
              isSavedRecipe && !isImgErr
                ? updateImageSource()
                : (currentTarget.src = backupImage);
            }}
          />
          <div className="recipe-details">
            <h2>{label}</h2>
            <p>{source}</p>
            <p>{formatCuisineType(cuisineType[0])}</p>
          </div>
        </RecipeBody>
        <RecipeFooter>
          <RecipeActionBar recipe={recipe} />
          <AllIngredients recipe={recipe} />
        </RecipeFooter>
      </Wrapper>
    )
  );
};

export default Recipe;

const Wrapper = styled.div`
  width: 100%;
  min-width: var(--min-container-width);
  min-height: var(--min-container-height);
  padding: 5px;
  box-shadow: var(--container-box-shadow);
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  gap: 5px;

  @media screen and (min-width: 700px) {
    flex: 1 1 45%;
  }
`;
const RecipeBody = styled.section`
  display: inline-flex;
  gap: 5px;

  .recipe-details {
    display: flex;
    flex-direction: column;

    h2 {
      margin: 5px 0;
    }

    p {
      word-wrap: break-word;
      display: inline-block;
      overflow-wrap: anywhere;
      &:nth-of-type(1) {
        color: gray;
        font-size: smaller;
        margin-bottom: 3px;
      }
    }
  }

  @media screen and (max-width: 420px) {
    display: flex;
    flex-direction: column;
  }
`;

const RecipeFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 5px;
`;
