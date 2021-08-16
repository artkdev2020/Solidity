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

  return (
    <div>
      <PostPage account={account} posts={posts} newsNetwork={newsNetwork} />
    </div>
  );
};

export default App;
