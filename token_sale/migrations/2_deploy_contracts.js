const ArtToken = artifacts.require("ArtToken");
const ArtKDevTokenSale = artifacts.require("ArtKDevTokenSale");

module.exports = async function (deployer) {
  // deploy ArtToken
  await deployer.deploy(ArtToken, 1000000);
  const token = await ArtToken.deployed()
  // deploy EthSwap
  await deployer.deploy(ArtKDevTokenSale, token.address)
  //const tokenSale = await ArtKDevTokenSale.deployed()

};
