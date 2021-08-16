import React, { useState } from "react";
import Input from "./Input";
import Post from "./Post";

const Main = props => {
  const [postContent, setPostContent] = useState(null);

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main
          role="main"
          className="col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: "1000px" }}
        >
          <div className="content mr-auto ml-auto">
            <p>&nbsp;</p>
            <Input
              postContent={postContent}
              setPostContent={setPostContent}
              createPost={props.createPost}
            />
            <p>&nbsp;</p>
            {props.posts.map((post, key) => (
              <Post post={post} postKey={key} tipPost={props.tipPost} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;
