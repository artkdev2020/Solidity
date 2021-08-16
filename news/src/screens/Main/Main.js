import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { News } from "../../abis/News.json";
import { Container } from "./styles";
import { Header } from "../../components";

const Main = () => {
  const [account, setAccount] = useState("no connected account");
  const [news, setNews] = useState();
  const [postCount, setPostCount] = useState(0);

  // const onButtonClick = () => {
  //   setTest(test + 1);
  // };

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
        } catch (error) {
          window.alert("User denied account access...");
        }
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    };

    loadWeb3();
  }, []);

  useEffect(() => {
    const loadBlockchainData = async () => {
      const { web3 } = window;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const networkData = News.networks[networkId];
      if (networkData) {
        const getNews = new web3.eth.Contract(News.abi, networkData.address);
        setNews(getNews);

        const getPostCount = await getNews.methods.postCount().call();
        console.log(getPostCount);

        // console.log(getPostCount, news);
        // setPostCount(getPostCount);
      } else {
        window.alert(
          "Social Network contract not deployed to detected network"
        );
      }
    };

    loadBlockchainData();
  }, []);

  // useEffect(() => {
  //   console.log(news);
  // }, [news]);

  return (
    <Container>
      <Header name={account} />
      {/* <div>{test}</div>
      <button onClick={onButtonClick}>press</button> */}
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <h1>ArtKDev</h1>
              <p>
                Edit <code>src/components/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="http://www.artkdev.online"
                target="_blank"
                rel="noopener noreferrer"
              >
                Our Site{" "}
                <u>
                  <b>NOW! </b>
                </u>
              </a>
            </div>
          </main>
        </div>
      </div>
    </Container>
  );
};

export default Main;
