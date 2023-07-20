// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Dojo = await ethers.getContractFactory("Dojo");
  const dojo = await Dojo.deploy();
  await dojo.deployed();

  console.log("Dojo address:", dojo.address);

  // await dojo.initilizeToken(100000000000, 20, 10); 
  // console.log("Currency Token Initialized to 100000000000");

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(dojo);
}

function saveFrontendFiles(dojo) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "client", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Dojo: dojo.address }, undefined, 2)
  );

  const DojoArtifact = artifacts.readArtifactSync("Dojo");

  fs.writeFileSync(
    path.join(contractsDir, "Dojo.json"),
    JSON.stringify(DojoArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
