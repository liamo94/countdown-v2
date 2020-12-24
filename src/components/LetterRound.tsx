import { FC, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { getConsonants } from "../utils/consonants";
import { dictionary, Letters } from "../utils/dictionary";
import { random } from "../utils/random";
import { getVowels } from "../utils/vowels";
import { Button } from "./LinkButton";

export const LetterRound: FC = () => {
  const [letterResponse, setLetterResponse] = useState<Letters>({
    type: "loading",
  });
  const [chosenLetters, setChosenLetters] = useState<string[]>([]);

  const consonants = useMemo(() => getConsonants(), []);
  const vowels = useMemo(() => getVowels(), []);

  useEffect(() => {
    let loaded = true;
    if (loaded)
      dictionary.getWords().then(setLetterResponse).catch(setLetterResponse);
    return () => void (loaded = false);
  }, [setLetterResponse]);

  const letterClicked = useCallback(
    (letter: "c" | "v") => {
      if (chosenLetters.length <= 7) {
        setChosenLetters([
          ...chosenLetters,
          random(letter === "c" ? consonants : vowels),
        ]);
      }
    },
    [setChosenLetters, chosenLetters, consonants, vowels]
  );

  const handleKeyDown = useCallback(
    (event) => {
      switch (event.keyCode) {
        case 67:
          letterClicked("c");
          break;
        case 86:
          letterClicked("v");
          break;
      }
    },
    [letterClicked]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => void document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Container>
      <h1>Letter round</h1>
      {letterResponse.type === "loading" && <p>Loading...</p>}
      {letterResponse.type === "error" && (
        <p>Internet required to play the game</p>
      )}
      {letterResponse.type === "ok" && (
        <>
          <p>Pick letters</p>
          <Button buttonType="secondary" onClick={() => letterClicked("v")}>
            Vowel
          </Button>
          <Button buttonType="secondary" onClick={() => letterClicked("c")}>
            Consonant
          </Button>
          <SquareContainer>
            {[...Array(8)].map((e, i) => (
              <Square key={i}>
                <Inner>{chosenLetters[i] ?? ""}</Inner>
              </Square>
            ))}
          </SquareContainer>
        </>
      )}
    </Container>
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
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const SquareContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Container = styled.div`
  text-align: center;
`;
