import styled from "styled-components";
import { useState, useContext } from "react";
import { DataContext } from "../DataContext";

const Dropdown = ({parameter}) => {
  const [selection, setSelection] = useState(null);

  return (
    <Wrapper>
      <select name={''}
              value={''}
              onChange={e => setSelection(e.target.value)}
              >
        <option value=''>{}</option>
        {arr.map(ele => <option value={''}>{''}</option>)}
      </select>
    </Wrapper>
  )
}

export default Dropdown;

const Wrapper = styled.div`
`