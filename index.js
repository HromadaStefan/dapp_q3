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

      const tokenContract = '0x16d1214f3F83a1F76F047729D75c5Fe46d334579';
      const fromAddress = walletAddress[0];
      const toAddress = '0x15433DA387451F9dE4565280C85506CB71aF9376';

      let contractABI = [
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
        },
      ];

      let contract = new Web3js.eth.Contract(contractABI, tokenAddress, {
        from: fromAddress,
      });

      let amount = Web3js.utils.toHex(Web3js.utils.toWei('1'));

      let data = contract.methods.transfer(toAddress, amount).encodeABI();

      document.getElementById('block_height').innerText = data;
    });
});
