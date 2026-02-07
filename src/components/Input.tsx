import styled from "styled-components";

export const Input = styled.input`
  width: 431px;
  font-size: calc(20px + 2vmin);
  border-radius: 22px;
  padding: 4px 16px;
  border: 1px solid white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  @media screen and (max-width: 500px) {
    width: 80%;
    font-size: 18px;
    padding: 8px 12px;
    border-radius: 8px;
  }
`;
