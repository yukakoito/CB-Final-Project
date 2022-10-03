import styled from "styled-components";
import { useState } from "react";

const Dropdown = ({name, array, handleSelect}) => {
  const [selection, setSelection] = useState('')

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