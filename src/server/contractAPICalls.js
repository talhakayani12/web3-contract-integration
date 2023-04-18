import axios from "axios";

const transferIntoTreasuryServerCall = async (
  sendNetwork,
  recieveNetwork,
  transactionHash
) => {
  try {
    const transferIntoTreasuryResponse = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_BASE_URL}contract-function/transferIntoTreasury/${sendNetwork}/${recieveNetwork}/${transactionHash}`,
      //   params: {
      //     send_network: sendNetwork,
      //     recive_network: recieveNetwork,
      //     transactionHash,
      //   },
    });

    return transferIntoTreasuryResponse?.data;
  } catch (err) {
    console.error(
      "file: contractAPICalls.js:7 ~ transferIntoTreasuryServerCall ~ err:",
      err
    );
  }
};

const depositInTreasuryFromServer = async (
  sendNetwork,
  recieveNetwork,
  transactionHash
) => {
  try {
    const depositInTreasuryResponse = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_BASE_URL}contract-function/depositInTreasury/${sendNetwork}/${recieveNetwork}/${transactionHash}`,
      //   params: {
      //     send_network: sendNetwork,
      //     recive_network: recieveNetwork,
      //     transactionHash,
      //   },
    });

    return depositInTreasuryResponse?.data;
  } catch (err) {
    console.error(
      "file: contractAPICalls.js:7 ~ transferIntoTreasuryServerCall ~ err:",
      err
    );
  }
};

export { transferIntoTreasuryServerCall, depositInTreasuryFromServer };
