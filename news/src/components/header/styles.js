import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 10px;
  background: ${({ bgColor }) => bgColor};
  color: #9d9d9d;
  font-size: 16px;
`;

export const Logo = styled.img`
  width: 10%;
`;

export const UserContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 30%;
`;
