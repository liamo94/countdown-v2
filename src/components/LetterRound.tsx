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
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState<LetterState>({
    score: 0,
    correctAnswer: false,
    allValidCharacters: true,
  });

  const searchInput = useRef<HTMLInputElement | null>(null);

  const MAX_LETTERS = 8;

  useEffect(() => {
    let loaded = true;
    dictionary
      .getWords()
      .then((res) => {
        if (loaded) setLetterResponse(res);
      })
      .catch((err) => {
        if (loaded) setLetterResponse(err);
      });
    return () => {
      loaded = false;
    };
  }, [setLetterResponse]);

  const letterClicked = useCallback(
    (letter: "c" | "v") => {
      if (chosenLetters.length < MAX_LETTERS) {
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
    const wordValid = checkWord(letterResponse.letters, input.toLowerCase());
    return wordValid;
  }, [letterResponse, input]);

  const isWordValid = useCallback(() => {
    if (letterResponse.type !== "ok") return;
    setSubmitted(true);
    if (checkAnswer()) {
      setPoints(input.length === 8 ? 18 : input.length);
    } else {
      setPoints(0);
    }
  }, [input, letterResponse.type, checkAnswer]);

  const handleKeyDown = useCallback(
    (event: any) => {
      if (letterResponse.type !== "ok") return;
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
    [letterClicked, isWordValid, letterResponse.type]
  );

  useWindowEvent("keydown", handleKeyDown);

  const reset = useCallback(() => {
    setChosenLetters([]);
    setPoints(0);
    setSubmitted(false);
    setInput("");
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
      <ResetButton onClick={reset}>Reset</ResetButton>
      <Container>
        <h1>Letter round</h1>
        {letterResponse.type === "loading" && <p>Loading...</p>}
        {letterResponse.type === "error" && (
          <p>Internet required to play the game</p>
        )}
        {letterResponse.type === "ok" && (
          <>
            <Subtitle>
              {chosenLetters.length >= MAX_LETTERS
                ? "Now make a word"
                : `Pick ${MAX_LETTERS - chosenLetters.length} more letter${
                    MAX_LETTERS - chosenLetters.length !== 1 ? "s" : ""
                  }`}
            </Subtitle>
            <ButtonContainer>
              <Button
                buttonType="secondary"
                onClick={() => letterClicked("v")}
                disabled={chosenLetters.length >= MAX_LETTERS}
              >
                Vowel
              </Button>
              <Button
                buttonType="secondary"
                onClick={() => letterClicked("c")}
                disabled={chosenLetters.length >= MAX_LETTERS}
              >
                Consonant
              </Button>
            </ButtonContainer>
            <Tip>
              Press <Key>V</Key> or <Key>C</Key> to add letters
            </Tip>
            <LetterTiles>
              {[...Array(8)].map((_, i) => (
                <Square key={i}>{chosenLetters[i] ?? ""}</Square>
              ))}
            </LetterTiles>
            {chosenLetters.length >= MAX_LETTERS && (
              <>
                <Input
                  ref={searchInput}
                  value={input}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(event.currentTarget.value)
                  }
                  maxLength={8}
                />
                <Button
                  onClick={() => isWordValid()}
                  disabled={!input || !valid.allValidCharacters}
                >
                  Submit
                </Button>
                <Feedback>
                  {!valid.allValidCharacters && (
                    <FeedbackText correct={false}>
                      Character not in your letters
                    </FeedbackText>
                  )}
                  {submitted && points > 0 && (
                    <FeedbackText correct>
                      Correct, {points} points
                    </FeedbackText>
                  )}
                  {submitted && points === 0 && (
                    <FeedbackText correct={false}>
                      Incorrect, word not found
                    </FeedbackText>
                  )}
                </Feedback>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
  gap: 16px;
  @media screen and (max-width: 500px) {
    padding-top: 32px;
    gap: 24px;
  }
  h1 {
    margin: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
`;

const LetterTiles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 4px;
`;

const Square = styled.div`
  border: 1px solid white;
  color: white;
  background-color: #008296;
  padding: 10px;
  font-weight: bold;
  font-size: calc(40px + 2vmin);
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  display: flex;
  @media screen and (max-width: 500px) {
    padding: 6px;
    width: 28px;
    height: 28px;
    font-size: calc(24px + 2vmin);
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #aaa;
  margin: 0;
`;

const Tip = styled.small`
  color: #777;
  font-size: 13px;
`;

const Key = styled.span`
  background: #444;
  color: white;
  padding: 1px 6px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 12px;
`;

const Feedback = styled.div`
  min-height: 32px;
`;

const FeedbackText = styled.p<{ correct: boolean }>`
  color: ${({ correct }) => (correct ? "#90ee90" : "#ff7676")};
  font-size: 18px;
  margin: 0;
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
