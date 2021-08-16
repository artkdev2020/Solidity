import React, { useEffect, useState } from "react";
// import Web3 from "web3";
import Navbar from "./Navbar";
// import News from "../abis/News.json";
import Main from "./Main";
import { Web3Api } from "../api/api";
import PostPage from "./PostsPage";

const App = () => {
  const [account, setAccount] = useState("");
  const [newsNetwork, setNewsNetwork] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Web3Api.loadWeb3();
  }, []);

  useEffect(() => {
    Web3Api.loadBlockchainData(
      setAccount,
      setNewsNetwork,
      setPostCount,
      setPosts
    );
  }, []);

  // const createPost = content => {
  //   newsNetwork.methods.createPost(content).send({ from: account });
  // };

  // const tipPost = (id, tipAmount) => {
  //   newsNetwork.methods.tipPost(id).send({ from: account, value: tipAmount });
  // };

  return (
    <div>
      <PostPage account={account} posts={posts} newsNetwork={newsNetwork} />
      {/* <Navbar account={account} />
      <Main posts={posts} createPost={createPost} tipPost={tipPost} /> */}
    </div>
  );
};

export default App;
