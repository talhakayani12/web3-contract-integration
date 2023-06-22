import { useState } from 'react';
import { toast } from 'react-toastify';
import { transferIntoTreasuryServerCall } from '../../server';
import { POLYGON_API, STORAGECHAIN } from '../../utils/constants';
import { transferIntoTreasury } from '../../web3/ContractIntegrations';

function TransferInTreasury() {
  const [loadingMessage, setLoadingMessage] = useState('');
  console.log(
    'file: TransferIntoTreasury.js:9 ~ TransferInTreasury ~ loadingMessage:',
    loadingMessage
  );
  const [transferIntoTreasuryAmount, setTransferIntoTreasuryAmount] =
    useState(0);

  const handleTreasuryAmountChange = (event) => {
    setTransferIntoTreasuryAmount(event.target.value);
  };

  const handletransferIntoTreasuryAmountClick = async () => {
    try {
      setLoadingMessage('Waiting for amount to be transfered to treasury.');
      if (!transferIntoTreasuryAmount) {
        throw new Error('Please provide the amount to Transfer.');
      }
      const transferIntoTreasuryResponse = await transferIntoTreasury(
        transferIntoTreasuryAmount
      );

      if (
        transferIntoTreasuryResponse?.status &&
        transferIntoTreasuryResponse?.transactionHash
      ) {
        toast.success('Amount Transfered');
        setLoadingMessage('waiting for getting wrap tokens.');

        const wrapStorTokenResponseFromServer =
          await transferIntoTreasuryServerCall(
            STORAGECHAIN,
            POLYGON_API,
            transferIntoTreasuryResponse?.transactionHash
          );

        console.log(
          'file: TransferIntoTreasury.js:34 ~ handletransferIntoTreasuryAmountClick ~ storTokenResponseFromServer:',
          wrapStorTokenResponseFromServer
        );
      }
    } catch (err) {
      console.error(
        'file: ContractFunctions.jsx:54 ~ handletransferIntoTreasuryAmountClick ~ err:',
        err
      );
      toast.error(err?.message);
    } finally {
      setLoadingMessage('');
    }
  };

  return (
    <div>
      <input
        type='number'
        placeholder='Enter the amount to transfer into treasury.'
        value={transferIntoTreasuryAmount}
        onChange={handleTreasuryAmountChange}
      />
      <button onClick={handletransferIntoTreasuryAmountClick}>
        STOR to WSTOR
      </button>
    </div>
  );
}

export default TransferInTreasury;
