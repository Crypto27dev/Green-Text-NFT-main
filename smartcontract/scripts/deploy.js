const { adminAccount } = require("../secrets.json");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with the account:", deployer.address);
    
    const GreenTextNFT = await ethers.getContractFactory("GreenTextNFT");
    const greenTextNFT = await GreenTextNFT.deploy(adminAccount);
    await greenTextNFT.waitForDeployment();
    const address = await greenTextNFT.getAddress();
    console.log("Deployed contract at ", address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
