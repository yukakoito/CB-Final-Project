import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { UserContext } from "../UserContext";
import { HiOutlineViewList } from "react-icons/hi"
import { BsSuitHeartFill } from "react-icons/bs"
import { MdOpenInNew } from "react-icons/md"
import { GiMeal, GiNotebook } from "react-icons/gi"
import backupImage from "./noImage.png"
import Notes from "./Notes";
import IconButton from "./IconButton";

const Recipe = ({recipe, notes}) => {
  const { updateUser, pantry, shoppingList, savedRecipes } = useContext(UserContext);
  const [ missingIngredients, setMissingIngredients ] = useState([]);
  const [ availableIngredients, setAvailableIngredients ] = useState([]);
  const [ hideAllIngredients, setHideAllIngredients ] = useState(true);
  const [ hideIngredientsInPantry, setHideIngredientsInPantry ] = useState(true);
  const [ editNotes, setEditNotes ] = useState(false);

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // To find ingredients user have at home
  const compareIngredients = () => {
    const newMissingIngredients = [];
    const newAvailableIngredients = [];
    Object.values(recipe.ingredients).forEach(ingredient => {
      const availableIngredient = pantry.find(item => item.name.toLowerCase() === ingredient.food.toLowerCase())
      const isInShoppingList = shoppingList.find(item => item.name.toLowerCase() === ingredient.food.toLowerCase())? true: false;
      const missingIngredient = { name: ingredient.food.toLowerCase(), 
                                  category: ingredient.foodCategory?.toLowerCase(), 
                                  isInShoppingList: isInShoppingList
                                }
      if(availableIngredient && 
        !newAvailableIngredients.find(obj => 
          obj.name.toLowerCase() === availableIngredient.name.toLowerCase())
        ) {
          newAvailableIngredients.push(availableIngredient)
      } else if(!newMissingIngredients.find(obj => 
          obj.name.toLowerCase() === 'water' || 
          obj.name.toLowerCase() === missingIngredient.name.toLowerCase())
          ) {
            newMissingIngredients.push(missingIngredient)
          }
    })
    setAvailableIngredients(newAvailableIngredients);
    setMissingIngredients(newMissingIngredients);
  }

  useEffect(() => {
    recipe && compareIngredients();
  }, [recipe, pantry, shoppingList])


  // Capitalise every first letter of each word of cuisineType
  const formatCuisineType = (data) => {
    const arrOfWords = data?.split(' ').map(word => 
                        word.replace(word[0], word[0].toUpperCase())
                      );
    return arrOfWords?.join(' ');
  }

  
  return recipe && (
    <Wrapper>
      <RecipeHeader>
        <img src={recipe.image} alt={recipe.label} onError={({currentTarget}) => {currentTarget.src = backupImage}} />
        <div>
          <h2>{recipe.label}</h2>
          <p>{recipe.source}</p>
          <span>{formatCuisineType(recipe.cuisineType[0])}</span>
        </div>
      </RecipeHeader>
      <IngredientWrapper>
      <div>
      <h3>All Ingredients ({recipe.ingredientLines.length})</h3>
        <IconButton onClickFunc={setHideAllIngredients} data={!hideAllIngredients} >
          <HiOutlineViewList size={30}/>
        </IconButton>
      </div>
      {!hideAllIngredients && recipe.ingredientLines && recipe.ingredientLines.map((ingredient, i) =>
      <li key={`${recipe.label}-allIngredient-${i}-${ingredient}`} >{ingredient}</li>
      )}
      </IngredientWrapper>
      <IngredientWrapper>
        <div>
          <h3>You have {availableIngredients.length} ingredient(s)</h3>
          <IconButton onClickFunc={setHideIngredientsInPantry} data={!hideIngredientsInPantry} >
            <HiOutlineViewList size={30}/>
          </IconButton>
        </div>
        {!hideIngredientsInPantry && (
          <>
        {availableIngredients.map((ingredient) =>
        <li key={`${recipe.label}-availableIngredients-${ingredient.name}`} >{ingredient.name}</li>
        )}
        <h3>Do you have any of the following ingredients?</h3>
        {missingIngredients && missingIngredients.map((ingredient) =>
        <section key={`${recipe.label}-missingIngredients-${ingredient.name}`}>
          <li >{ingredient.name}</li>
          <button onClick={() => updateUser({pantry: Object.fromEntries(Object.entries(ingredient)
                                                      .filter(([key, value]) => key !== 'isInShoppingList'))}
                                            )
                          }
          >
            ➕ Pantry
          </button>
          <button onClick={() => updateUser({shoppingList: Object.fromEntries(Object.entries(ingredient)
                                                            .filter(([key, value]) => key !== 'isInShoppingList'))}
                                            )
                          }
                  disabled={ingredient.isInShoppingList? true : false}
          >
            ➕ Shopping List
          </button>
        </section>
        )}
        </>
        )
      }
      </IngredientWrapper>
      <Buttons>
        <IconButton onClickFunc={openInNewTab} 
                    data={recipe.url}
        >
          <MdOpenInNew size={30}/>
        </IconButton>
        <IconButton onClickFunc={updateUser} 
                    data={{'savedRecipes': {...recipe, isLiked: recipe.isLiked? false : true}}} 
                    color={recipe.isLiked? '#e63946': null}
        >
          <BsSuitHeartFill size={30}/>
        </IconButton>
        <IconButton onClickFunc={updateUser} 
                    data={{'savedRecipes': {...recipe, isPlanned: recipe.isPlanned? false : true}}} 
                    color={recipe.isPlanned? '#e63946': null}
        >
          <GiMeal size={30}/>
        </IconButton>
        {notes && 
          <IconButton onClickFunc={setEditNotes} 
                      data={!editNotes} 
                      color={recipe.notes? '#e63946': null}
          >
            <GiNotebook size={30}/>
          </IconButton>
        }
      </Buttons>
      {editNotes && <Notes recipe={recipe}/>}
    </Wrapper>
  )
}

export default Recipe;

const Wrapper = styled.div`
  width: 350px;
  min-height: 275px;
  border: 10px solid var(--primary-color);
  margin: 5px;
  padding: 5px;
`
const RecipeHeader = styled.section`
  display: inline-flex;
  p {
    color: gray;
  }
`

const IngredientWrapper = styled.ul`
  width: 100%;

  div {
    display: inline-flex;
    align-items: center;
  }
`

const Buttons = styled.section`
  display: inline-flex;
`