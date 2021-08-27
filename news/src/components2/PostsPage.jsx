import React from "react";

import Main from "./Main";

const PostPage = props => {
  const createPost = content => {
    props.newsNetwork.methods.createPost(content).send({ from: props.account });
  };

  const tipPost = (id, tipAmount) => {
    props.newsNetwork.methods
      .tipPost(id)
      .send({ from: props.account, value: tipAmount });
  };

  return (
    <div>
      <Main posts={props.posts} createPost={createPost} tipPost={tipPost} />
    </div>
  );
};

export default PostPage;
