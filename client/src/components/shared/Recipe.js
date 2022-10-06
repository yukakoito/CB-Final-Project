import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { UserContext } from "../UserContext";
import { FaRegHeart, FaThList } from "react-icons/fa"
import { MdOpenInNew } from "react-icons/md"
import { GiMeal, GiNotebook } from "react-icons/gi"
import backupImage from "./anh-nguyen-kcA-c3f_3FE-unsplash.jpeg"
import Notes from "./Notes";

const Recipe = ({recipe, notes}) => {
  const { updateUser, pantry, shoppingList } = useContext(UserContext);
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
        {/* <img src={recipe.image} alt={recipe.label} onError={({currentTarget}) => {currentTarget.src = backupImage }} /> */}
        <div>
          <h2>{recipe.label}</h2>
          <p>{recipe.source}</p>
          <span>{formatCuisineType(recipe.cuisineType[0])}</span>
        </div>
      </RecipeHeader>
      <IngredientWrapper>
      <h3>
        All Ingredients ({recipe.ingredientLines.length})
        <button onClick={() => setHideAllIngredients(!hideAllIngredients)}>
          <FaThList />
        </button>
      </h3>
      {!hideAllIngredients && recipe.ingredientLines && recipe.ingredientLines.map((ingredient, i) =>
      <li key={`${recipe.label}-allIngredient-${i}-${ingredient}`} >{ingredient}</li>
      )}
      </IngredientWrapper>
      <IngredientWrapper>      
        <h3>You have {availableIngredients.length} ingredient(s)
          <button onClick={() => setHideIngredientsInPantry(!hideIngredientsInPantry)}>
            <FaThList />
          </button>
        </h3>
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
        <button onClick={() => openInNewTab(recipe.url)}>
          {/* View details */}
          <MdOpenInNew />
        </button>
        <button onClick={() => updateUser({'savedRecipes': recipe})}>
          <FaRegHeart />
        </button>
        <button onClick={() => updateUser({'meals': recipe})}>
          <GiMeal />
        </button>
        {notes && 
          <button onClick={() => setEditNotes(!editNotes)}>
            <GiNotebook />
          </button>
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
`

const Buttons = styled.section`
  button {
    /* border-radius: 50%;
    padding: 5px; */
  }
`