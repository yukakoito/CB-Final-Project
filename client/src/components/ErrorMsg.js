import styled from "styled-components";
import { MdOutlineError } from "react-icons/md";

const ErrorMsg = ({ errMsg }) => {
  return (
    <Wrapper>
      <MdOutlineError size={50} />
      {errMsg ? (
        <p>{errMsg}</p>
      ) : (
        <p>
          <span>An unknown error has occured.</span>
          <span>Please refresh the page.</span>
        </p>
      )}
    </Wrapper>
  );
};

export default ErrorMsg;

const Wrapper = styled.div`
  text-align: center;
  box-shadow: 1px 2px 3px 3px var(--primary-color);
  padding: 35px;
  width: fit-content;
  align-self: center;
  margin: 5% auto 0;

  p {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
`;
