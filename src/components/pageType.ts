import type { ComponentType } from "react";

export interface PageType {
  title: string;
  component: ComponentType<any>;
  route: string;
  backRoute?: string;
}
