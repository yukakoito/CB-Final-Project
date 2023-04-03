import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";

const Dropdown = ({ name, array }) => {
  const { searchOptions, setSearchOptions } = useContext(DataContext);

  // Update search options upon selection
  const handleSearchOptions = (key, value) => {
    setSearchOptions({ ...searchOptions, [key]: value.replaceAll(" ", "%20") });
  };

  const capitalizeText = (data) => {
    if (!data.includes("Type")) {
      return data.replace(data[0], data[0].toUpperCase());
    } else {
      return data
        .replace(data[0], data[0].toUpperCase())
        .replace("Type", " Type");
    }
  };

  return (
    <select
      name={name}
      value={
        searchOptions[name]
          ? searchOptions[name].replaceAll("%20", " ")
          : capitalizeText(name)
      }
      onChange={(e) => {
        handleSearchOptions(e.target.name, e.target.value);
      }}
    >
      <option value="">{capitalizeText(name)}</option>
      {array &&
        array.map((ele) => (
          <option key={ele} value={ele}>
            {capitalizeText(ele)}
          </option>
        ))}
    </select>
  );
};

export default Dropdown;
