import { useState } from 'react';
import { toast } from 'react-toastify';
import { depositInTreasuryFromServer } from '../../server';
import { POLYGON_API, STORAGECHAIN } from '../../utils/constants';
import { burnWrapStor } from '../../web3/ContractIntegrations/ethChainContract';

function DepositInTreasury() {
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loading, setLoading] = useState(false);

  console.log(
    'file: DepositInTreasury.js:11 ~ DepositInTreasury ~ loadingMessage:',
    loadingMessage
  );

  const [depositInTreasuryAmount, setDepositInTreasuryAmount] = useState(0);

  const handleTreasuryAmountChange = (event) => {
    setDepositInTreasuryAmount(event.target.value);
  };

  const handleDepositInTreasuryAmountClick = async () => {
    try {
      setLoading(true);
      setLoadingMessage('Waiting for WSTOR to burned.');

      if (!depositInTreasuryAmount) {
        throw new Error('Please provide the amount to deposit.');
      }
      const depositInTreasuryResponse = await burnWrapStor(
        depositInTreasuryAmount
      );

      if (
        depositInTreasuryResponse?.status &&
        depositInTreasuryResponse?.transactionHash
      ) {
        toast.success('Amount Deposited.');
        setLoadingMessage('Waiting for getting STOR tokens.');

        const storTokenFromServerResponse = await depositInTreasuryFromServer(
          POLYGON_API,
          STORAGECHAIN,
          depositInTreasuryResponse?.transactionHash
        );
        console.log(
          'file: DepositInTreasury.js:45 ~ handleDepositInTreasuryAmountClick ~ storTokenFromServer:',
          storTokenFromServerResponse
        );

        if (!storTokenFromServerResponse?.success) {
          return toast.error(storTokenFromServerResponse?.message);
        }

        return toast.success(storTokenFromServerResponse?.message);
      }
    } catch (err) {
      console.error(
        'file: ContractFunctions.jsx:54 ~ handleDepositInTreasuryAmountClick ~ err:',
        err
      );
      toast.error(err?.message);
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  return (
    <div>
      <input
        type='number'
        placeholder='Enter the amount to get STOR tokens.'
        value={depositInTreasuryAmount}
        onChange={handleTreasuryAmountChange}
      />
      <button disabled={loading} onClick={handleDepositInTreasuryAmountClick}>
        {loading ? `Processing. ${loadingMessage}` : 'WSTOR to STOR'}
      </button>
    </div>
  );
}

export default DepositInTreasury;
