import { memo, type ReactNode } from "react";
import { Routes as _Routes, BrowserRouter, Route } from "react-router-dom";
import { Conundrum } from "../components/Conundrum";
import { Countdown } from "../components/Countdown";
import { LetterRound } from "../components/LetterRound";
import { NumberRound } from "../components/number";
import { SelectGame } from "../components/SelectGame";

const homeRoute = <Route path="/" Component={Countdown} key="home" />;

const selectRoute = (
  <Route path="/select" Component={SelectGame} key="select" />
);
const conundrumRoute = (
  <Route path="/conundrum" Component={Conundrum} key="conundrum" />
);
const letterRoute = (
  <Route path="/letter" Component={LetterRound} key="letter" />
);
const numberRoute = (
  <Route path="/number" Component={NumberRound} key="number" />
);

export const Routes = memo(() => {
  const routes: ReactNode[] = [
    homeRoute,
    selectRoute,
    conundrumRoute,
    letterRoute,
    numberRoute,
  ];

  return (
    <BrowserRouter>
      <_Routes children={routes} />
    </BrowserRouter>
  );
});
