import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
  background: ${({ bgColor }) => bgColor};
  color: #9d9d9d;
  font-size: 16px;
`;

export const UserContainer = styled.div`
  margin-right: 10px;
`;
