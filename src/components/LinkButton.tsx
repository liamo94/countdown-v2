import type { FC, PropsWithChildren } from "react";
import { type LinkProps, NavLink } from "react-router-dom";
import styled from "styled-components";

export interface LinkButtonProps {
  to: LinkProps["to"];
  type?: "primary" | "secondary";
}

export const LinkButton: FC<PropsWithChildren<LinkButtonProps>> = ({
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
  &:disabled {
    cursor: default;
    background: grey;
  }

  /* @media screen and (max-width: 431px) {
    position: fixed;
    top: 0%;
  } */
`;
