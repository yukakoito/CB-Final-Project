import styled from "styled-components";
import { useContext, useState } from "react";
import { DataContext } from "../DataContext";

const Dropdown = ({ name, array }) => {
  const { searchOptions, setSearchOptions } = useContext(DataContext);

  // Update search options upon selection
  const handleSearchOptions = (key, value) => {
    setSearchOptions({ ...searchOptions, [key]: value.replaceAll(" ", "%20") });
  };

  // Format the label for search options
  const formatLabel = (data) => {
    if (!data.includes("Type")) {
      return data.replace(data[0], data[0].toUpperCase());
    } else {
      return data
        .replace(data[0], data[0].toUpperCase())
        .replace("Type", " Type");
    }
  };

  return (
    <Selection
      name={name}
      value={
        searchOptions[name]
          ? searchOptions[name].replaceAll("%20", " ")
          : formatLabel(name)
      }
      onChange={(e) => {
        handleSearchOptions(e.target.name, e.target.value);
      }}
    >
      <option value="">{formatLabel(name)}</option>
      {array &&
        array.map((ele) => (
          <option key={ele} value={ele}>
            {ele}
          </option>
        ))}
    </Selection>
  );
};

export default Dropdown;

const Selection = styled.select`
  margin: 2px;
  min-width: 150px;
`;
