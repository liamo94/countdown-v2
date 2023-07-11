import type { FC } from "react";
import styled from "styled-components";
import { LinkButton } from "./LinkButton";
import { createPortal } from "react-dom";

export const Countdown: FC = () => {
  const letters = "COUNTDOWN".split("");
  return (
    <Container>
      <LetterContainer>
        {letters.map((letter, i) => (
          <Letter letter={letter} key={i} />
        ))}
      </LetterContainer>
      <h1>Countdown app built in React</h1>
      <LinkButton to="/select">Select game</LinkButton>
      <>
        {createPortal(
          <CodeLink
            href="https://github.com/liamo94/countdown-v2"
            target="_blank"
          >
            View code on GitHub
          </CodeLink>,
          document.body
        )}
      </>
    </Container>
  );
};

const Letter: FC<{ letter: string }> = ({ letter }) => (
  <StyledLetter>{letter}</StyledLetter>
);

const LetterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLetter = styled.div`
  border: 1px solid white;
  color: white;
  background-color: #008296;
  padding: 10px;
  font-weight: bold;
  float: left;
  margin: 2px;
  font-size: calc(20px + 2vmin);
  &:hover {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }
  @media screen and (max-width: 400px) {
    padding: 4px;
  }
`;

const Container = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  padding: 32px;
  text-align: center;
  position: relative;
`;

const CodeLink = styled.a`
  position: absolute;
  bottom: 16px;
  text-align: center;
  width: 100%;
  font-size: 12px;
  color: #aaa;
  font-weight: 500;
  text-decoration: none;
  @media screen and (min-width: 500px) {
    font-size: 16px;
  }
`;
