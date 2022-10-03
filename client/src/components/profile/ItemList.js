import { useContext } from "react";
import styled from "styled-components";
import Typeahead from "../search/Typeahead";
import Ingredient from "../shared/Ingredient";
import { UserContext } from "../UserContext";

const ItemList = ({data, listName}) => {
  const {updateUser} = useContext(UserContext);

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

  const sortListItems = (arr) => {
    return arr.sort((a, b) => {
      switch(true) {
        case a.category < b.category:
          return -1;
        case a.category > b.category:
          return 1;
        default: 
          return 0;
      }
    })
  }

  return (
    <Wrapper>
      <Typeahead data={data} listName={listName} />
      <Container>
        { data.length > 0 && sortListItems(data).map((item, i) => 
        <>
          <Category display={i === 0 || 
                             data[i].category !== data[i-1].category ?
                             null : 'none'
                            }
                    key={`category-${item._id}`}>
            {item.category? item.category : 'Others'}
            </Category>
          <Ingredient key={`${data}-${item._id}`}
                      item={item} 
                      onClickFunc={updateUser} 
                      index={i} 
                      listName={listName}
                      isListed={data.includes(item)? true : false}/>
          {listName === 'shoppingList' ?
          <button onClick={(e) => moveToPantry(e, item)}>
            Add to Pantry
          </button> :
          <button onClick={(e) => addToShoppingList(e, item)}>
            Add to Shopping List
          </button>
          }
        </>
        )}
      </Container>
    </Wrapper>
  )
}

export default ItemList;

const Wrapper = styled.div`
  border: 1px solid lightgray;
`

const Container = styled.ul`
  border: 1px solid blue;
`

const Category = styled.p`
  display: ${p => p.display};
  font-weight: bold;
`