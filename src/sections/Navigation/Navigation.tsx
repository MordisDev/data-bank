"use client";

import { Bar, Button, MenuWrapper } from "./styled";

export const Navigation = () => (
  <Bar>
    <MenuWrapper>
      <Button href="/">Home</Button>
      <Button href="analysis">Analysis</Button>
      <Button href="storage">Storage</Button>
    </MenuWrapper>
  </Bar>
);
