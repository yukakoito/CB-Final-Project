import styled, { keyframes } from "styled-components"
import { FiLoader } from "react-icons/fi"

const LoadingCircle = () => {
    return (
        <Wrapper>
            <Circle>
                <FiLoader size={30}/>
            </Circle>
        </Wrapper>
    )
}

export default LoadingCircle;

const spinner = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const Circle = styled.div`
    animation: ${spinner} 3s linear infinite;
    position: absolute;
    color: gray;
    mask: conic-gradient(from 15deg, #0003, #000);
`
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`