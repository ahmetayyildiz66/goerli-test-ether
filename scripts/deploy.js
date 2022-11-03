const main = async () => {
  try {
    const goerliFaucetContractFactory = await hre.ethers.getContractFactory(
      "GoerliEtherMarket"
    );
    const goerliFaucetContract = await goerliFaucetContractFactory.deploy();
    await goerliFaucetContract.deployed();

    console.log("goerliFaucetContract address: ", goerliFaucetContract.address);
  } catch (err) {
    console.log("err");
  }
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log("err: ", err);
    process.exit(1);
  }
};

runMain();
