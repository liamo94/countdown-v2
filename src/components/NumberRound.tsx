import { useCallback, useEffect, useState, type FC } from "react";
import styled from "styled-components";
import { random } from "../utils/random";
import { useWindowEvent } from "../utils/useWindowEvent";
import { BackButton } from "./BackButton";
import { Button } from "./LinkButton";

// interface NumberState {
//   value: number;
//   validNumbers: boolean;
//   validInput: boolean;
//   invalidMessage?: string;
// }

export const NumberRound: FC = () => {
  const [randomNumber, setRandomNumber] = useState<number>();
  const [bigNumbers, setBigNumbers] = useState(0);
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);
  // const [valid, setValid] = useState<NumberState>({
  //   value: 0,
  //   validNumbers: true,
  //   validInput: true,
  // });

  useEffect(() => {
    const turns = 20;
    let i = 0;
    const interval = setInterval(() => {
      if (i < turns) {
        const tempNumber = random(256);
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
    const bigNumbers = [25, 50, 75, 100];
    for (let i = 0; i < totalBigNumbers; i++) {
      const rnd = random(bigNumbers.length);
      selectedNumbers.push(bigNumbers[rnd]);
      bigNumbers.splice(rnd, 1);
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
  }, []);

  const handleKeyDown = useCallback(
    (event: any) => {
      if (availableNumbers.length) return;
      console.log(event.keyCode);
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
            <Input placeholder="Type solution" />
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
  @media screen and (max-width: 400px) {
    width: 85%;
    padding: 16px;
    margin: 0%;
    font-size: 18px;
    padding: 4px 8px;
    border-radius: 8px;
  }
`;
