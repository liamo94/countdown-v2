import { memo, ReactNode } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Conundrum } from "../components/Conundrum";
import { Countdown } from "../components/Countdown";
import { LetterRound } from "../components/LetterRound";
import { NumberRound } from "../components/NumberRound";
import { SelectGame } from "../components/SelectGame";

const homeRoute = <Route path="/" component={Countdown} exact key="home" />;

const selectRoute = (
  <Route path="/select" component={SelectGame} key="select" />
);
const conundrumRoute = (
  <Route path="/conundrum" component={Conundrum} key="conundrum" />
);
const letterRoute = (
  <Route path="/letter" component={LetterRound} key="letter" />
);
const numberRoute = (
  <Route path="/number" component={NumberRound} key="number" />
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
    <Router>
      <Switch children={routes} />
    </Router>
  );
});
