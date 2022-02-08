import { FC } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button, LinkButtonProps } from "./LinkButton";

interface BackButtonProps {
  title?: string;
  type?: LinkButtonProps["type"];
  route: string;
}

export const BackButton: FC<BackButtonProps> = ({
  title,
  route,
  type = "secondary",
}) => {
  return (
    <NavLink to={route}>
      <Back buttonType={type}>{title ?? "Back"}</Back>
    </NavLink>
  );
};

const Back = styled(Button)`
  position: absolute;
  margin: 8px;
  font-size: 20px;
  &:hover {
    border: none;
    background: none;
    color: #ff9191;
  }
  border: none;
  background: none;
  color: #ff7676;
`;
