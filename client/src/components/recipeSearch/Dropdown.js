import styled from "styled-components";
import { useContext, useState } from "react";
import { DataContext } from "../DataContext";

const Dropdown = ({name, array}) => {
  const [selection, setSelection] = useState('')
  const { handleSelect } = useContext(DataContext);

  return (
    <Wrapper>
      <select name={name}
              value={selection}
              onChange={e => {handleSelect(e.target.name, e.target.value)
                setSelection(e.target.value)}}
              >
        <option value=''>{name}</option>
        {array && array.map(ele => 
          <option key={ele} value={ele}>{ele}</option>
        )
        }
      </select>
    </Wrapper>
  )
}

export default Dropdown;

const Wrapper = styled.div`
`