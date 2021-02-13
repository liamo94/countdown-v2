import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { conundrum } from "../utils/conundrum";
import { random } from "../utils/random";
import { Input } from "./Input";
import { Timer } from "./Timer";

export const Conundrum = () => {
  const [word, setWord] = useState<
    { original: string; scrambledWord: string } | undefined
  >(undefined);

  const [found, setFound] = useState(false);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    const turns = 20;
    let i = 0;
    const interval = setInterval(() => {
      if (i < turns) {
        const tempWord = random(conundrum);
        setWord({
          original: tempWord,
          scrambledWord: tempWord
            .split("")
            .sort(() => 0.5 - Math.random())
            .join(""),
        });
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20);
    return () => void clearInterval(interval);
  }, []);

  const checkWord = useCallback(
    (userWord: string) => {
      if (userWord.length < 9 || !word) {
        setAttempted(false);
      } else {
        setAttempted(true);
        setFound(userWord === word.original);
      }
    },
    [word]
  );

  return (
    <Container>
      <h1>Conundrum round</h1>
      <p>Unscramble word</p>
      {word && (
        <>
          <Word>{word.scrambledWord.toUpperCase()}</Word>
          <Input
            maxLength={9}
            onChange={(event) => checkWord(event.currentTarget.value)}
          />
          {attempted && <p>{found ? "Correct" : "Incorrect"}</p>}
        </>
      )}
      <Timer />
    </Container>
  );
};

const Word = styled.p`
  font-size: calc(50px + 2vmin);
  color: #90ee90;
`;

const Container = styled.div`
  text-align: center;
`;
