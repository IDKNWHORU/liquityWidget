const troveManagerAddress = "0x0ECDF34731eE8Dd46caa99a1AAE173beD1B32c67";
const troveManagerAbi = fetch(
  "https://raw.githubusercontent.com/IDKNWHORU/liquity-sepolia/main/trove-manager-abi.json"
);

const sortedtrovesAddress = "0x136eF31a3aF35929e3Fc870dDB9b7c071DAB1B97";
const sortedtrovesAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_borrowerOperationsAddress",
        type: "address",
      },
    ],
    name: "BorrowerOperationsAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "_id", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "_NICR",
        type: "uint256",
      },
    ],
    name: "NodeAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "_id", type: "address" },
    ],
    name: "NodeRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_sortedDoublyLLAddress",
        type: "address",
      },
    ],
    name: "SortedTrovesAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_troveManagerAddress",
        type: "address",
      },
    ],
    name: "TroveManagerAddressChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "NAME",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "borrowerOperationsAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_id", type: "address" }],
    name: "contains",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "data",
    outputs: [
      { internalType: "address", name: "head", type: "address" },
      { internalType: "address", name: "tail", type: "address" },
      { internalType: "uint256", name: "maxSize", type: "uint256" },
      { internalType: "uint256", name: "size", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_NICR", type: "uint256" },
      { internalType: "address", name: "_prevId", type: "address" },
      { internalType: "address", name: "_nextId", type: "address" },
    ],
    name: "findInsertPosition",
    outputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFirst",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLast",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMaxSize",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_id", type: "address" }],
    name: "getNext",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_id", type: "address" }],
    name: "getPrev",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSize",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_id", type: "address" },
      { internalType: "uint256", name: "_NICR", type: "uint256" },
      { internalType: "address", name: "_prevId", type: "address" },
      { internalType: "address", name: "_nextId", type: "address" },
    ],
    name: "insert",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isEmpty",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isFull",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOwner",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_id", type: "address" },
      { internalType: "uint256", name: "_newNICR", type: "uint256" },
      { internalType: "address", name: "_prevId", type: "address" },
      { internalType: "address", name: "_nextId", type: "address" },
    ],
    name: "reInsert",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_id", type: "address" }],
    name: "remove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_size", type: "uint256" },
      {
        internalType: "address",
        name: "_troveManagerAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_borrowerOperationsAddress",
        type: "address",
      },
    ],
    name: "setParams",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "troveManager",
    outputs: [
      { internalType: "contract ITroveManager", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_NICR", type: "uint256" },
      { internalType: "address", name: "_prevId", type: "address" },
      { internalType: "address", name: "_nextId", type: "address" },
    ],
    name: "validInsertPosition",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];

const hintHelpersAddress = "0x5E24dC4C8f8052903c5dBe801F5A5faC18561a83";
const hintHelpersAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_sortedTrovesAddress",
        type: "address",
      },
    ],
    name: "SortedTrovesAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_troveManagerAddress",
        type: "address",
      },
    ],
    name: "TroveManagerAddressChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "BORROWING_FEE_FLOOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CCR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DECIMAL_PRECISION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LUSD_GAS_COMPENSATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MCR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MIN_NET_DEBT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NAME",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PERCENT_DIVISOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_100pct",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "activePool",
    outputs: [
      { internalType: "contract IActivePool", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_coll", type: "uint256" },
      { internalType: "uint256", name: "_debt", type: "uint256" },
      { internalType: "uint256", name: "_price", type: "uint256" },
    ],
    name: "computeCR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_coll", type: "uint256" },
      { internalType: "uint256", name: "_debt", type: "uint256" },
    ],
    name: "computeNominalCR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultPool",
    outputs: [
      { internalType: "contract IDefaultPool", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_CR", type: "uint256" },
      { internalType: "uint256", name: "_numTrials", type: "uint256" },
      { internalType: "uint256", name: "_inputRandomSeed", type: "uint256" },
    ],
    name: "getApproxHint",
    outputs: [
      { internalType: "address", name: "hintAddress", type: "address" },
      { internalType: "uint256", name: "diff", type: "uint256" },
      { internalType: "uint256", name: "latestRandomSeed", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntireSystemColl",
    outputs: [
      { internalType: "uint256", name: "entireSystemColl", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntireSystemDebt",
    outputs: [
      { internalType: "uint256", name: "entireSystemDebt", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_LUSDamount", type: "uint256" },
      { internalType: "uint256", name: "_price", type: "uint256" },
      { internalType: "uint256", name: "_maxIterations", type: "uint256" },
    ],
    name: "getRedemptionHints",
    outputs: [
      { internalType: "address", name: "firstRedemptionHint", type: "address" },
      {
        internalType: "uint256",
        name: "partialRedemptionHintNICR",
        type: "uint256",
      },
      { internalType: "uint256", name: "truncatedLUSDamount", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOwner",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceFeed",
    outputs: [
      { internalType: "contract IPriceFeed", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sortedTrovesAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_troveManagerAddress",
        type: "address",
      },
    ],
    name: "setAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sortedTroves",
    outputs: [
      { internalType: "contract ISortedTroves", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "troveManager",
    outputs: [
      { internalType: "contract ITroveManager", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const troveObject = {
  LUSDAmount,
  ETHColl,
  liquidationReserve,
  expectedFee,
  expectedDebt,
};

troveObject.LUSDAmount = ethers.BigNumber.from(ethers.utils.parseEther("2500"));
troveObject.ETHColl = ethers.BigNumber.from(ethers.utils.parseEther("5"));

const troveManager = new ethers.Contract(
  troveManagerAddress,
  troveManagerAbi.body,
  Ethers.provider().getSigner()
);

const sortedtroves = new ethers.Contract(
  sortedtrovesAddress,
  sortedtrovesAbi,
  Ethers.provider().getSigner()
);

const hintHelpers = new ethers.Contract(
  hintHelpersAddress,
  hintHelpersAbi,
  Ethers.provider().getSigner()
);

troveManager.LUSD_GAS_COMPENSATION().then((liquidationReserveRes) => {
  troveObject.liquidationReserve = liquidationReserveRes;
});

troveManager
  .getBorrowingFeeWithDecay(troveObject.LUSDAmount)
  .then((expectedFeeRes) => {
    troveObject.expectedFee = expectedFeeRes;

    troveObject.expectedDebt = troveObject.LUSDAmount.add(
      troveObject.expectedFee
    ).add(troveObject.liquidationReserve);

    const _1e20 = ethers.BigNumber.from(ethers.utils.parseEther("100"));

    const NICR = troveObject.ETHColl.mul(_1e20).div(troveObject.expectedDebt);

    sortedtroves.getSize().then((numTroves) => {
      const numTrials = numTroves.mul(ethers.BigNumber.from("15"));

      hintHelpers.getApproxHint(NICR, numTrials, 42).then((approxHintRes) => {
        const approxHint = approxHintRes[0];

        sortedtroves
          .findInsertPosition(NICR, approxHint, approxHint)
          .then((hintRes) => {
            const upperHint = hintRes[0];
            const lowerHint = hintRes[1];

            console.log({ upperHint, lowerHint });
          });
      });
    });
  });

return <Web3Connect />;
