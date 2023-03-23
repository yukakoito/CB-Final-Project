import styled from "styled-components";

const IconButton = ({
  children,
  color,
  onClickFunc,
  data,
  title,
  disabled,
}) => {
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        data ? onClickFunc(data) : onClickFunc();
      }}
      onKeyDown={(e) => {
        e.key === "Enter" && e.stopPropagation();
      }}
      color={color}
      title={title}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default IconButton;

const Button = styled.button`
  color: ${(p) => p.color};
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  position: relative;
  background-color: transparent;
  border: none;
  width: 30px;
  height: 30px;
  border: 1px solid lightgray;
  opacity: ${(p) => (p.disabled ? 0.5 : 1)};

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 15%;
    padding: 0;
  }
`;
