const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();
  
  await deployer.deploy(DappToken);
  const dappToken = await DappToken.deployed();

 
  deployer.deploy(TokenFarm, dappToken.address, daiToken.address);
  const tokenFarm = await TokenFarm.deployed();

  // transfer 1 mil tokens to contract
  await dappToken.transfer(tokenFarm.address, '1000000000000000000000000');
  // transfer 100 dap tokens to investor
  await daiToken.transfer(accounts[1], '100000000000000000000');

};


