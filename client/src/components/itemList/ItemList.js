import { useState } from "react";
import styled from "styled-components";
import Typeahead from "./Typeahead";
import Ingredient from "../Ingredient";
import ListActionBar from "./ListActionBar";

const ItemList = ({ data, listName }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

  return (
    data && (
      <Wrapper>
        <Typeahead data={data} listName={listName} />
        <ul>
          {data.length > 0 &&
            data.map((item, i) => (
              <div key={`${listName}-${item.name}`}>
                <CategoryName
                  display={
                    i === 0 || data[i].category !== data[i - 1].category
                      ? null
                      : "none"
                  }
                >
                  {item.category ? item.category.toUpperCase() : "OTHERS"}
                </CategoryName>
                <ListItem>
                  <Ingredient
                    item={item}
                    index={i}
                    listName={listName}
                    isListed={data.includes(item) ? true : false}
                    onMouseEnter={() => setSelectedItemIndex(i)}
                    onMouseLeave={() => setSelectedItemIndex(-1)}
                    selectedItemIndex={selectedItemIndex}
                  />
                  <ListActionBar listName={listName} item={item} />
                </ListItem>
              </div>
            ))}
        </ul>
      </Wrapper>
    )
  );
};

export default ItemList;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-height: calc(100vh - 170px - 90px);

  ul {
    width: 100%;
    padding: 0%;
    overflow: scroll;
    margin-top: 10px;
  }
`;

const CategoryName = styled.h2`
  display: ${(p) => p.display};
  padding: 15px 0 5px 0;
  border-bottom: 2px solid lightgray;
`;

const ListItem = styled.li`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;
