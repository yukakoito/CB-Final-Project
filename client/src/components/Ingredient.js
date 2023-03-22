const Ingredient = ({
  item,
  selectedItemIndex,
  onMouseEnter,
  index,
  onMouseLeave,
}) => {
  return (
    item && (
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          background: index === selectedItemIndex ? "#edf2f4" : "transparent",
        }}
      >
        <span>{item.name.toLowerCase()}</span>
      </div>
    )
  );
};

export default Ingredient;
