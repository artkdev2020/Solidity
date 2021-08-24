import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Token from "../../abis/Token.json";
import EthSwap from "../../abis/EthSwap.json";
import { Navbar } from "./components";
import { Main } from "../../components";
import {
  Wrapper,
  Container,
  Row,
  MainContainer,
  ContentContainer,
  Ref,
  LoaderContainer,
} from "./styles";

const App = () => {
  const [web3Loaded, setWeb3Loaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [web3Info, setWeb3Info] = useState({
    account: "",
    token: {},
    ethSwap: {},
    ethBalance: "0",
    tokenBalance: "0",
  });

  useEffect(() => {
    const loaded = loadWeb3();
    setWeb3Loaded(loaded);
  }, []);

  useEffect(() => {
    if (web3Loaded) {
      loadBlockchainData();
    }
  }, [web3Loaded]);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();

      return true;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);

      return true;
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    let fetchedWeb3Info = {
      account: "",
      token: {},
      ethSwap: {},
      ethBalance: "0",
      tokenBalance: "0",
    };

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    fetchedWeb3Info.account = account;

    const ethBalance = await web3.eth.getBalance(account);
    fetchedWeb3Info.ethBalance = ethBalance;

    // Load Token
    const networkId = await web3.eth.net.getId();
    const tokenData = Token.networks[networkId];
    if (tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address);
      let tokenBalance = await token.methods.balanceOf(account).call();
      fetchedWeb3Info.token = token;
      fetchedWeb3Info.tokenBalance = tokenBalance
        ? tokenBalance.toString()
        : "0";
    } else {
      window.alert("Token contract not deployed to detected network.");
    }

    // Load EthSwap
    const ethSwapData = EthSwap.networks[networkId];
    if (ethSwapData) {
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address);
      fetchedWeb3Info.ethSwap = ethSwap;
    } else {
      window.alert("EthSwap contract not deployed to detected network.");
    }

    setWeb3Info(fetchedWeb3Info);
    setLoading(false);
  };

  const buyTokens = (etherAmount) => {
    setLoading(true);

    try {
      const { ethSwap, account } = web3Info;
      console.log(ethSwap.methods.buyTokens());
      ethSwap.methods
        .buyTokens()
        .send({ value: etherAmount, from: account })
        .on("transactionHash", (hash) => {
          setLoading(false);
        });
    } catch (e) {
      console.log("Error on buyTokens", e);
    }
  };

  const sellTokens = (tokenAmount) => {
    setLoading(true);

    const { token, ethSwap, account } = web3Info;
    token.methods
      .approve(ethSwap.address, tokenAmount)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        ethSwap.methods
          .sellTokens(tokenAmount)
          .send({ from: account })
          .on("transactionHash", (hash) => {
            setLoading(false);
          });
      });
  };

  const getContent = () => {
    if (loading) {
      return <LoaderContainer id="loader">Loading...</LoaderContainer>;
    } else {
      return (
        <Main
          ethBalance={web3Info.ethBalance}
          tokenBalance={web3Info.tokenBalance}
          buyTokens={buyTokens}
          sellTokens={sellTokens}
        />
      );
    }
  };

  return (
    <Wrapper>
      <Navbar account={web3Info.account} />
      <Container>
        <Row>
          <MainContainer role="main" style={{ maxWidth: "600px" }}>
            <ContentContainer>
              <Ref
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              ></Ref>
              {getContent()}
            </ContentContainer>
          </MainContainer>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default App;
