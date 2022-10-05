import { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../DataContext";
import Typeahead from "./Typeahead";
import Ingredient from "../shared/Ingredient";
import { UserContext } from "../UserContext";

const ItemList = ({data, listName}) => {
  const { updateUser } = useContext(UserContext);
  const { searchRecipes } = useContext(DataContext);

  const moveToPantry = (e, item) => {
    e.stopPropagation();
    console.log('ADD TO PANTRY', item)
    updateUser({moveToPantry: item})
  }

  const addToShoppingList = (e, item) => {
    e.stopPropagation();
    console.log('ADD TO SHOPPING LIST', item)
    updateUser({shoppingList: item})
  }

  return (
    <Wrapper>
      <Typeahead data={data} listName={listName} />
        { data.length > 0 && data.map((item, i) => 
        <div key={`${listName}-${item.name}`}>
          <Category display={i === 0 || 
                             data[i].category !== data[i-1].category ?
                             null : 'none'
                            }
                    >
            {item.category? item.category.toUpperCase() : 'OTHERS'}
            </Category>
          <Ingredient 
                      item={item} 
                      onClickFunc={updateUser} 
                      index={i} 
                      listName={listName}
                      isListed={data.includes(item)? true : false}/>
          {listName === 'shoppingList' ?
          <button onClick={(e) => moveToPantry(e, item)}
                  
          >
            ➕ Pantry
          </button> 
          :
          <>
            <button onClick={(e) => addToShoppingList(e, item)}
                    
            >
              ➕ Shopping List
            </button>
            <button onClick={(e) => { e.stopPropagation();
                                      searchRecipes(item.name)
                                    }}
                    
            >
              🔍 Recipes
            </button>
          </>
          }
        </div>
        )}
    </Wrapper>
  )
}

export default ItemList;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
`

const Category = styled.p`
  display: ${p => p.display};
  font-weight: bold;
  margin: 5px;
  border-bottom: 2px solid lightgray;
`