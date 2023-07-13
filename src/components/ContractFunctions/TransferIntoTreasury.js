import { useState } from 'react';
import { toast } from 'react-toastify';
import { transferIntoTreasuryServerCall } from '../../server';
import { POLYGON_API, STORAGECHAIN } from '../../utils/constants';
import { transferIntoTreasury } from '../../web3/ContractIntegrations';

function TransferInTreasury() {
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
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

        if (!wrapStorTokenResponseFromServer?.success) {
          return toast.error(wrapStorTokenResponseFromServer?.message);
        }
        return toast.success(wrapStorTokenResponseFromServer?.message);
      }
    } catch (err) {
      console.error(
        'file: ContractFunctions.jsx:54 ~ handletransferIntoTreasuryAmountClick ~ err:',
        err
      );
      toast.error(err?.message);
    } finally {
      setLoadingMessage('');
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type='number'
        placeholder='Enter the amount to get WSTOR tokens.'
        value={transferIntoTreasuryAmount}
        onChange={handleTreasuryAmountChange}
      />
      <button
        disabled={loading}
        onClick={handletransferIntoTreasuryAmountClick}
      >
        {loading ? `Processing. ${loadingMessage} ` : 'STOR to WSTOR'}
      </button>
    </div>
  );
}

export default TransferInTreasury;
