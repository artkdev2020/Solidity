// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Color is ERC721, ERC721Enumerable {
    string[] public colors;
    address public owner;
    mapping(string => bool) _colorExists;

    struct ColorCoin {
        uint256 id;
        uint256 price;
        string name;
        bool isForSale;
    }
    uint256 public coinsCount = 0;
    mapping(uint256 => ColorCoin) public coins;

    event Sale(uint256 _tokenId, uint256 _value, address payable _owner);

    constructor() ERC721("Color", "COLOR") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function mint(string memory _color) public onlyOwner {
        // Require unique color
        require(!_colorExists[_color]);
        // Color add color
        colors.push(_color);
        uint256 _id = colors.length;
        // Call the mint function
        _mint(msg.sender, _id);
        // Color track it
        _colorExists[_color] = true;
        // count incriment
        coinsCount++;
        // create new coin
        ColorCoin memory _coin = ColorCoin(coinsCount, 0, _color, false);
        // add coin to mapp
        coins[coinsCount] = _coin;
    }

    function sale(uint256 _id, bool _newStatus) public {
        require(msg.sender == ownerOf(_id));
        ColorCoin memory _coin = coins[_id];
        require(_coin.isForSale != _newStatus);

        _coin.isForSale = _newStatus;
        coins[_id] = _coin;
    }

    function changePrice(uint256 _id, uint256 _newPrice) public returns (bool) {
        require(msg.sender == ownerOf(_id));
        ColorCoin memory coin = coins[_id];
        require(coin.price != _newPrice);

        coin.price = _newPrice;
        coins[_id] = coin;

        return true;
    }

    function transfer(address payable _owner, uint256 _tokenId) public payable {
        // Require unique color
        ColorCoin memory _coin = coins[_tokenId];
        string memory _color = _coin.name;

        require(_coin.isForSale);
        require(_colorExists[_color]);
        require(msg.value >= _coin.price);

        // call transfer
        _transfer(_owner, msg.sender, _tokenId);
        // money send
        _owner.transfer(msg.value);
        // for sale is false
        _coin.isForSale = false;
        coins[_tokenId] = _coin;
        // event
        emit Sale(_tokenId, msg.value, _owner);
    }

    /*function Approve() {

    }*/
}
