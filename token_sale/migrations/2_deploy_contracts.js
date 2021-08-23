const ArtKDevToken = artifacts.require("ArtKDevToken");

module.exports = function (deployer) {
  deployer.deploy(ArtKDevToken, 1000000);
};
