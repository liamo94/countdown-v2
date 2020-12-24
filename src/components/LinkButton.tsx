import { FC } from "react";
import { LinkProps, NavLink } from "react-router-dom";
import styled from "styled-components";

interface LinkButtonProps {
  to: LinkProps["to"];
  type?: "primary" | "secondary";
}

export const LinkButton: FC<LinkButtonProps> = ({
  children,
  to,
  type = "primary",
}) => (
  <NavLink to={to}>
    <Button buttonType={type}>{children}</Button>
  </NavLink>
);

export const Button = styled.button<{ buttonType?: LinkButtonProps["type"] }>`
  background-color: ${({ buttonType = "primary" }) =>
    buttonType === "primary" ? "#ff7676" : "black"};
  padding: 5px;
  border: 1px solid white;
  color: white;
  font-weight: bold;
  font-size: calc(20px + 2vmin);
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ buttonType }) =>
      buttonType === "primary" ? "black" : "#ff7676"};
    color: white;
  }
`;
