var Actors = artifacts.require("./Actors.sol");

module.exports = function(deployer) {
  deployer.deploy(Actors);
};
