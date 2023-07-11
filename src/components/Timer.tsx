import { useEffect, type FC, useState } from "react";
import styled from "styled-components";
import { getRandomColor } from "../utils/randomColour";

interface TimerProps {
  initialSeconds?: number;
  onTimeUp?: () => void;
}

export const Timer: FC<TimerProps> = ({ initialSeconds = 30, onTimeUp }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [colour, setColour] = useState(() => getRandomColor());
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (stopped) return;
    const intervalId = setInterval(() => {
      if (seconds !== 0) {
        setSeconds((s) => s - 1);
        setColour(getRandomColor());
      } else {
        setSeconds(initialSeconds);
        onTimeUp?.();
        clearInterval(intervalId);
        setStopped(true);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [initialSeconds, onTimeUp, seconds, stopped]);

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
