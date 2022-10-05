import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { UserContext } from "../UserContext";
import { FaRegHeart, FaThList } from "react-icons/fa"

const Recipe = ({recipe}) => {
  const { updateUser, pantry, shoppingList } = useContext(UserContext);
  const [ missingIngredients, setMissingIngredients ] = useState([]);
  const [ availableIngredients, setAvailableIngredients ] = useState([]);
  const [ hideAllIngredients, setHideAllIngredients] = useState(true);
  const [ hideIngredientsInPantry, setHideIngredientsInPantry] = useState(true);

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
      const missingIngredient = {name: ingredient.food.toLowerCase(), category: ingredient.foodCategory, isInShoppingList: isInShoppingList}
      if(availableIngredient && 
        !newAvailableIngredients.find(obj => 
          obj.name.toLowerCase() === availableIngredient.name.toLowerCase())
        ) {
          newAvailableIngredients.push(availableIngredient)
      } else if(!newMissingIngredients.find(obj => 
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

  return recipe && (
    <Wrapper>
      <RecipeHeader>
        <img src={recipe.image} alt={recipe.label} />
        <div>
          <h2>{recipe.label}</h2>
          <p>{recipe.source}</p>
          <span>{recipe.cuisineType}</span>
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
        <button onClick={() => openInNewTab(recipe.url)}>View details</button>
        <button onClick={() => updateUser({'savedRecipes': recipe})}>
          <FaRegHeart />
        </button>
      </Buttons>
    </Wrapper>
  )
}

export default Recipe;

const Wrapper = styled.div`
  width: 350px;
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
`