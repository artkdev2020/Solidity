import styled from "styled-components";

export const Container = styled.div`
  margin-top: 1rem;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const Button = styled.div`
  font-weight: 400;
  text-align: center;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #212529;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
  border-radius: 0.25rem;

  &:hover {
    cursor: pointer;
    background-color: #d6d6d6;
  }
`;

export const Arrows = styled.div`
  display: flex;
  align-items: center;
  cursor: none;
  color: #6c757d;
`;

export const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
`;

export const CardContent = styled.div`
  flex: 1;
  padding: 1.25rem;
`;
