import styled from "styled-components";
import Sidebar from "../Sidebar";

const Homepage = () => {
  return (
    <Wrapper>
      <Sidebar />
    </Wrapper>
  )
}

export default Homepage;

const Wrapper = styled.div`
  padding: var(--wrapper-padding);
  min-height: 80vh;
`