const getWeb3 = async () => {
  return new Promise(async (resolve, reject) => {
    const web3 = new Web3(window.ethereum);

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      resolve(web3);
    } catch (error) {
      reject(error);
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('connect_button')
    .addEventListener('click', async () => {
      const web3 = await getWeb3();

      const walletAddress = await web3.eth.requestAccounts();

      let tokenAddress = '0x16d1214f3F83a1F76F047729D75c5Fe46d334579';
      let toAddress = '0x15433DA387451F9dE4565280C85506CB71aF9376';
      let fromAddress = walletAddress[0]; // Use BigNumber
      let decimals = web3.utils.toBN(18);
      let amount = web3.utils.toBN(10);
      let minABI = [
        // transfer
        {
          constant: false,
          inputs: [
            {
              name: '_to',
              type: 'address',
            },
            {
              name: '_value',
              type: 'uint256',
            },
          ],
          name: 'transfer',
          outputs: [
            {
              name: '',
              type: 'bool',
            },
          ],
          type: 'function',
        },
      ];

      let contract = new web3.eth.Contract(minABI, tokenAddress);

      let value = amount.mul(web3.utils.toBN(10).pow(decimals));

      contract.methods
        .transfer(toAddress, value)
        .send({ from: fromAddress })
        .on('transactionHash', function (hash) {
          document.getElementById('block_height').innerHTML = hash;
        });
    });
});
