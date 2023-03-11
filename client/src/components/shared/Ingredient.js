import styled from "styled-components";
import { RiDeleteBin2Line } from "react-icons/ri";

const Ingredient = ({
  item,
  onClickFunc,
  selectedItemIndex,
  onMouseEnter,
  index,
  onMouseLeave,
  listName,
  isListed,
}) => {
  return (
    item && (
      <IngredientName
        onClick={(e) =>
          onClickFunc({
            [listName]: { name: item.name, category: item.category },
          })
        }
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          background: index === selectedItemIndex ? "#edf2f4" : "transparent",
        }}
      >
        <span>{item.name.toLowerCase()}</span>
        {isListed && <RiDeleteBin2Line />}
      </IngredientName>
    )
  );
};

export default Ingredient;

const IngredientName = styled.li`
  width: 90%;
  display: inline-flex;
  justify-content: space-between;
`;
