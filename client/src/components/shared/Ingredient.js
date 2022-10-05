import styled from "styled-components";
import { RiDeleteBin2Line } from "react-icons/ri"

const Ingredient = ({item, onClickFunc, selectedItemIndex, setSelectedItemIndex, index, listName, isListed}) => {
  return item  && (
      <IngredientName onClick={ () => onClickFunc({[listName] : {name: item.name, category: item.category}})}
                      // onMouseEnter={() => setSelectedItemIndex(index)}
                      // onMouseLeave={() => setSelectedItemIndex(-1)}
                      style={{background: index === selectedItemIndex? 'hsla(50deg, 100%, 80%, 0.5)' : 'transparent'}}
                      >
        <span>{item.name.toLowerCase()}</span>
        {isListed && <RiDeleteBin2Line />}
      </IngredientName>
  )
}

export default Ingredient;

const IngredientName = styled.li`
  width: 90%;
  display: inline-flex;
  justify-content: space-between;
  margin: 0 5px;
`