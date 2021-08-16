// eslint-disable-next-line no-undef
const News = artifacts.require("News");

module.exports = function(deployer) {
  deployer.deploy(News);
};
