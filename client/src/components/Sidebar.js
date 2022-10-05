import styled from "styled-components";
import { FaThList } from "react-icons/fa"
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";

const Sidebar = () => {
  const [ displayDetails, setDisplayDetails ] = useState(false);
  const { isAuthenticated } = useContext(UserContext);

  return (
    <Wrapper>
      {isAuthenticated && (
      <li>
        Search New Recipes
        <button onClick={() => setDisplayDetails(displayDetails === 1? false : 1)}>
          <FaThList />
        </button>
      </li>
      )}
      <li>
        
        {/* <button onClick={() => setDisplayDetails(displayDetails === 2? false : 2)}
                disabled={isAuthenticated? false : true}
        > */}
          My Pantry <FaThList /> 
        {/* </button> */}
      </li>
      <li>
        My Shopping List
        <button onClick={() => setDisplayDetails(displayDetails === 3? false : 3)}
                disabled={isAuthenticated? false : true}
        >
          <FaThList />
        </button>
      </li>
      <li>
        My Favorite Recipes
        <button onClick={() => setDisplayDetails(displayDetails === 4? false : 4)}
                disabled={isAuthenticated? false : true}
        >
          <FaThList />
        </button>
      </li>
    </Wrapper>
  )
}

export default Sidebar;

const Wrapper = styled.ul`
`