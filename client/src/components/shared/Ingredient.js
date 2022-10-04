import styled from "styled-components";
import { MdAddCircleOutline, MdRemoveCircleOutline} from 'react-icons/md'

const Ingredient = ({item, onClickFunc, selectedItemIndex, setSelectedItemIndex, index, listName, isListed}) => {
  return (
    <Wrapper>
      <IngredientName onClick={ () => onClickFunc({[listName] : item})}
                      // onMouseEnter={() => setSelectedItemIndex(index)}
                      // onMouseLeave={() => setSelectedItemIndex(-1)}
                      style={{background: index === selectedItemIndex? 'hsla(50deg, 100%, 80%, 0.5)' : 'transparent'}}
                      >
        <span>{item.name.toLowerCase()}</span>
        {isListed ?
          <span>
            <MdRemoveCircleOutline />
          </span> :
          <span>
            <MdAddCircleOutline />
          </span>
        }
      </IngredientName>
    </Wrapper>
  )
}

export default Ingredient;

const Wrapper = styled.div`

`

const IngredientName = styled.li`
  display: inline-flex;
  justify-content: space-between;
  span {
    border-radius: 5px;
  }
`