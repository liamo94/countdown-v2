import { useEffect, FC, useState } from "react";
import styled from "styled-components";
import { getRandomColor } from "../utils/randomColour";

interface TimerProps {
  initialSeconds?: number;
  onTimeUp?: () => void;
}

export const Timer: FC<TimerProps> = ({ initialSeconds, onTimeUp }) => {
  const DEFAULT_TIME = 30;

  const [seconds, setSeconds] = useState(initialSeconds ?? DEFAULT_TIME);
  const [colour, setColour] = useState(getRandomColor());

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds !== 0) {
        setSeconds(seconds - 1);
        setColour(getRandomColor());
      } else {
        clearInterval(intervalId);
        onTimeUp?.();
        setSeconds(initialSeconds ?? DEFAULT_TIME);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [initialSeconds, seconds, onTimeUp]);
  return (
    <Container border={colour}>
      <p>{seconds}</p>
    </Container>
  );
};

const Container = styled.div<{ border: string }>`
  border: 5px solid ${({ border }) => border};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  display: flex;
  > * {
    font-size: 22px;
  }
`;
