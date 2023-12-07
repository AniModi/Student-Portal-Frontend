// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AcademicResultNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("IIITV_RESULT", "IIITV") {}

    function mint(address to, string memory resultURI) external {
        uint256 tokenId = _tokenIds.current();
        _tokenIds.increment();
        _mint(to, tokenId);
        _setTokenURI(tokenId, resultURI);
    }
}
