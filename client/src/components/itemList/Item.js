import styled from "styled-components";
import ListActionBar from "./ListActionBar";

const Item = ({ data, item, index, listName }) => {
  return (
    <Wrapper>
      <CategoryName
        display={
          index === 0 || data[index].category !== data[index - 1].category
            ? null
            : "none"
        }
      >
        {item.category.toUpperCase()}
      </CategoryName>
      <ListItem>
        <span>{item.name}</span>
        <ListActionBar listName={listName} item={item} />
      </ListItem>
    </Wrapper>
  );
};

export default Item;

const Wrapper = styled.li`
  padding: 0 5px;
`;

const CategoryName = styled.h2`
  display: ${(p) => p.display};
  padding: 15px 0 5px 0;
  border-bottom: 2px solid lightgray;
`;

const ListItem = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  overflow-wrap: anywhere;
`;
