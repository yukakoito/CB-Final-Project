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
  box-shadow: var(--container-box-shadow);
  width: 100%;
  max-width: 450px;
  padding: 20px 10px;
  align-self: center;
  border-radius: 5px;
  margin: 10px auto 25px;

  p {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
`;
