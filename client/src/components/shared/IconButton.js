import styled from "styled-components";
import { useState } from "react";

const IconButton = ({children, color, onClickFunc, data}) => {
  const [isHovered, setIsHovered] = useState(false);

  
  return (
      <Button onClick={(e) => {
                                e.stopPropagation();
                                onClickFunc(data)
                      }}
              onKeyDown={(e) => {e.key === "Enter" && e.stopPropagation()}}
              color={color}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </Button>
  )
}

export default IconButton;

const Button = styled.button`
  color: ${p => p.color};
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  position: relative;
  background-color: transparent;
  border: none;
  width: 30px;
  height: 30px;
  transition: all 0.5ms ease-in-out;

  &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 15%;
      opacity: 0;
      background-color: #e63946;
      padding: 0;
  }

  &:focus:after, 
  &:hover:after {
      opacity: 0.2;
  }
`