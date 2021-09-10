const ArtToken = artifacts.require("ArtToken");
const ArtKDevTokenSale = artifacts.require("ArtKDevTokenSale");

module.exports = async function (deployer) {
  // deploy ArtToken
  await deployer.deploy(ArtToken, 1000000);``
  const token = await ArtToken.deployed()
  
  // deploy ArtKDevTokenSale
  let tokenPrice = 10000000000000
  
  const tokenSale = await deployer.deploy(ArtKDevTokenSale, token.address, tokenPrice)
  
  // Transfer all(or not all) tokens to the contract
};
