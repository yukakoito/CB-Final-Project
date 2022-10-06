import styled from "styled-components";
import { useContext, useState } from "react";
import { DataContext } from "../DataContext";

const Dropdown = ({name, array}) => {
  const { searchOptions, setSearchOptions } = useContext(DataContext);

  const handleSearchOptions = (key, value) => {
    setSearchOptions({...searchOptions, [key]: value.replaceAll(' ', '%20')})
  }

  // Format the label for search options
  const formatLabel = (data) => {
    if (!data.includes('Type')) {
      return data.replace(data[0], data[0].toUpperCase())
    } else {
        return  data.replace(data[0], data[0].toUpperCase()).replace('Type', ' Type')
    }
  }

  return (
    <Wrapper>
      <select name={name}
              value={searchOptions[name] ? searchOptions[name] : formatLabel(name)}
              onChange={e => {handleSearchOptions(e.target.name, e.target.value)
              }}
              >
        <option value=''>{formatLabel(name)}</option>
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