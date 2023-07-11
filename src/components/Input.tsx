import styled from "styled-components";

export const Input = styled.input`
  padding: 8px;
  width: 431px;
  font-size: calc(20px + 2vmin);
  border-radius: 22px;
  padding: 4px 16px;
  margin: 20px;
  border: none;
  box-shadow: 15px 15px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid white;
  text-transform: uppercase;
  @media screen and (max-width: 431px) {
    width: 85%;
    padding: 16px;
    margin: 0;
    font-size: 18px;
    padding: 4px 8px;
    border-radius: 8px;
    margin-bottom: 16px;
  }
`;
