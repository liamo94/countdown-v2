import {
  type ChangeEvent,
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

import { checkWord } from "../utils/binarySearch";
import { getConsonants } from "../utils/consonants";
import { dictionary, type Letters } from "../utils/dictionary";
import { random } from "../utils/random";
import { useWindowEvent } from "../utils/useWindowEvent";
import { getVowels } from "../utils/vowels";
import { Button } from "./LinkButton";
import { Input } from "./Input";
import { BackButton } from "./BackButton";

interface LetterState {
  score: number;
  correctAnswer: boolean;
  allValidCharacters: boolean;
}

export const LetterRound: FC = () => {
  const [letterResponse, setLetterResponse] = useState<Letters>({
    type: "loading",
  });

  const [chosenLetters, setChosenLetters] = useState<string[]>([]);

  const [input, setInput] = useState<string>("");

  const consonants = useMemo(() => getConsonants(), []);
  const vowels = useMemo(() => getVowels(), []);
  const [points, setPoints] = useState(0);
  const [valid, setValid] = useState<LetterState>({
    score: 0,
    correctAnswer: false,
    allValidCharacters: true,
  });

  const searchInput = useRef<HTMLInputElement | null>(null);

  const LETTER_LIMIT = 7;

  useEffect(() => {
    let loaded = true;
    if (loaded)
      dictionary.getWords().then(setLetterResponse).catch(setLetterResponse);
    return () => {
      loaded = false;
    };
  }, [setLetterResponse]);

  const letterClicked = useCallback(
    (letter: "c" | "v") => {
      if (chosenLetters.length <= LETTER_LIMIT) {
        setChosenLetters([
          ...chosenLetters,
          random(letter === "c" ? consonants : vowels),
        ]);
      }
    },
    [setChosenLetters, chosenLetters, consonants, vowels]
  );

  const checkInputValid = useCallback(
    (value?: string) => {
      const characters = (value ?? input).toUpperCase().split("");
      const userCharacters = [...chosenLetters];
      return characters.every((char) => {
        if (!userCharacters.includes(char)) {
          return false;
        } else {
          userCharacters.splice(userCharacters.indexOf(char), 1);
          return true;
        }
      });
    },
    [input, chosenLetters]
  );

  const checkAnswer = useCallback(() => {
    if (letterResponse.type !== "ok") return;
    const wordValid = checkWord(letterResponse.letters, input);
    return wordValid;
  }, [letterResponse, input]);

  const isWordValid = useCallback(() => {
    if (letterResponse.type !== "ok") return;
    checkAnswer()
      ? setPoints(input.length === 8 ? 18 : input.length)
      : setPoints(0);
  }, [input, letterResponse.type, checkAnswer]);

  const handleKeyDown = useCallback(
    (event: any) => {
      switch (event.keyCode) {
        case 67:
          letterClicked("c");
          break;
        case 86:
          letterClicked("v");
          break;
        case 13:
          if (searchInput.current?.isEqualNode(document.activeElement)) {
            isWordValid();
          }
          break;
      }
    },
    [letterClicked, isWordValid]
  );

  useWindowEvent("keydown", handleKeyDown);

  const reset = useCallback(() => {
    setChosenLetters([]);
    setPoints(0);
  }, [setChosenLetters, setPoints]);

  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value);
      setValid({ ...valid, allValidCharacters: checkInputValid(value) });
    },
    [valid, checkInputValid]
  );

  return (
    <>
      <BackButton route="/select" />
      <Container>
        <h1>Letter round</h1>
        {letterResponse.type === "loading" && <p>Loading...</p>}
        {letterResponse.type === "error" && (
          <p>Internet required to play the game</p>
        )}
        {letterResponse.type === "ok" && (
          <>
            <p>Pick letters</p>
            <ResetButton onClick={reset}>Reset</ResetButton>
            <SquareContainer style={{ gap: "16px" }}>
              <Button buttonType="secondary" onClick={() => letterClicked("v")}>
                Vowel
              </Button>
              <Button buttonType="secondary" onClick={() => letterClicked("c")}>
                Consonant
              </Button>
            </SquareContainer>
            <small>
              <b>Tip</b>: Use <b>V</b> and <b>C</b> to add vowels and consonants
            </small>
            <SquareContainer>
              {[...Array(8)].map((_, i) => (
                <Square key={i}>
                  <Inner>{chosenLetters[i] ?? ""}</Inner>
                </Square>
              ))}
            </SquareContainer>
            {chosenLetters.length > LETTER_LIMIT && (
              <Container>
                <p>Now make a word</p>
                <Input
                  ref={searchInput}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(event.currentTarget.value)
                  }
                  maxLength={8}
                />
                {!valid.allValidCharacters && (
                  <Error>Character not valid</Error>
                )}
                <Button
                  onClick={() => isWordValid()}
                  disabled={!input || !valid.allValidCharacters}
                >
                  Submit
                </Button>
                {points > 0 && <h2>Correct, {points} points</h2>}
              </Container>
            )}
          </>
        )}
      </Container>
    </>
  );
};

const Inner = styled.div`
  align-items: center;
  justify-content: center;
`;

const Square = styled.div`
  border: 1px solid white;
  color: white;
  background-color: #008296;
  padding: 10px;
  font-weight: bold;
  margin: 2px;
  font-size: calc(40px + 2vmin);
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  display: flex;
  @media screen and (max-width: 500px) {
    padding: 4px;
    width: 32px;
    height: 32px;
  }
`;

const SquareContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 16px;
`;

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
  @media screen and (max-width: 431px) {
    padding-top: 32px;
  }
`;

const Error = styled.p`
  background: red;
  padding: 2px;
  border-radius: 4px;
`;

const ResetButton = styled.button`
  background: white;
  border: none;
  border-radius: 4px;
  color: black;
`;
