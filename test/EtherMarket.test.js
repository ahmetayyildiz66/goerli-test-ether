const { ethers } = require("hardhat");
const { expect } = require("chai");

const deployContract = async () => {
  const EtherMarketContractFactory = await hre.ethers.getContractFactory(
    "GoerliEtherMarket"
  );
  const EtherMarketContract = await EtherMarketContractFactory.deploy();
  await EtherMarketContract.deployed();
  return EtherMarketContract;
};

describe("EtherMarket", () => {
  let contract;
  before(async () => {
    contract = await deployContract();
  });

  it("should owner be able to set receivable ether amount", async () => {
    const receivableEtherAmount = await contract.getReceivableAmount();
    expect(receivableEtherAmount).to.be.eq(0);

    const setReceivableEtherAmountTx = await contract.setReceivableEtherAmount(
      1000
    );
    await setReceivableEtherAmountTx.wait();
    const receivableEtherAmount2 = await contract.getReceivableAmount();
    expect(receivableEtherAmount2).to.be.eq(
      ethers.utils.formatUnits(receivableEtherAmount2, "wei")
    );
  });

  it("a user should be able to donate ether", async () => {
    const balance = await contract.getBalance();
    expect(balance).to.be.eq(0);

    const donateEtherTx = await contract.donateEther({
      value: ethers.utils.parseEther("2"),
    });
    await donateEtherTx.wait();

    const balance2 = await contract.getBalance();
    expect(balance2).to.be.eq(ethers.utils.parseEther("2"));
  });
});
