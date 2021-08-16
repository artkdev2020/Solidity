import React, { useEffect, useState } from "react";
// import Web3 from "web3";
import Navbar from "./Navbar";
// import News from "../abis/News.json";
import Main from "./Main";
import { Web3Api } from "../api/api";

const App = () => {
  const [account, setAccount] = useState("");
  const [newsNetwork, setNewsNetwork] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Web3Api.loadWeb3();

    // const loadWeb3 = async () => {
    //   if (window.ethereum) {
    //     window.web3 = new Web3(window.ethereum);
    //     await window.ethereum.enable();
    //   } else if (window.web3) {
    //     window.web3 = new Web3(window.web3.currentProvider);
    //   } else {
    //     window.alert(
    //       "Non-Ethereum browser detected. You should consider trying MetaMask!"
    //     );
    //   }
    // };
    // loadWeb3();
  }, []);

  useEffect(() => {
    Web3Api.loadBlockchainData(
      setAccount,
      setNewsNetwork,
      setPostCount,
      setPosts
    );
    // const loadBlockchainData = async () => {
    //   const web3 = window.web3;
    //   const accounts = await web3.eth.getAccounts();
    //   setAccount(accounts[0]);
    //   const networkId = await web3.eth.net.getId();
    //   const networkData = News.networks[networkId];
    //   if (networkData) {
    //     const newsNetworkLocal = new web3.eth.Contract(
    //       News.abi,
    //       networkData.address
    //     );
    //     setNewsNetwork(newsNetworkLocal);
    //     const postCount = await newsNetworkLocal.methods.postCount().call();
    //     setPostCount(postCount);
    //     let tmpPosts = [];
    //     for (let i = 0; i <= postCount; i++) {
    //       const post = await newsNetworkLocal.methods.posts(i).call();
    //       if (post[3] != 0) {
    //         tmpPosts.push(post);
    //       }
    //     }
    //     setPosts(tmpPosts.sort((a, b) => b.tipAmount - a.tipAmount));
    //   } else {
    //     window.alert("NewsNetwork contract not deployed to detected network.");
    //   }
    // };
    // loadBlockchainData();
  }, []);

  const createPost = content => {
    newsNetwork.methods.createPost(content).send({ from: account });
  };

  const tipPost = (id, tipAmount) => {
    newsNetwork.methods.tipPost(id).send({ from: account, value: tipAmount });
  };

  return (
    <div>
      <Navbar account={account} />
      <Main posts={posts} createPost={createPost} tipPost={tipPost} />
    </div>
  );
};

export default App;
