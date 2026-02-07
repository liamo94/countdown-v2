import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ChangeEvent,
} from "react";
import styled from "styled-components";
import { conundrum } from "../utils/conundrum";
import { random } from "../utils/random";
import { BackButton } from "./BackButton";
import { Input } from "./Input";
import { Button } from "./LinkButton";

interface ConundrumWord {
  original: string;
  scrambledWord: string;
}

export const Conundrum: FC = () => {
  const [word, setWord] = useState<ConundrumWord | undefined>(undefined);
  const [userInput, setUserInput] = useState("");

  const [found, setFound] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [inputKey, setInputKey] = useState(0);

  const reset = useCallback(() => {
    const tempWord = random(conundrum);
    setWord({
      original: tempWord,
      scrambledWord: tempWord
        .split("")
        .sort(() => 0.5 - Math.random())
        .join(""),
    });
    setUserInput("");
    setFound(false);
    setAttempted(false);
    setInputKey((k) => k + 1);
  }, []);

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
    return () => clearInterval(interval);
  }, []);

  const usedIndices = useMemo(() => {
    if (!word) return new Set<number>();
    const indices = new Set<number>();
    const scrambled = word.scrambledWord.toLowerCase().split("");
    const taken = Array(scrambled.length).fill(false);
    for (const char of userInput.toLowerCase()) {
      for (let i = 0; i < scrambled.length; i++) {
        if (!taken[i] && scrambled[i] === char) {
          taken[i] = true;
          indices.add(i);
          break;
        }
      }
    }
    return indices;
  }, [word, userInput]);

  const handleChange = useCallback(
    (userWord: string) => {
      setUserInput(userWord);
      if (userWord.length < 9 || !word) {
        setAttempted(false);
      } else {
        setAttempted(true);
        setFound(userWord.toLowerCase() === word.original.toLowerCase());
      }
    },
    [word]
  );

  return (
    <>
      <BackButton route="/select" />
      <ResetButton onClick={reset}>Reset</ResetButton>
      <Container>
        <h1>Conundrum round</h1>
        <p>Unscramble word</p>
        {word && (
          <>
            <LetterContainer>
              {word.scrambledWord.split("").map((letter, i) => (
                <Letter key={i} used={usedIndices.has(i)}>
                  {letter.toUpperCase()}
                </Letter>
              ))}
            </LetterContainer>
            <Input
              key={inputKey}
              maxLength={9}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleChange(event.currentTarget.value)
              }
            />
            {attempted && <p>{found ? "Correct" : "Incorrect"}</p>}
          </>
        )}
      </Container>
    </>
  );
};

const LetterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  padding: 16px;
`;

const Letter = styled.div<{ used: boolean }>`
  font-size: calc(40px + 2vmin);
  font-weight: bold;
  padding: 8px;
  color: ${({ used }) => (used ? "#555" : "#90ee90")};
  transition: color 0.2s ease;
  @media screen and (max-width: 500px) {
    font-size: calc(20px + 2vmin);
    padding: 4px;
  }
`;

const Container = styled.div`
  text-align: center;
  padding-top: 16px;
  @media screen and (max-width: 431px) {
    padding-top: 32px;
  }
`;

const ResetButton = styled(Button)`
  position: absolute;
  right: 0;
  margin: 8px 16px;
  font-size: 20px;
  &,
  &:hover,
  &:active,
  &:focus {
    border: none;
    background: none;
    color: #ff7676;
  }
  &:hover {
    color: #ff9191;
  }
`;
