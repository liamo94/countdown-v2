import { ComponentType } from "react";

interface PageType {
  title: string;
  component: ComponentType<any>;
  route: string;
  backRoute?: string;
}
