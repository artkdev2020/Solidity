import React, { useEffect } from "react";
import { Main, Navbar } from "../../components";
import {
  Wrapper,
  Container,
  Row,
  MainContainer,
  ContentContainer,
  Ref,
  LoaderContainer,
} from "./styles";

const App = ({
  loading,
  web3Loaded,
  account,
  loadWeb3,
  loadBlockchainData,
}) => {
  useEffect(() => {
    loadWeb3();
  }, []);

  useEffect(() => {
    if (web3Loaded) {
      loadBlockchainData();
    }
  }, [web3Loaded]);

  return (
    <Wrapper>
      <Navbar account={account} />
      <Container>
        <Row>
          <MainContainer role="main" style={{ maxWidth: "600px" }}>
            <ContentContainer>
              <Ref
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              ></Ref>
              {loading ? (
                <LoaderContainer id="loader">Loading...</LoaderContainer>
              ) : (
                <Main />
              )}
            </ContentContainer>
          </MainContainer>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default App;
