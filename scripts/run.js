const { ethers } = require("hardhat");

const main = async () => {
  const GoerliEtherMarketFactory = await hre.ethers.getContractFactory(
    "GoerliEtherMarket"
  );
  const GoerliEtherMarketContract = await GoerliEtherMarketFactory.deploy();
  await GoerliEtherMarketContract.deployed();

  console.log(
    "GoerliEtherMarketContract address: ",
    GoerliEtherMarketContract.address
  );

  const [owner, secondAccount] = await ethers.getSigners();
  console.log("owner: ", owner.address);
  console.log("secondAccount: ", secondAccount.address);

  const balance = await GoerliEtherMarketContract.getBalance();
  console.log("balance: ", balance);

  const receivableEtherAmount =
    await GoerliEtherMarketContract.getReceivableAmount();
  console.log("receivableEtherAmount: ", receivableEtherAmount);

  // const receiveEtherBeforeAmountTx =
  //   await GoerliEtherMarketContract.receiveEther();
  // await receiveEtherBeforeAmountTx.wait();

  const donateEtherTx = await GoerliEtherMarketContract.donateEther({
    value: ethers.utils.parseEther("2"),
  });
  await donateEtherTx.wait();

  const balance2 = await GoerliEtherMarketContract.getBalance();
  console.log("balance 2: ", ethers.utils.formatEther(balance2));

  const getDonate = await GoerliEtherMarketContract.getDonate();
  console.log("getDonate: ", getDonate);

  const donateEtherTx2 = await GoerliEtherMarketContract.donateEther({
    value: ethers.utils.parseEther("2"),
  });
  await donateEtherTx2.wait();

  const getDonate2 = await GoerliEtherMarketContract.getDonate();
  console.log("getDonate2: ", getDonate2);

  const setReceivableEtherAmountTx =
    await GoerliEtherMarketContract.setReceivableEtherAmount(1000);
  await setReceivableEtherAmountTx.wait();

  const receiveEtherTx = await GoerliEtherMarketContract.receiveEther();
  await receiveEtherTx.wait();

  const balance3 = await GoerliEtherMarketContract.getBalance();
  console.log("balance 3: ", balance3);

  const getPayment = await GoerliEtherMarketContract.getPayment();
  console.log(
    "getPayment: ",
    ethers.utils.formatEther(getPayment.totalReceivedAmount)
  );

  const balance4 = await GoerliEtherMarketContract.getBalance();
  console.log("balance 4: ", balance4);

  const receiveEtherTx2 = await GoerliEtherMarketContract.connect(
    secondAccount
  ).receiveEther();
  await receiveEtherTx2.wait();

  const balance5 = await GoerliEtherMarketContract.getBalance();
  console.log("balance 5: ", balance5);

  // const receiveEtherTx3 = await GoerliEtherMarketContract.connect(
  //   secondAccount
  // ).receiveEther();
  // await receiveEtherTx3.wait();
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
