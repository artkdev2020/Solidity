// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract Color is ERC721, ERC721Enumerable {
    string[] public colors;
    address public owner; 
    mapping(string => bool) _colorExists;

    uint colorCount = 0;
    mapping(uint => string) public colorsName;


    constructor() ERC721("Color", "COLOR")  {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function mint(string memory _color) onlyOwner public {
        // Require unique color
        require(!_colorExists[_color]);
        // Color add color
        colors.push(_color);
        uint _id = colors.length;
        // Call the mint function
        _mint(msg.sender, _id);
        // Color track it
        _colorExists[_color] = true;
        // add color
        colorCount++;
        // add color name to id
        colorsName[colorCount] = _color;
    }

    function trunsfer(
        address _to, 
        uint _tokenId
        ) public {
        // Require unique color
        string memory _color = colorsName[_tokenId];
        require(_colorExists[_color]);
        // call transfer
        transferFrom(msg.sender, _to, _tokenId);
    }


}