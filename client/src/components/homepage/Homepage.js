import styled from "styled-components";

const Homepage = () => {
  return (
    <Wrapper>
      <h1>Homepage</h1>
    </Wrapper>
  )
}

export default Homepage;

const Wrapper = styled.div`
  padding: var(--wrapper-padding);
  min-height: 80vh;
`