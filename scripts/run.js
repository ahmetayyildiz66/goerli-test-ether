const { ethers } = require("hardhat");

const main = async () => {
  const GoerliEtherMarketFactory = await hre.ethers.getContractFactory(
    "GoerliEtherMarket"
  );
  const GoerliEtherMarketContract = await GoerliEtherMarketFactory.deploy();
  await GoerliEtherMarketContract.deployed();

  const [secondAccount] = await ethers.getSigners();

  const donateEtherTx = await GoerliEtherMarketContract.donateEther({
    value: ethers.utils.parseEther("2"),
  });
  await donateEtherTx.wait();

  const donateEtherTx2 = await GoerliEtherMarketContract.donateEther({
    value: ethers.utils.parseEther("2"),
  });
  await donateEtherTx2.wait();

  const setReceivableEtherAmountTx =
    await GoerliEtherMarketContract.setReceivableEtherAmount(1000);
  await setReceivableEtherAmountTx.wait();

  const receiveEtherTx = await GoerliEtherMarketContract.receiveEther();
  await receiveEtherTx.wait();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runMain();
