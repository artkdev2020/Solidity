// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract Color is ERC721, ERC721Enumerable {
    string[] public colors;
    mapping(string => bool) _colorExists;

    constructor() ERC721("Color", "COLOR")  {
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function mint(string memory _color) public {
        // Require unique color
        require(!_colorExists[_color]);
        // Color add color
        colors.push(_color);
        uint _id = colors.length;
        // Call the mint function
        _mint(msg.sender, _id);
        // Color track it
        _colorExists[_color] = true;
    }

   /* function mint(string memory _color) public {
        colors.push(_color);
        uint _id = colors.length;
        _mint(msg.sender, _id);
        _colorExists[_color] = true;

    }*/
}