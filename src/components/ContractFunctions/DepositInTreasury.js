import { useState } from 'react';
import { toast } from 'react-toastify';
import { depositInTreasuryFromServer } from '../../server';
import { POLYGON_API, STORAGECHAIN } from '../../utils/constants';
import { burnWrapStor } from '../../web3/ContractIntegrations/ethChainContract';

function DepositInTreasury() {
  const [loadingMessage, setLoadingMessage] = useState('');
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
      setLoadingMessage('Waiting for amount to be transfered to treasury.');

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
        setLoadingMessage('waiting for getting wrap tokens.');

        const storTokenFromServerResponse = await depositInTreasuryFromServer(
          POLYGON_API,
          STORAGECHAIN,
          depositInTreasuryResponse?.transactionHash
        );
        console.log(
          'file: DepositInTreasury.js:45 ~ handleDepositInTreasuryAmountClick ~ storTokenFromServer:',
          storTokenFromServerResponse
        );
      }
    } catch (err) {
      console.error(
        'file: ContractFunctions.jsx:54 ~ handleDepositInTreasuryAmountClick ~ err:',
        err
      );
      toast.error(err?.message);
    }
  };

  return (
    <div>
      <input
        type='number'
        placeholder='Enter the amount to deposit in treasury.'
        value={depositInTreasuryAmount}
        onChange={handleTreasuryAmountChange}
      />
      <button onClick={handleDepositInTreasuryAmountClick}>
        WSTOR to STOR
      </button>
    </div>
  );
}

export default DepositInTreasury;
