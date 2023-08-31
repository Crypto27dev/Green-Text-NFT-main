const { time, loadFixture, } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("GreenTextNFT contract", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
        const [owner] = await ethers.getSigners();
        console.log("Owner's Address:", owner.getAddress());

        const adminAddr = "0x124C5de82FBb442eE12B5f03944bB44E8e998E7D";
        const greenTextNFT = await ethers.deployContract("GreenTextNFT", [adminAddr]);
        //await greenTextNFT.waitForDeployment();
        //console.log("Contract Address:", greenTextNFT.getAddress());
        let fee = 3_000_000_000_000_000;

        await greenTextNFT.mint({ value: fee });
        console.log("Total Supply:", await greenTextNFT.totalSupply());

        fee = 5_000_000_000_000_000;
        await greenTextNFT.mint({ value: fee });
        console.log("Total Supply:", await greenTextNFT.totalSupply());

        fee = 3_000_000_000_000_000;
        await greenTextNFT.mint({ value: fee });
        console.log("Total Supply:", await greenTextNFT.totalSupply());
        
        const ownerBalance = await greenTextNFT.balanceOf(owner.address);
        expect(await greenTextNFT.totalSupply()).to.equal(ownerBalance);
    });
});