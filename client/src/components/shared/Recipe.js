import { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { UserContext } from "../UserContext";
import { HiOutlineViewList } from "react-icons/hi";
import { BsSuitHeartFill } from "react-icons/bs";
import { MdOpenInNew } from "react-icons/md";
import { GiMeal, GiNotebook } from "react-icons/gi";
import backupImage from "../../assets/noImage.png";
import Notes from "./Notes";
import IconButton from "./IconButton";
import Modal from "./Modal";

const Recipe = ({ recipe, notes, isSavedRecipe }) => {
  const { updateUser, pantry, shoppingList, userId, setRecipeToAdd } =
    useContext(UserContext);
  const [missingIngredients, setMissingIngredients] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [hideAllIngredients, setHideAllIngredients] = useState(true);
  const [hideIngredientsInPantry, setHideIngredientsInPantry] = useState(true);
  const [editNotes, setEditNotes] = useState(false);
  const [isImgErr, setIsImgErr] = useState(false);
  const imageRef = useRef();
  const [addRecipe, setAddRecipe] = useState(false);

  const iconSize = 30;

  // View details of recipe. It opens a new tab and direct to the source
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Find ingredients that user have at home
  const compareIngredients = () => {
    const newMissingIngredients = [];
    const newAvailableIngredients = [];
    Object.values(recipe.ingredients).forEach((ingredient) => {
      const availableIngredient = pantry.find(
        (item) => item.name.toLowerCase() === ingredient.food.toLowerCase()
      );
      const isInShoppingList = shoppingList.find(
        (item) => item.name.toLowerCase() === ingredient.food.toLowerCase()
      )
        ? true
        : false;
      const missingIngredient = {
        name: ingredient.food.toLowerCase(),
        category: ingredient.foodCategory?.toLowerCase(),
        isInShoppingList: isInShoppingList,
      };
      if (
        availableIngredient &&
        !newAvailableIngredients.find(
          (obj) =>
            obj.name.toLowerCase() === availableIngredient.name.toLowerCase()
        )
      ) {
        newAvailableIngredients.push(availableIngredient);
      } else if (
        !newMissingIngredients.find(
          (obj) =>
            obj.name.toLowerCase() === "water" ||
            obj.name.toLowerCase() === missingIngredient.name.toLowerCase()
        )
      ) {
        newMissingIngredients.push(missingIngredient);
      }
    });
    setAvailableIngredients(newAvailableIngredients);
    setMissingIngredients(newMissingIngredients);
  };

  useEffect(() => {
    recipe && compareIngredients();
  }, [recipe, pantry, shoppingList]);

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

  // Save a recipe when user click on favorites or meals before logging in
  const saveRecipe = (data) => {
    setAddRecipe(true);
    setRecipeToAdd(data);
  };

  // To closeModal and delete the recipe saved in local storage
  const closeModal = () => {
    setAddRecipe(false);
    setRecipeToAdd(null);
  };

  return (
    recipe && (
      <Wrapper>
        <Modal closeModal={closeModal} open={addRecipe} />
        <RecipeHeader>
          <img
            ref={imageRef}
            src={recipe.image}
            alt={recipe.label}
            onError={({ currentTarget }) => {
              isSavedRecipe && !isImgErr
                ? updateImageSource()
                : (currentTarget.src = backupImage);
            }}
          />
          <div>
            <h2>{recipe.label}</h2>
            <p>{recipe.source}</p>
            <p>{formatCuisineType(recipe.cuisineType[0])}</p>
          </div>
        </RecipeHeader>
        <Buttons>
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
        </Buttons>
        {editNotes && <Notes recipe={recipe} />}
        <IngredientWrapper>
          <div>
            <h3>All Ingredients ({recipe.ingredientLines.length})</h3>
            <IconButton
              onClickFunc={setHideAllIngredients}
              data={!hideAllIngredients}
            >
              <HiOutlineViewList size={iconSize} />
            </IconButton>
          </div>
          {!hideAllIngredients &&
            recipe.ingredientLines &&
            recipe.ingredientLines.map((ingredient, i) => (
              <li key={`${recipe.label}-allIngredient-${i}-${ingredient}`}>
                {ingredient}
              </li>
            ))}
        </IngredientWrapper>
        {userId && (
          <IngredientWrapper>
            <div>
              <h3>You have {availableIngredients.length} ingredient(s)</h3>
              <IconButton
                onClickFunc={setHideIngredientsInPantry}
                data={!hideIngredientsInPantry}
              >
                <HiOutlineViewList size={iconSize} />
              </IconButton>
            </div>
            {!hideIngredientsInPantry && (
              <>
                {availableIngredients.map((ingredient) => (
                  <li
                    key={`${recipe.label}-availableIngredients-${ingredient.name}`}
                  >
                    {ingredient.name}
                  </li>
                ))}
                <h3>Do you have any of the following ingredients?</h3>
                {missingIngredients &&
                  missingIngredients.map((ingredient, i) => (
                    <section
                      key={`${recipe.label}-missingIngredients-${ingredient.name}`}
                    >
                      <li>{ingredient.name}</li>
                      <button
                        onClick={() =>
                          updateUser({
                            pantry: Object.fromEntries(
                              Object.entries(ingredient).filter(
                                ([key, value]) => key !== "isInShoppingList"
                              )
                            ),
                          })
                        }
                      >
                        ➕ Pantry
                      </button>
                      <button
                        onClick={() =>
                          updateUser({
                            shoppingList: Object.fromEntries(
                              Object.entries(ingredient).filter(
                                ([key, value]) => key !== "isInShoppingList"
                              )
                            ),
                          })
                        }
                        disabled={ingredient.isInShoppingList ? true : false}
                        style={
                          ingredient.isInShoppingList
                            ? { opacity: "0.3" }
                            : null
                        }
                      >
                        ➕ Shopping List
                      </button>
                    </section>
                  ))}
              </>
            )}
          </IngredientWrapper>
        )}
      </Wrapper>
    )
  );
};

export default Recipe;

const Wrapper = styled.div`
  max-width: 375px;
  min-height: 250px;
  margin: 0 10px 10px 0;
  padding: 5px;
  box-shadow: 1px 2px 3px 3px lightgray;

  @media screen and (min-width: 900px) {
    width: 100%;
    width: 275px;
  }
`;
const RecipeHeader = styled.section`
  display: inline-flex;

  div {
    display: flex;
    flex-flow: column;
    padding: 0 5px;
  }

  h2 {
    margin-bottom: 5px;
  }

  p {
    word-wrap: break-word;
    display: inline-block;
    &:nth-of-type(1) {
      color: gray;
      font-size: smaller;
      margin-bottom: 3px;
    }
  }

  @media screen and (min-width: 900px) {
    display: flex;
    flex-flow: column;
  }

  @media screen and (max-width: 420px) {
    display: flex;
    flex-flow: column;
  }
`;

const IngredientWrapper = styled.ul`
  width: 100%;

  div {
    display: inline-flex;
    align-items: center;
  }
`;

const Buttons = styled.section`
  display: inline-flex;
  justify-self: baseline;
`;
