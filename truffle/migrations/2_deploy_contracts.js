var orarioFactory = artifacts.require("./orarioFactory.sol");

module.exports = function(deployer)
{
    deployer.deploy(orarioFactory);
}