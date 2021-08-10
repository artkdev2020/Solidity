pragma solidity ^0.5.0;

    // My contract News
    // News portal 
    // all wallets can post news
    //
    // Create posts
    // List all the posts
    //
    // and all wallets can tip these posts
    //
    // Tip posts

contract News {
    string public name;
    uint public postCount = 0;
    mapping(uint => Post) public posts;

    struct Post {
        uint id;
        string content;
        uint tipAmount;
        address payable author;
    }

    event PostCreated(
        uint id,
        string content,
        uint tipAmount,
        address payable author
    );

    event PostTippde(
        uint id,
        string content,
        uint tipAmount,
        address payable author
    );


    constructor() public {
        name = "ArtKDev development";
    }

    //  create post 
    function createPost(string memory _content) public {
        //Require valid content
        require(bytes(_content).length > 0, "_content is correct");
        // Increment the post count
        postCount ++;
        // Create the post
        posts[postCount] = Post(postCount, _content, 0, msg.sender);
        // Trigger event
        emit PostCreated(postCount, _content, 0, msg.sender);
    }

    function tipPost(uint _id) public payable {
        require(_id > 0 && _id <= postCount , 'id is correct');
        // Fetch the post
        Post memory _post = posts[_id];
        // Fetch the author
        address payable _author = _post.author;
        // Pay the author by sending them Ether
        address(_author).transfer(msg.value);
        // increment the tip amount
        _post.tipAmount = _post.tipAmount + msg.value;
        // Update the post
        posts[_id] = _post;
        // Trigger or event
        emit PostTippde(_id, _post.content, _post.tipAmount, _author);
    }

}