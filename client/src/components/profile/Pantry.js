import styled from "styled-components";
import ItemList from "./ItemList";
import { FaThList } from "react-icons/fa"
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

const Pantry = ({data}) => {
  const [hidePantry, setHidePantry] = useState(true);
  const { isAuthenticated } = useContext(UserContext);

  return (
    <Wrapper>
      <Title>
        <h1>My Pantry</h1>
        <button onClick={() => setHidePantry(!hidePantry)}
                disabled={isAuthenticated? false : true}
        >
          <FaThList />
        </button>
      </Title>
      { !hidePantry &&
        <ItemList data={data} listName='pantry'/>
      }
    </Wrapper>
  )
}

export default Pantry;

const Wrapper = styled.div`
  border: 1px solid lightgray;
  width: 300px;
  padding: 5px 10px;
`
const Title = styled.section`
  display: inline-flex;
`