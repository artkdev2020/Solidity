import styled from "styled-components";

export const NavContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #343a40;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
`;

export const Ref = styled.a`
  display: inline-block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  padding-left: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
  margin-right: 0;
`;

export const NavbarContent = styled.li`
  display: flex;
  padding-right: 16px;
`;

export const AccountNameContainer = styled.small`
  color: #6c757d;
  display: flex;
`;

export const AccountName = styled.small`
  margin-top: auto;
  margin-bottom: auto;
`;

export const AccountImage = styled.img`
  margin-left: 0.5rem;
  width: 30px;
  height: 30px;
`;
