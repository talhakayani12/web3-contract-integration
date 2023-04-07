// import {
//   CHAIN_NAME_BY_CHAIN_ID,
//   CHAIN_TITLE,
//   CHAIN_TITLE_BY_CHAIN_ID,
//   getEstimatedGasPriceFromGasStationPolygon,
// } from "components/common/helpers/helpers";
// import { getUserBalance } from "utils/helpers/getUserBalance";
// import { web } from "webpack";
// import {
//   MARKETPLACE_CONTRACT_ADDRESS,
//   MINTING_CONTRACTS_DETAILS,
//   PQL_DEX_CONTRACT_ADDRESS,
//   PQL_TOKEN_CONTRACT_ADDRESS,
//   STACKING_CONTRACT_ADDRESS,
//   COMMON_CONTRACT_ABI,
//   COLLATERAL_MARKETPLACE_CONTRACT_ADDRESS,
// } from "./config";
// import { checkForMetamaskNetwork, getWeb3 } from "./web3";

// const initContract = (web3: any, contractABI: any, contractAddress: string) => {
//   const contract = new web3.eth.Contract(contractABI, contractAddress);
//   return contract;
// };

// const getGasPriceFromStation = async (web3: any, chainId: number) => {
//   try {
//     if (CHAIN_TITLE_BY_CHAIN_ID[chainId]?.toLowerCase() === "polygon") {
//       const gasPriceByStation = await getEstimatedGasPriceFromGasStationPolygon(
//         chainId === 137 ? "mainnet" : "testnet"
//       );
//       // const gasPriceByStation = 37.34551;
//       const gasPriceInGwei = await web3.utils.toWei(
//         gasPriceByStation.toFixed(5),
//         "gwei"
//       );
//       console.log(
//         "🚀 ~ file: contractHelpers.ts ~ line 32 ~ getGasPriceFromStation ~ gasPriceInGwei",
//         gasPriceInGwei
//       );

//       return gasPriceInGwei;
//     }
//     return false;
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 26 ~ getGasPriceFromStation ~ err",
//       err
//     );

//     throw err;
//   }
// };

// const checkForApprovalAndGetApproval = async (
//   web3: any,
//   chainId: number,
//   accounts: any,
//   spenderAddress: any,
//   taxAmount: number
// ) => {
//   try {
//     if (taxAmount === 0) {
//       return true;
//     }

//     const userBalance = await getUserBalance(
//       CHAIN_TITLE_BY_CHAIN_ID[chainId],
//       {}
//     );

//     if (!userBalance?.userPiqsolBalance) {
//       return -1;
//     }

//     let checkingForTokensApprovals = await checkForApprovalTokens(
//       web3,
//       chainId,
//       accounts,
//       spenderAddress
//     );

//     const approvedTokens = await web3.utils.fromWei(checkingForTokensApprovals);

//     if (approvedTokens >= taxAmount.toString()) return true;

//     const approvalTaxPayment = await approveTokens(
//       web3,
//       chainId,
//       accounts,
//       spenderAddress,
//       taxAmount
//     );
//     if (!approvalTaxPayment?.status && !approvalTaxPayment?.transactionHash) {
//       return false;
//     }

//     return true;
//   } catch (err) {
//     console.log("🚀 ~ file: contractHelpers.ts ~ line 50 ~ err", err);
//     throw err;
//   }
// };

// const mintNewNFT = async (
//   currentUser: any,
//   tokenURI: string,
//   taxAmount: number
// ) => {
//   try {
//     await checkForMetamaskNetwork(currentUser?.chainType);

//     const web3 = await getWeb3();

//     const chainId = await web3.eth.getChainId();

//     const accounts = await web3.eth.getAccounts();

//     const checkingForTokensApprovals = await checkForApprovalAndGetApproval(
//       web3,
//       chainId,
//       accounts,
//       MINTING_CONTRACTS_DETAILS[chainId].address,
//       taxAmount
//     );

//     if (checkingForTokensApprovals === -1) return -2;

//     if (checkingForTokensApprovals) {
//       const contract = initContract(
//         web3,
//         MINTING_CONTRACTS_DETAILS[chainId]?.contractABI,
//         MINTING_CONTRACTS_DETAILS[chainId]?.address
//       );
//       const estimatedGasFees = await contract.methods
//         .safeMint(accounts[0], tokenURI)
//         .estimateGas({ from: accounts[0] });

//       const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//       if (gasPriceFromStation) {
//         const mintNftResults = await contract.methods
//           .safeMint(accounts[0], tokenURI)
//           .send({
//             from: accounts[0],
//             gas: estimatedGasFees,
//             gasPrice: gasPriceFromStation,
//           });
//         return {
//           mintNftResults,
//           contractAddress: MINTING_CONTRACTS_DETAILS[chainId]?.address,
//         };
//       }

//       const mintNftResults = await contract.methods
//         .safeMint(accounts[0], tokenURI)
//         .send({
//           from: accounts[0],
//           gas: estimatedGasFees,
//         });
//       return {
//         mintNftResults,
//         contractAddress: MINTING_CONTRACTS_DETAILS[chainId]?.address,
//       };
//     }
//     return false;
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 14 ~ mintNewNFT ~ err",
//       err
//     );
//     throw err;
//   }
// };

// const mintFNFT = async (
//   currentUser: any,
//   tokenURI: string,
//   ownerAddress: string,
//   buyAmount: number,
//   taxAmount: number,
//   parentId: string,
//   parentTokenAddress: string
// ) => {
//   try {
//     await checkForMetamaskNetwork(currentUser?.chainType);

//     const web3 = await getWeb3();

//     const chainId = await web3.eth.getChainId();

//     const accounts = await web3.eth.getAccounts();

//     const checkingForTokensApprovals = await checkForApprovalAndGetApproval(
//       web3,
//       chainId,
//       accounts,
//       MINTING_CONTRACTS_DETAILS[chainId].address,
//       taxAmount
//     );
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 208 ~ checkingForTokensApprovals",
//       checkingForTokensApprovals
//     );
//     if (checkingForTokensApprovals === -1) return -2;

//     if (checkingForTokensApprovals) {
//       const contract = initContract(
//         web3,
//         MINTING_CONTRACTS_DETAILS[chainId]?.contractABI,
//         MINTING_CONTRACTS_DETAILS[chainId]?.address
//       );

//       const buyAmountWey = web3.utils.toWei(buyAmount.toString());
//       const estimatedGasFees = await contract.methods
//         .buy_fnft(ownerAddress, tokenURI, parentId, parentTokenAddress)
//         .estimateGas({ from: accounts[0], value: buyAmountWey });

//       const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//       if (gasPriceFromStation) {
//         const mintNftResults = await contract.methods
//           .buy_fnft(ownerAddress, tokenURI, parentId, parentTokenAddress)
//           .send({
//             from: accounts[0],
//             gas: estimatedGasFees,
//             value: buyAmountWey,
//             gasPrice: gasPriceFromStation,
//           });
//         return {
//           contractAddress: MINTING_CONTRACTS_DETAILS[chainId].address,
//           mintNftResults,
//         };
//       }

//       const mintNftResults = await contract.methods
//         .buy_fnft(ownerAddress, tokenURI, parentId, parentTokenAddress)
//         .send({
//           from: accounts[0],
//           gas: estimatedGasFees,
//           value: buyAmountWey,
//         });
//       return {
//         contractAddress: MINTING_CONTRACTS_DETAILS[chainId].address,
//         mintNftResults,
//       };
//     }
//     return false;
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 14 ~ mintNewNFT ~ err",
//       err
//     );
//     throw err;
//   }
// };

// const isApprovedForAll = async (
//   web3: any,
//   contract: any,
//   CONTRACT_ADDRESS: string
// ) => {
//   const accounts = await web3.eth.getAccounts();

//   const isApproved = await contract.methods
//     .isApprovedForAll(accounts[0], CONTRACT_ADDRESS)
//     .call({ from: accounts[0] });

//   return isApproved;
// };

// const checkForIsApproved = async (
//   web3: any,
//   contract: any,
//   tokenId: string
// ) => {
//   try {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts:276 ~ tokenId",
//       tokenId,
//       typeof tokenId
//     );
//     const accounts = await web3.eth.getAccounts();
//     const isApproved = await contract.methods.getApproved(tokenId).call({
//       from: accounts[0],
//     });

//     return isApproved;
//   } catch (err) {
//     console.log("🚀 ~ file: contractHelpers.ts:292 ~ err", err);
//     throw err;
//   }
// };

// const approve = async (
//   web3: any,
//   contract: any,
//   tokenId: string,
//   MARKETPLACE_CONTRACT_ADDRESS: string
// ) => {
//   const accounts = await web3.eth.getAccounts();
//   const chainId = await web3.eth.getChainId();
//   const estimatedGasFees = await contract.methods
//     .approve(MARKETPLACE_CONTRACT_ADDRESS, tokenId)
//     .estimateGas({ from: accounts[0] });

//   const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//   if (gasPriceFromStation) {
//     const gettingApproval = await contract.methods
//       .approve(MARKETPLACE_CONTRACT_ADDRESS, tokenId)
//       .send({
//         from: accounts[0],
//         gas: estimatedGasFees,
//         gasPrice: gasPriceFromStation,
//       });
//     return gettingApproval;
//   }

//   const gettingApproval = await contract.methods
//     .approve(MARKETPLACE_CONTRACT_ADDRESS, tokenId)
//     .send({ from: accounts[0], gas: estimatedGasFees });
//   return gettingApproval;
// };

// const setApprovalForAll = async (
//   web3: any,
//   contract: any,
//   CONTRACT_ADDRESS: string
// ) => {
//   try {
//     const accounts = await web3.eth.getAccounts();
//     const chainId = await web3.eth.getChainId();
//     const estimatedGasFees = await contract.methods
//       .setApprovalForAll(CONTRACT_ADDRESS, true)
//       .estimateGas({ from: accounts[0] });

//     const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//     if (gasPriceFromStation) {
//       const settingApprovalForAll = await contract.methods
//         .setApprovalForAll(CONTRACT_ADDRESS, true)
//         .send({
//           from: accounts[0],
//           gas: estimatedGasFees,
//           gasPrice: gasPriceFromStation,
//         });
//       return settingApprovalForAll;
//     }

//     const settingApprovalForAll = await contract.methods
//       .setApprovalForAll(CONTRACT_ADDRESS, true)
//       .send({
//         from: accounts[0],
//         gas: estimatedGasFees,
//       });
//     return settingApprovalForAll;
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 43 ~ setApprovalForAll ~ err",
//       err
//     );

//     throw err;
//   }
// };

// const checkApprovalForOneOrAll = async (
//   web3: any,
//   contract: any,
//   tokenId: string,
//   address: string
// ) => {
//   try {
//     let isApproved = await checkForIsApproved(web3, contract, tokenId);
//     return isApproved;
//   } catch (err) {
//     console.log("🚀 ~ file: contractHelpers.ts:379 ~ err", err);
//     let isApprovedForAllResponse = await isApprovedForAll(
//       web3,
//       contract,
//       address
//     );

//     return isApprovedForAllResponse;
//   }
// };

// const setApprovalOrApprovalForAll = async (
//   web3: any,
//   contract: any,
//   tokenId: string,
//   address: string
// ) => {
//   try {
//     const approvalResponse = await approve(web3, contract, tokenId, address);

//     return approvalResponse;
//   } catch (err) {
//     if (err?.message?.includes("User denied transaction signature")) {
//       throw err;
//     }

//     const approvalForAllResponse = await setApprovalForAll(
//       web3,
//       contract,
//       address
//     );
//     return approvalForAllResponse;
//   }
// };

// const listItemForFixedPrice = async (
//   web3: any,
//   contract: any,
//   approvalContract: any,
//   contractFunctionArguments: any,
//   MARKETPLACE_CONTRACT_ADDRESS: string,
//   NFT_CONTRACT_ADDRESS: string,
//   taxAmount: number
// ) => {
//   try {
//     const accounts = await web3.eth.getAccounts();

//     const chainId = await web3.eth.getChainId();

//     const checkingForTokensApprovals = await checkForApprovalAndGetApproval(
//       web3,
//       chainId,
//       accounts,
//       MARKETPLACE_CONTRACT_ADDRESS,
//       taxAmount
//     );

//     if (checkingForTokensApprovals === -1) return -2;

//     if (checkingForTokensApprovals) {
//       const priceToWei = await web3.utils.toWei(
//         contractFunctionArguments?.price.toString()
//       );

//       let responseApprovalCheck = await checkApprovalForOneOrAll(
//         web3,
//         approvalContract,
//         contractFunctionArguments?.tokenId,
//         MARKETPLACE_CONTRACT_ADDRESS
//       );

//       if (
//         !responseApprovalCheck ||
//         responseApprovalCheck.toLowerCase() !==
//           MARKETPLACE_CONTRACT_ADDRESS.toLowerCase()
//       ) {
//         const settingApprovalForAll = await setApprovalOrApprovalForAll(
//           web3,
//           approvalContract,
//           contractFunctionArguments?.tokenId,
//           MARKETPLACE_CONTRACT_ADDRESS
//         );

//         if (!settingApprovalForAll?.status) {
//           return -1;
//         }

//         if (
//           settingApprovalForAll?.status &&
//           settingApprovalForAll?.transactionHash
//         ) {
//           responseApprovalCheck = true;
//         }
//       }

//       if (responseApprovalCheck) {
//         const estimatedGasFees = await contract.methods
//           .listFixedItemToMarket(
//             parseInt(contractFunctionArguments?.tokenId),
//             NFT_CONTRACT_ADDRESS,
//             BigInt(priceToWei),
//             contractFunctionArguments?.royaltiesAddress,
//             contractFunctionArguments?.percentageBasisPoints,
//             contractFunctionArguments?.minterRoyalty,
//             contractFunctionArguments?.minterRoyaltyBasicProints
//           )
//           .estimateGas({ from: accounts[0] });

//         const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//         if (gasPriceFromStation) {
//           const listingItemOnSaleForFixedPrice = await contract.methods
//             .listFixedItemToMarket(
//               parseInt(contractFunctionArguments?.tokenId),
//               NFT_CONTRACT_ADDRESS,
//               BigInt(priceToWei),
//               contractFunctionArguments?.royaltiesAddress,
//               contractFunctionArguments?.percentageBasisPoints,
//               contractFunctionArguments?.minterRoyalty,
//               contractFunctionArguments?.minterRoyaltyBasicProints
//             )
//             .send({
//               from: accounts[0],
//               gas: estimatedGasFees,
//               gasPrice: gasPriceFromStation,
//             });

//           return listingItemOnSaleForFixedPrice;
//         }

//         const listingItemOnSaleForFixedPrice = await contract.methods
//           .listFixedItemToMarket(
//             parseInt(contractFunctionArguments?.tokenId),
//             NFT_CONTRACT_ADDRESS,
//             BigInt(priceToWei),
//             contractFunctionArguments?.royaltiesAddress,
//             contractFunctionArguments?.percentageBasisPoints,
//             contractFunctionArguments?.minterRoyalty,
//             contractFunctionArguments?.minterRoyaltyBasicProints
//           )
//           .send({
//             from: accounts[0],
//             gas: estimatedGasFees,
//           });

//         return listingItemOnSaleForFixedPrice;
//       }
//     }

//     return false;
//   } catch (err) {
//     console.log("🚀 ~ file: contractHelpers.ts ~ line 77 ~ err", err);
//     throw err;
//   }
// };

// const listItemForAuction = async (
//   web3: any,
//   contract: any,
//   approvalContract: any,
//   MARKETPLACE_CONTRACT_ADDRESS: string,
//   NFT_CONTRACT_ADDRESS: string,
//   contractFunctionArguments: any,
//   taxAmount: number
// ) => {
//   try {
//     const accounts = await web3.eth.getAccounts();

//     const chainId = await web3.eth.getChainId();

//     const checkingForTokensApprovals = await checkForApprovalAndGetApproval(
//       web3,
//       chainId,
//       accounts,
//       MARKETPLACE_CONTRACT_ADDRESS,
//       taxAmount
//     );
//     if (checkingForTokensApprovals === -1) return -2;

//     if (checkingForTokensApprovals) {
//       const priceToWei = await web3.utils.toWei(
//         contractFunctionArguments?.price.toString()
//       );

//       let responseApprovalCheck = await checkApprovalForOneOrAll(
//         web3,
//         approvalContract,
//         contractFunctionArguments?.tokenId,
//         MARKETPLACE_CONTRACT_ADDRESS
//       );

//       if (
//         !responseApprovalCheck ||
//         responseApprovalCheck.toLowerCase() !==
//           MARKETPLACE_CONTRACT_ADDRESS.toLowerCase()
//       ) {
//         const settingApprovalForAll = await setApprovalOrApprovalForAll(
//           web3,
//           approvalContract,
//           contractFunctionArguments?.tokenId,
//           MARKETPLACE_CONTRACT_ADDRESS
//         );

//         if (!settingApprovalForAll?.status) {
//           return -1;
//         }

//         if (
//           settingApprovalForAll?.status &&
//           settingApprovalForAll?.transactionHash
//         ) {
//           responseApprovalCheck = true;
//         }
//       }

//       if (responseApprovalCheck) {
//         const estimatedGas = await contract.methods
//           .listAuctionItemToMarket(
//             contractFunctionArguments?.tokenId,
//             NFT_CONTRACT_ADDRESS,
//             BigInt(priceToWei),
//             contractFunctionArguments?.endTime,
//             contractFunctionArguments?.royaltiesAddress,
//             contractFunctionArguments?.percentageBasisPoints,
//             contractFunctionArguments?.minterRoyalty,
//             contractFunctionArguments?.minterRoyaltyBasicProints
//           )
//           .estimateGas({ from: accounts[0] });

//         const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//         if (gasPriceFromStation) {
//           const startingAuction = await contract.methods
//             .listAuctionItemToMarket(
//               contractFunctionArguments?.tokenId,
//               NFT_CONTRACT_ADDRESS,
//               BigInt(priceToWei),
//               contractFunctionArguments?.endTime,
//               contractFunctionArguments?.royaltiesAddress,
//               contractFunctionArguments?.percentageBasisPoints,
//               contractFunctionArguments?.minterRoyalty,
//               contractFunctionArguments?.minterRoyaltyBasicProints
//             )
//             .send({
//               from: accounts[0],
//               gas: estimatedGas,
//               gasPrice: gasPriceFromStation,
//             });
//           return startingAuction;
//         }

//         const startingAuction = await contract.methods
//           .listAuctionItemToMarket(
//             contractFunctionArguments?.tokenId,
//             NFT_CONTRACT_ADDRESS,
//             BigInt(priceToWei),
//             contractFunctionArguments?.endTime,
//             contractFunctionArguments?.royaltiesAddress,
//             contractFunctionArguments?.percentageBasisPoints,
//             contractFunctionArguments?.minterRoyalty,
//             contractFunctionArguments?.minterRoyaltyBasicProints
//           )
//           .send({ from: accounts[0], gas: estimatedGas });
//         return startingAuction;
//       }
//     }
//     return false;
//   } catch (err) {
//     console.log("🚀 ~ file: contractHelpers.ts ~ line 134 ~ err", err);
//     throw err;
//   }
// };

// const placeNftBid = async (
//   web3: any,
//   contract: any,
//   marketplaceItemListId: string,
//   value: Number,
//   taxAmount: number
// ) => {
//   try {
//     const valueToWei = await web3.utils.toWei(value?.toString());
//     const accounts = await web3.eth.getAccounts();

//     const chainId = await web3.eth.getChainId();

//     const checkingForTokensApprovals = await checkForApprovalAndGetApproval(
//       web3,
//       chainId,
//       accounts,
//       MARKETPLACE_CONTRACT_ADDRESS[chainId].address,
//       taxAmount
//     );

//     if (checkingForTokensApprovals === -1) return -2;

//     if (checkingForTokensApprovals) {
//       const estimatedGasFees = await contract.methods
//         .bid(parseInt(marketplaceItemListId))
//         .estimateGas({ from: accounts[0], value: valueToWei });

//       const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//       if (gasPriceFromStation) {
//         const bidNftResults = await contract.methods
//           .bid(parseInt(marketplaceItemListId))
//           .send({
//             from: accounts[0],
//             gas: estimatedGasFees,
//             value: valueToWei,
//             gasPrice: gasPriceFromStation,
//           });
//         return bidNftResults;
//       }

//       const bidNftResults = await contract.methods
//         .bid(parseInt(marketplaceItemListId))
//         .send({
//           from: accounts[0],
//           gas: estimatedGasFees,
//           value: valueToWei,
//         });
//       return bidNftResults;
//     }
//     return false;
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 199 ~ placeNftBid ~ err",
//       err
//     );
//     throw err;
//   }
// };

// const endAuction = async (web3: any, contract: any, tokenId: string) => {
//   try {
//     const accounts = await web3.eth.getAccounts();

//     const chainId = await web3.eth.getChainId();

//     const estimatedGasFees = await contract.methods
//       .auctionEnd(tokenId)
//       .estimateGas({ from: accounts[0] });

//     const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//     if (gasPriceFromStation) {
//       const endAuctionResult = await contract.methods.auctionEnd(tokenId).send({
//         from: accounts[0],
//         gas: estimatedGasFees,
//         gasPrice: gasPriceFromStation,
//       });

//       return endAuctionResult;
//     }

//     const endAuctionResult = await contract.methods.auctionEnd(tokenId).send({
//       from: accounts[0],
//       gas: estimatedGasFees,
//     });

//     return endAuctionResult;
//   } catch (err) {
//     throw err;
//   }
// };

// const buyNowFixedPriceNft = async (
//   web3: any,
//   contract: any,
//   merketplaceListItemId: string,
//   auctionPrice: number,
//   taxAmount: number
// ) => {
//   try {
//     const [accounts, priceToWei, chainId] = await Promise.all([
//       web3.eth.getAccounts(),
//       web3.utils.toWei(auctionPrice?.toString()),
//       await web3.eth.getChainId(),
//     ]);

//     const checkingForTokensApprovals = await checkForApprovalAndGetApproval(
//       web3,
//       chainId,
//       accounts,
//       MARKETPLACE_CONTRACT_ADDRESS[chainId].address,
//       taxAmount
//     );
//     if (checkingForTokensApprovals === -1) return -2;

//     if (checkingForTokensApprovals) {
//       // TODO: Adding Approvals for tokens

//       const estimatedGasFees = await contract.methods
//         .buyItem(merketplaceListItemId)
//         .estimateGas({ from: accounts[0], value: priceToWei });

//       const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//       if (gasPriceFromStation) {
//         const buyNowFixedPriceResponse = await contract.methods
//           .buyItem(merketplaceListItemId)
//           .send({
//             from: accounts[0],
//             value: priceToWei,
//             gas: estimatedGasFees,
//             gasPrice: gasPriceFromStation,
//           });
//         return buyNowFixedPriceResponse;
//       }

//       const buyNowFixedPriceResponse = await contract.methods
//         .buyItem(merketplaceListItemId)
//         .send({
//           from: accounts[0],
//           value: priceToWei,
//           gas: estimatedGasFees,
//         });
//       return buyNowFixedPriceResponse;
//     }
//     return false;
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 239 ~ buyNowFixedPriceNft ~ err",
//       err
//     );
//     throw err;
//   }
// };

// const confirmSaleAndTransferOwnerShip = async (
//   web3: any,
//   contract: any,
//   tokenId: string
// ) => {
//   try {
//     const accounts = await web3.eth.getAccounts();
//     const chainId = await web3.eth.getChainId();
//     const estimatedGasFees = await contract.methods
//       .confirmRequest(tokenId)
//       .estimateGas({ from: accounts[0] });

//     const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//     if (gasPriceFromStation) {
//       const confirmRequestResponse = await contract.methods
//         .confirmRequest(tokenId)
//         .send({
//           from: accounts[0],
//           gas: estimatedGasFees,
//           gasPrice: gasPriceFromStation,
//         });
//       return confirmRequestResponse;
//     }

//     const confirmRequestResponse = await contract.methods
//       .confirmRequest(tokenId)
//       .send({ from: accounts[0], gas: estimatedGasFees });
//     return confirmRequestResponse;
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 258 ~ confirmSaleAndTransferOwnerShip ~ err",
//       err
//     );
//     throw err;
//   }
// };

// const sendFranctionAuctionNftToContract = async (
//   tokenAddress: string,
//   tokenId: string,
//   fnftPrice: number,
//   totalBlocks: number
// ) => {
//   try {
//     const web3 = await getWeb3();

//     const chainId = await web3.eth.getChainId();

//     const contractDetails = MINTING_CONTRACTS_DETAILS[chainId];

//     if (
//       contractDetails?.address?.toLowerCase() !== tokenAddress?.toLowerCase()
//     ) {
//       const commonContract = await initContract(
//         web3,
//         COMMON_CONTRACT_ABI.contractABI,
//         tokenAddress
//       );

//       let isApproved = await checkForIsApproved(web3, commonContract, tokenId);

//       if (
//         isApproved?.toLowerCase() !== contractDetails?.address.toLowerCase()
//       ) {
//         const approvalOfTokenResponse = await approve(
//           web3,
//           commonContract,
//           tokenId,
//           contractDetails?.address
//         );

//         if (
//           approvalOfTokenResponse?.status &&
//           approvalOfTokenResponse?.transactionHash
//         ) {
//           isApproved = true;
//         }

//         if (!isApproved) {
//           throw new Error("Unable get the approval of token");
//         }
//       }
//     }

//     const contract = initContract(
//       web3,
//       contractDetails.contractABI,
//       contractDetails.address
//     );

//     const accounts = await web3.eth.getAccounts();

//     const valueToWei = await web3.utils.toWei(fnftPrice?.toString());

//     let approvedForAll = await isApprovedForAll(
//       web3,
//       contract,
//       contractDetails?.address
//     );

//     if (!approvedForAll) {
//       const getApproval = await setApprovalForAll(
//         web3,
//         contract,
//         contractDetails?.address
//       );

//       approvedForAll = getApproval;
//     }

//     if (
//       approvedForAll === true ||
//       (approvedForAll?.status && approvedForAll?.transactionHash)
//     ) {
//       const estimatedGasFees = await contract.methods
//         .fnft_listing(tokenAddress, tokenId, valueToWei, totalBlocks)
//         .estimateGas({ from: accounts[0] });

//       const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//       if (gasPriceFromStation) {
//         const transferFnftOwnerShip = await contract.methods
//           .fnft_listing(tokenAddress, tokenId, valueToWei, totalBlocks)
//           .send({
//             from: accounts[0],
//             gas: estimatedGasFees,
//             gasPrice: gasPriceFromStation,
//           });

//         return transferFnftOwnerShip;
//       }

//       const transferFnftOwnerShip = await contract.methods
//         .fnft_listing(tokenAddress, tokenId, valueToWei, totalBlocks)
//         .send({
//           from: accounts[0],
//           gas: estimatedGasFees,
//         });

//       return transferFnftOwnerShip;
//     }
//     return false;
//   } catch (err) {
//     throw err;
//   }
// };

// const buyPQLTokens = async (ethAmount: number) => {
//   try {
//     const web3 = await getWeb3();
//     const chainId = await web3.eth.getChainId();
//     const accounts = await web3.eth.getAccounts();

//     const ethAmountToWei = await web3.utils.toWei(ethAmount?.toString());

//     const pqlContractDetails = PQL_TOKEN_CONTRACT_ADDRESS[chainId];
//     const dexContractDetails = PQL_DEX_CONTRACT_ADDRESS[chainId];

//     const contract = initContract(
//       web3,
//       dexContractDetails.contractABI,
//       dexContractDetails?.address
//     );

//     const estimatedGasFees = await contract.methods
//       .Buy()
//       .estimateGas({ from: accounts[0], value: ethAmountToWei });

//     const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//     if (gasPriceFromStation) {
//       const buyPQLTokensResponse = await contract.methods.Buy().send({
//         from: accounts[0],
//         gas: estimatedGasFees,
//         value: ethAmountToWei,
//         gasPrice: gasPriceFromStation,
//       });

//       return buyPQLTokensResponse;
//     }

//     const buyPQLTokensResponse = await contract.methods.Buy().send({
//       from: accounts[0],
//       gas: estimatedGasFees,
//       value: ethAmountToWei,
//     });

//     return buyPQLTokensResponse;
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 527 ~ buyPQLTokens ~ err",
//       err
//     );
//     throw err;
//   }
// };

// const getPQLBalance = async (web3: any, accounts: any) => {
//   try {
//     const chainId = await web3.eth.getChainId();

//     const pqlContractDetails = PQL_TOKEN_CONTRACT_ADDRESS[chainId];

//     const contract = initContract(
//       web3,
//       pqlContractDetails?.contractABI,
//       pqlContractDetails?.address
//     );

//     const balance = await contract.methods
//       .balanceOf(accounts[0])
//       .call({ from: accounts[0] });

//     const convertedValue = await web3.utils.fromWei(balance, "ether");

//     return convertedValue;
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 526 ~ getPQLBalance ~ err",
//       err
//     );
//     throw err;
//   }
// };

// const approveTokens = async (
//   web3: any,
//   chainId: number,
//   accounts: any,
//   spenderAddress: string,
//   amount: number
// ) => {
//   try {
//     const tokenContractDetails = PQL_TOKEN_CONTRACT_ADDRESS[chainId];
//     const valueToWei = await web3.utils.toWei(amount?.toString());
//     const contract = initContract(
//       web3,
//       tokenContractDetails?.contractABI,
//       tokenContractDetails?.address
//     );

//     const estimatedGasFees = await contract.methods
//       .approve(spenderAddress, valueToWei)
//       .estimateGas({ from: accounts[0] });

//     const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//     if (gasPriceFromStation) {
//       const approvedTokens = await contract.methods
//         .approve(spenderAddress, valueToWei)
//         .send({
//           from: accounts[0],
//           gas: estimatedGasFees,
//           gasPrice: gasPriceFromStation,
//         });
//       return approvedTokens;
//     }

//     const approvedTokens = await contract.methods
//       .approve(spenderAddress, valueToWei)
//       .send({ from: accounts[0], gas: estimatedGasFees });

//     return approvedTokens;
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 554 ~ approveTokens ~ err",
//       err
//     );
//     throw err;
//   }
// };

// const checkForApprovalTokens = async (
//   web3: any,
//   chainId: number,
//   accounts: any,
//   spenderAddress: string
// ) => {
//   try {
//     const tokenContractDetails = PQL_TOKEN_CONTRACT_ADDRESS[chainId];
//     const contract = initContract(
//       web3,
//       tokenContractDetails?.contractABI,
//       tokenContractDetails?.address
//     );

//     const approvedTokens = await contract.methods
//       .allowance(accounts[0], spenderAddress)
//       .call({ from: accounts[0] });

//     return approvedTokens;
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 554 ~ approveTokens ~ err",
//       err
//     );
//     throw err;
//   }
// };

// const stakeUserTokens = async (amount: number, plan: number) => {
//   try {
//     const web3 = await getWeb3();
//     const chainId = await web3.eth.getChainId();

//     const accounts = await web3.eth.getAccounts();

//     const stakingContractDetails = STACKING_CONTRACT_ADDRESS[chainId];

//     const checkingForTokensApprovals = await checkForApprovalAndGetApproval(
//       web3,
//       chainId,
//       accounts,
//       stakingContractDetails.address,
//       amount
//     );

//     if (checkingForTokensApprovals === -1) return -2;

//     if (checkingForTokensApprovals) {
//       const stakingContract = initContract(
//         web3,
//         stakingContractDetails.contractABI,
//         stakingContractDetails.address
//       );

//       const valueToWei = await web3.utils.toWei(amount?.toString());

//       const estimatedGasFees = await stakingContract.methods
//         .staking(valueToWei, plan)
//         .estimateGas({ from: accounts[0] });

//       const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//       if (gasPriceFromStation) {
//         const stackedTokens = await stakingContract.methods
//           .staking(valueToWei, plan)
//           .send({
//             from: accounts[0],
//             gas: estimatedGasFees,
//             gasPrice: gasPriceFromStation,
//           });
//         return stackedTokens;
//       }

//       const stackedTokens = await stakingContract.methods
//         .staking(valueToWei, plan)
//         .send({ from: accounts[0], gas: estimatedGasFees });

//       return stackedTokens;
//     }

//     return false;
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 553 ~ stakeUserTokens ~ err",
//       err
//     );
//     throw err;
//   }
// };

// const payingTaxForChatForMultichain = async (taxCharges: number) => {
//   try {
//     if (taxCharges === 0) return { status: true };

//     const web3 = await getWeb3();
//     const chainId = await web3.eth.getChainId();
//     const accounts = await web3.eth.getAccounts();
//     const tokenContractDetails = PQL_TOKEN_CONTRACT_ADDRESS[chainId];
//     const valueToWei = await web3.utils.toWei(taxCharges?.toString());
//     const contract = initContract(
//       web3,
//       tokenContractDetails?.contractABI,
//       tokenContractDetails?.address
//     );

//     const adminWallet = process.env.REACT_APP_METAMASK_ADMIN_WALLET_ADDRESS;
//     const estimatedGasFees = await contract.methods
//       .transfer(adminWallet, valueToWei)
//       .estimateGas({ from: accounts[0] });

//     const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//     if (gasPriceFromStation) {
//       const responseForChatTaxFee = await contract.methods
//         .transfer(adminWallet, valueToWei)
//         .send({
//           from: accounts[0],
//           gas: estimatedGasFees,
//           gasPrice: gasPriceFromStation,
//         });
//       return responseForChatTaxFee;
//     }

//     const responseForChatTaxFee = await contract.methods
//       .transfer(adminWallet, valueToWei)
//       .send({ from: accounts[0], gas: estimatedGasFees });
//     return responseForChatTaxFee;
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 1048 ~ payingTaxForChatForMultichain ~ err",
//       err
//     );
//     throw err;
//   }
// };

// const cancelListingsOfFixedPrice = async (
//   marketplaceItemId: number,
//   functionNameForAuctionType: string
// ) => {
//   try {
//     const web3 = await getWeb3();
//     const [chainId, accounts] = await Promise.all([
//       web3.eth.getChainId(),
//       web3.eth.getAccounts(),
//     ]);

//     const contractDetails = MARKETPLACE_CONTRACT_ADDRESS[chainId];

//     const contract = initContract(
//       web3,
//       contractDetails?.contractABI,
//       contractDetails?.address
//     );

//     const estimatedGasFees = await contract.methods[functionNameForAuctionType](
//       marketplaceItemId
//     ).estimateGas({ from: accounts[0] });

//     const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//     if (gasPriceFromStation) {
//       const cancelListingsResponse = await contract.methods[
//         functionNameForAuctionType
//       ](marketplaceItemId).send({
//         from: accounts[0],
//         gas: estimatedGasFees,
//         gasPrice: gasPriceFromStation,
//       });

//       return cancelListingsResponse;
//     }

//     const cancelListingsResponse = await contract.methods[
//       functionNameForAuctionType
//     ](marketplaceItemId).send({ from: accounts[0], gas: estimatedGasFees });

//     return cancelListingsResponse;
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 1092 ~ cancelListings ~ err",
//       err
//     );
//     throw err;
//   }
// };

// const cancelListingFnFT = async (tokenAddress: string, tokenId: string) => {
//   try {
//     const web3 = await getWeb3();
//     const accounts = await web3.eth.getAccounts();
//     const chainId = await web3.eth.getChainId();

//     const contractDetails = MINTING_CONTRACTS_DETAILS[chainId];

//     const contract = await initContract(
//       web3,
//       contractDetails?.contractABI,
//       contractDetails?.address
//     );

//     const estimatedGasFees = await contract.methods
//       .cancle_fnft_ownership(tokenAddress, tokenId)
//       .estimateGas({ from: accounts[0] });
//     const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//     if (gasPriceFromStation) {
//       const responseOfCancelOwnerShip = await contract.methods
//         .cancle_fnft_ownership(tokenAddress, tokenId)
//         .send({
//           from: accounts[0],
//           gas: estimatedGasFees,
//           gasPrice: gasPriceFromStation,
//         });
//       return responseOfCancelOwnerShip;
//     }

//     const responseOfCancelOwnerShip = await contract.methods
//       .cancle_fnft_ownership(tokenAddress, tokenId)
//       .send({
//         from: accounts[0],
//         gas: estimatedGasFees,
//       });
//     return responseOfCancelOwnerShip;
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 1143 ~ cancelListingFnFT ~ err",
//       err
//     );
//     throw err;
//     // return false;
//   }
// };

// const withdrawUserStakedTokens = async (count: number) => {
//   try {
//     const web3 = await getWeb3();
//     const accounts = await web3.eth.getAccounts();
//     const chainId = await web3.eth.getChainId();
//     const contractDetails = STACKING_CONTRACT_ADDRESS[chainId];

//     const contract = initContract(
//       web3,
//       contractDetails?.contractABI,
//       contractDetails?.address
//     );

//     const estimatedGas = await contract.methods
//       .withdraw(count)
//       .estimateGas({ from: accounts[0] });

//     const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//     if (gasPriceFromStation) {
//       const responseOfWithdrawStaking = await contract.methods
//         .withdraw(count)
//         .send({
//           from: accounts[0],
//           gas: estimatedGas,
//           gasPrice: gasPriceFromStation,
//         });
//       return responseOfWithdrawStaking;
//     }

//     const responseOfWithdrawStaking = await contract.methods
//       .withdraw(count)
//       .send({ from: accounts[0], gas: estimatedGas });
//     return responseOfWithdrawStaking;
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 1250 ~ withdrawUserStakedTokens ~ err",
//       err
//     );
//     throw err;
//   }
// };

// const sendEtherAmountToAdminWallet = async (convertedValue: number) => {
//   try {
//     const web3 = await getWeb3();
//     const [chainId, accounts, valueToWei] = await Promise.all([
//       web3.eth.getChainId(),
//       web3.eth.getAccounts(),
//       web3.utils.toWei(convertedValue?.toString()),
//     ]);

//     const gasAmount = await web3.eth.estimateGas({
//       to: process.env.REACT_APP_METAMASK_ADMIN_WALLET_ADDRESS,
//       from: accounts[0],
//       value: valueToWei,
//     });
//     const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//     if (gasPriceFromStation !== false) {
//       const sentTransaction = await web3.eth.sendTransaction({
//         from: accounts[0],
//         to: process.env.REACT_APP_METAMASK_ADMIN_WALLET_ADDRESS,
//         value: valueToWei,
//         gas: gasAmount,
//         gasPrice: gasPriceFromStation,
//       });

//       return sentTransaction;
//     }

//     const sentTransaction = await web3.eth.sendTransaction({
//       from: accounts[0],
//       to: process.env.REACT_APP_METAMASK_ADMIN_WALLET_ADDRESS,
//       value: valueToWei,
//       gas: gasAmount,
//     });

//     return sentTransaction;
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 1294 ~ sendEtherAmountToAdminWal ~ err",
//       err
//     );
//     throw err;
//   }
// };

// const calculateEstimatedGasFees = async (pqlValue: string) => {
//   try {
//     const web3 = await getWeb3();
//     const accounts = await web3.eth.getAccounts();
//     const chainId = await web3.eth.getChainId();
//     const contractDetails = PQL_TOKEN_CONTRACT_ADDRESS[chainId];

//     const valueToWei = await web3.utils.toWei(pqlValue);

//     const contract = initContract(
//       web3,
//       contractDetails?.contractABI,
//       contractDetails?.address
//     );

//     const estimatedGasFees = await contract.methods
//       .transfer(accounts[0], valueToWei)
//       .estimateGas({
//         from: process.env.REACT_APP_METAMASK_ADMIN_WALLET_ADDRESS,
//       });

//     const weiValueOfGasPrice = await web3.utils.fromWei(
//       estimatedGasFees.toString()
//     );
//     const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//     if (gasPriceFromStation) {
//       const gasPriceConverted = await web3.utils.toWei(
//         (Number(weiValueOfGasPrice) * gasPriceFromStation).toFixed(12)
//       );
//       return web3.utils.fromWei(gasPriceConverted);
//     }

//     const gasPriceOfBSC = await web3.eth.getGasPrice();

//     const gasPriceConverted = await web3.utils.toWei(
//       (Number(weiValueOfGasPrice) * parseInt(gasPriceOfBSC))?.toFixed(12)
//     );
//     return web3.utils.fromWei(gasPriceConverted);
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 1374 ~ calculateEstimatedGasFees ~ err",
//       err
//     );
//     throw err;
//   }
// };

// const claimMainNFT = async (
//   parentId: string,
//   paranetAddress: string,
//   totalFnft: number
// ) => {
//   try {
//     const web3 = await getWeb3();
//     const [accounts, chainId] = await Promise.all([
//       web3.eth.getAccounts(),
//       web3.eth.getChainId(),
//     ]);

//     const contractDetails = MINTING_CONTRACTS_DETAILS[chainId];

//     const contract = initContract(
//       web3,
//       contractDetails?.contractABI,
//       contractDetails.address
//     );

//     const estimatedGasFees = await contract.methods
//       .claim_Nft(parentId, paranetAddress, totalFnft)
//       .estimateGas({ from: accounts[0] });

//     const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//     if (gasPriceFromStation) {
//       const responseClaimNft = await contract.methods
//         .claim_Nft(parentId, paranetAddress, totalFnft)
//         .send({
//           from: accounts[0],
//           gas: estimatedGasFees,
//           gasPrice: gasPriceFromStation,
//         });
//       return responseClaimNft;
//     }
//     const responseClaimNft = await contract.methods
//       .claim_Nft(parentId, paranetAddress, totalFnft)
//       .send({ from: accounts[0], gas: estimatedGasFees });

//     return responseClaimNft;
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 1393 ~ claimMainNFT ~ err",
//       err
//     );
//     throw err;
//   }
// };

// const checkForSameUserIsConnected = async (
//   currentUserWalletAddress: string
// ) => {
//   try {
//     const web3 = await getWeb3();
//     const accounts = await web3.eth.getAccounts();
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 1440 ~ accounts",
//       accounts
//     );

//     if (
//       accounts?.length > 0 &&
//       accounts[0]?.toLowerCase() === currentUserWalletAddress?.toLowerCase()
//     ) {
//       return true;
//     }
//     return false;
//   } catch (err) {
//     console.log("🚀 ~ file: web3.tsx ~ line 86 ~ err", err);
//     throw err;
//   }
// };

// const lazyMintNft = async (
//   tokenUri: string,
//   authorWalletAddress: string,
//   auctionPrice: number
// ) => {
//   try {
//     const web3 = await getWeb3();
//     const [accounts, chainId, auctionPriceWei] = await Promise.all([
//       web3.eth.getAccounts(),
//       web3.eth.getChainId(),
//       web3.utils.toWei(auctionPrice?.toString()),
//     ]);
//     const contractDetails = MINTING_CONTRACTS_DETAILS[chainId];

//     const contract = initContract(
//       web3,
//       contractDetails?.contractABI,
//       contractDetails.address
//     );

//     const estimatedGasFees = await contract.methods
//       .lazy_mint(authorWalletAddress, tokenUri)
//       .estimateGas({ from: accounts[0], value: auctionPriceWei });

//     const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//     if (gasPriceFromStation) {
//       const responseClaimNft = await contract.methods
//         .lazy_mint(authorWalletAddress, tokenUri)
//         .send({
//           from: accounts[0],
//           gas: estimatedGasFees,
//           gasPrice: gasPriceFromStation,
//           value: auctionPriceWei,
//         });
//       return responseClaimNft;
//     }
//     const responseClaimNft = await contract.methods
//       .lazy_mint(authorWalletAddress, tokenUri)
//       .send({
//         from: accounts[0],
//         gas: estimatedGasFees,
//         value: auctionPriceWei,
//       });

//     return responseClaimNft;
//   } catch (err) {
//     console.log("🚀 ~ file: contractHelpers.ts ~ line 1517 ~ err", err);
//     throw err;
//   }
// };

// const batchMinting = async (tokenUris: string[]) => {
//   try {
//     const web3 = await getWeb3();
//     const [accounts, chainId] = await Promise.all([
//       web3.eth.getAccounts(),
//       web3.eth.getChainId(),
//     ]);
//     const contractDetails = MINTING_CONTRACTS_DETAILS[chainId];

//     const contract = initContract(
//       web3,
//       contractDetails?.contractABI,
//       contractDetails.address
//     );

//     const nameOfTheContract = await contract.methods.name().call();
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 1532 ~ batchMinting ~ nameOfTheContract",
//       nameOfTheContract
//     );

//     const estimatedGasFees = await contract.methods
//       .Batch_mint(accounts[0], tokenUris)
//       .estimateGas({ from: accounts[0] });

//     const gasPriceFromStation = await getGasPriceFromStation(web3, chainId);

//     if (gasPriceFromStation) {
//       const responseClaimNft = await contract.methods
//         .Batch_mint(accounts[0], tokenUris)
//         .send({
//           from: accounts[0],
//           gas: estimatedGasFees,
//           gasPrice: gasPriceFromStation,
//         });
//       return responseClaimNft;
//     }
//     const responseClaimNft = await contract.methods
//       .Batch_mint(accounts[0], tokenUris)
//       .send({
//         from: accounts[0],
//         gas: estimatedGasFees,
//       });
//     console.log(
//       "🚀 ~ file: contractHelpers.ts ~ line 1553 ~ responseClaimNft",
//       responseClaimNft
//     );
//     return responseClaimNft;
//   } catch (err) {
//     throw err;
//   }
// };

// const getContractName = async (contractAddress: string) => {
//   const web3 = await getWeb3();
//   const contract = initContract(
//     web3,
//     COMMON_CONTRACT_ABI.contractABI,
//     contractAddress
//   );

//   const name = await contract.methods.name().call();
//   console.log(
//     "🚀 ~ file: contractHelpers.ts ~ line 1578 ~ getContractName ~ name",
//     name
//   );
//   return name;
// };

// const commonFunctionForContractInteractions = async (
//   methodName: string,
//   contractDetails: any,
//   haveArgument: boolean,
//   ownerAddress: string = "0xAAD7D223E95acE70f58cCF7Bf387Ddd651C33403"
// ) => {
//   console.log(
//     "🚀 ~ file: contractHelpers.ts ~ line 1591 ~ contractDetails",
//     contractDetails
//   );
//   try {
//     const web3 = await getWeb3();
//     const contract = initContract(
//       web3,
//       contractDetails?.contractABI,
//       contractDetails?.token_address
//     );

//     if (haveArgument && methodName === "tokenOfOwnerByIndex") {
//       const response = await contract.methods
//         .tokenOfOwnerByIndex(ownerAddress, contractDetails?.index)
//         .call();

//       return response;
//     }

//     if (haveArgument) {
//       const response = await contract.methods[methodName](
//         contractDetails?.index
//       ).call();
//       return response;
//     }

//     const response = await contract.methods[methodName]().call({
//       // from: "0xAAD7D223E95acE70f58cCF7Bf387Ddd651C33403",
//     });
//     return response;
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: NftValidator.tsx ~ line 119 ~ commonFunctionForContractInteractions ~ err",
//       err
//     );
//     return false;
//   }
// };

// export {
//   getGasPriceFromStation,
//   initContract,
//   mintNewNFT,
//   isApprovedForAll,
//   listItemForFixedPrice,
//   listItemForAuction,
//   placeNftBid,
//   endAuction,
//   buyNowFixedPriceNft,
//   confirmSaleAndTransferOwnerShip,
//   sendFranctionAuctionNftToContract,
//   mintFNFT,
//   buyPQLTokens,
//   getPQLBalance,
//   stakeUserTokens,
//   payingTaxForChatForMultichain,
//   cancelListingsOfFixedPrice,
//   cancelListingFnFT,
//   withdrawUserStakedTokens,
//   sendEtherAmountToAdminWallet,
//   calculateEstimatedGasFees,
//   claimMainNFT,
//   checkForSameUserIsConnected,
//   lazyMintNft,
//   batchMinting,
//   getContractName,
//   commonFunctionForContractInteractions,
// };
