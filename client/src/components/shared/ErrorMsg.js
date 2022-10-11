import styled from "styled-components";
import {MdOutlineError} from "react-icons/md"

const ErrorMsg = ({errMsg}) => {

  return (
    <Wrapper>
      <MdOutlineError size={50}/>
      { errMsg ? 
        <p>{errMsg}</p> :
        <>
          <p>An unknown error has occured.</p>
          <p>Please refresh the page.</p>
        </>
      }
    </Wrapper>
  )
}

export default ErrorMsg;

const Wrapper = styled.div`
  text-align: center;
  box-shadow: 1px 2px 3px 3px var(--primary-color);
  padding: 15px;
  width: 90%;
  align-self: center;
  margin-top: 20px;
`