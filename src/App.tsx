import type { FC } from "react";
import { Routes } from "./routes";
import styled from "styled-components";

const App: FC = () => (
  <Container>
    <Routes />
  </Container>
);

export default App;

const Container = styled.div`
  background-color: #282c34;
  min-height: 100vh;
`;
