import type { FC } from "react";
import { LinkButton } from "./LinkButton";
import styled from "styled-components";
import { BackButton } from "./BackButton";

export const SelectGame: FC = () => {
  return (
    <>
      <BackButton route="/" title="Home" />
      <Container>
        <h1>Select a game mode...</h1>
        <LinkButton to="/number" type="secondary">
          Number round
        </LinkButton>
        <LinkButton to="/letter" type="secondary">
          Letter round
        </LinkButton>
        <LinkButton to="/conundrum" type="secondary">
          Conundrum round
        </LinkButton>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  > * {
    margin: 16px;
  }
`;
