import React, {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FC,
} from "react";
import styled from "styled-components";
import { random } from "../utils/random";
import { infixToPostfix, sum } from "../utils/numbers";
import { useWindowEvent } from "../utils/useWindowEvent";
import { BackButton } from "./BackButton";
import { Button } from "./LinkButton";

export const NumberRound: FC = () => {
  const [randomNumber, setRandomNumber] = useState<number>();
  const [bigNumbers, setBigNumbers] = useState(0);
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const turns = 20;
    let i = 0;
    const interval = setInterval(() => {
      if (i < turns) {
        const tempNumber = random(100, 1000);
        setRandomNumber(tempNumber);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [bigNumbers]);

  const selectRandomNumbers = (totalBigNumbers: number) => {
    const totalNumbers = 6;
    const selectedNumbers = [];
    const smallNumbers = [
      1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
    ];
    const bigNumberOptions = [25, 50, 75, 100];
    for (let i = 0; i < totalBigNumbers; i++) {
      const rnd = random(bigNumberOptions.length);
      selectedNumbers.push(bigNumberOptions[rnd]);
      bigNumberOptions.splice(rnd, 1);
    }
    for (let i = 0; i < totalNumbers - totalBigNumbers; i++) {
      const rnd = random(smallNumbers.length);
      selectedNumbers.push(smallNumbers[rnd]);
      smallNumbers.splice(rnd, 1);
    }
    return selectedNumbers.sort((x, y) => {
      return x - y;
    });
  };

  const setAvailableNumber = useCallback((val: number) => {
    setAvailableNumbers(selectRandomNumbers(val));
    setBigNumbers(val);
    setInput("");
    setResult(null);
  }, []);

  const handleKeyDown = useCallback(
    (event: any) => {
      if (availableNumbers.length) return;
      switch (event.keyCode) {
        case 49:
          setAvailableNumber(1);
          break;
        case 50:
          setAvailableNumber(2);
          break;
        case 51:
          setAvailableNumber(3);
          break;
        case 52:
          setAvailableNumber(4);
          break;
      }
    },
    [setAvailableNumber, availableNumbers]
  );

  useWindowEvent("keydown", handleKeyDown);

  const handleSubmit = useCallback(() => {
    if (!input.trim() || !randomNumber) return;
    const postfix = infixToPostfix(input);
    const numbers = [...availableNumbers];
    const answer = sum(postfix, numbers);
    if (typeof answer === "string") {
      setResult(answer);
    } else if (answer === randomNumber) {
      setResult("Correct! 10 points");
    } else {
      const diff = Math.abs(answer - randomNumber);
      if (diff <= 5) {
        setResult(`${answer} - Close! 7 points (off by ${diff})`);
      } else if (diff <= 10) {
        setResult(`${answer} - Not bad! 5 points (off by ${diff})`);
      } else {
        setResult(`${answer} - Incorrect (off by ${diff})`);
      }
    }
  }, [input, randomNumber, availableNumbers]);

  return (
    <>
      <BackButton route="/select" />
      <Container>
        <h1>Number round</h1>
        <h2>How many big numbers?</h2>
        <ButtonContainer>
          {[1, 2, 3, 4].map((val) => (
            <BigNumberButton
              key={val}
              buttonType="secondary"
              onClick={() => setAvailableNumber(val)}
              active={val === bigNumbers}
            >
              {val}
            </BigNumberButton>
          ))}
        </ButtonContainer>
        {!!availableNumbers.length && (
          <>
            <Target>{randomNumber}</Target>
            <h3>Using numbers</h3>
            <ButtonContainer>
              {availableNumbers.map((number, i) => (
                <Number key={i}>{number}</Number>
              ))}
            </ButtonContainer>
            <small>
              Use spaces between numbers and operators (e.g. 100 + 25 * 3)
            </small>
            <Input
              placeholder="Type solution"
              value={input}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setInput(event.currentTarget.value)
              }
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === "Enter") handleSubmit();
              }}
            />
            <Button onClick={handleSubmit} disabled={!input.trim()}>
              Submit
            </Button>
            {result && <Result>{result}</Result>}
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
  @media screen and (max-width: 431px) {
    padding-top: 32px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  > * {
    margin: 8px;
  }
`;

const BigNumberButton = styled(Button)<{ active: boolean }>`
  background: ${({ active }) => (active ? "#ff7676" : "inherit")};
`;

const Target = styled.div`
  border: 1px solid #90ee90;
  padding: 0 10px;
  color: #90ee90;
  font-size: calc(50px + 2vmin);
`;

const Number = styled.div`
  font-size: calc(20px + 2vmin);
  color: white;
  padding: 5px;
  margin: 5px;
  margin-bottom: 20px;
  background: #008296;
  border: 1px solid white;
`;

const Input = styled.input`
  padding: 8px;
  width: 800px;
  font-size: calc(20px + 2vmin);
  border-radius: 16px;
  padding: 4px 16px;
  margin: 20px;
  border: none;
  box-shadow: 15px 15px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid white;
  @media screen and (max-width: 431px) {
    width: 85%;
    padding: 16px;
    margin: 0%;
    font-size: 18px;
    padding: 4px 8px;
    border-radius: 8px;
  }
`;

const Result = styled.p`
  font-size: calc(14px + 1vmin);
  color: #90ee90;
  margin-top: 16px;
`;
