import styled from "styled-components"

// Footer has no content but to add color to the page
const Footer = () => {
  return (
    <Wrapper>
    </Wrapper>
  )
}

export default Footer;

const Wrapper = styled.div`
  height: 10vh;
  width: 100vw;
  background-color: var(--primary-background-color);
  padding: 20px 5vw;

@media screen and (min-width: 1200px){
  padding: 20px 20vw;
}
`