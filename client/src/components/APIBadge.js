import styled from "styled-components";
import edamamBadge from "../assets/Edamam_Badge_Transparent.svg";

const APIBadge = () => {
  return <Badge src={edamamBadge} alt="Powered by Edamam" />;
};

export default APIBadge;

const Badge = styled.img`
  width: 125px;
  height: 25px;
  border-radius: 0;
  position: absolute;
  right: 15px;
  bottom: 0;
`;
