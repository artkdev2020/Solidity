var Color = artifacts.require("Color");

module.exports = function(deployer) {
  // Deploy the Migrations contract as our only task
  deployer.deploy(Color);
};
