import Link from "next/link";
import styled from "styled-components";

export const Bar = styled.div`
  height: 56px;

  background-color: #f8f6f0;
  border-bottom: 1px solid #e8e1cd;
`;

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;

  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
`;

export const Button = styled(Link)`
  display: flex;
  align-items: center;

  border: none;
  background-color: #f8f6f0;
  color: inherit;
  padding: 0 2rem;

  font-size: 1.25rem;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    background-color: #e8e1cd;
  }
`;
