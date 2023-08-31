// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/* For test */
//import "hardhat/console.sol";

contract GreenTextNFT is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    address payable private _adminAccount;
    uint256 private _mintFee;
    string private _baseURL;

    constructor(address adminAccount) ERC721("GreenText", "GreenText") {
        _adminAccount = payable(adminAccount);
        _mintFee = 3 * 10 ** 15;
        _baseURL = "https://localhost/green-text-nft/";
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseURL;
    }

    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseURL = baseURI;
    }

    function setAdminAccount(address adminAccount) external onlyOwner {
        _adminAccount = payable(adminAccount);
    }

    function mint() public payable {
        address payable sender = payable(msg.sender);
        //console.log("Sender's Balance:", sender.balance);
        //console.log("Sented Fee:", msg.value);
        //console.log("Required Fee:", _mintFee);
        require(msg.value >= _mintFee, "Insufficient Fee");

        //console.log("Transfering %s from %s to %s...", _mintFee, sender, _adminAccount);
        if (_adminAccount.send(msg.value))
        {
            //if (msg.value > _mintFee)
            //    sender.transfer(msg.value - _mintFee);
            
            uint256 tokenId = _tokenIdCounter.current();
            //console.log("Minting token:", tokenId);
            _tokenIdCounter.increment();
            _safeMint(sender, tokenId);
        }
    }

    /*function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override(ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }*/
}
