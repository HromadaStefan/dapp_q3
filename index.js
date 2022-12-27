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

      const balanceOfABI = [
        {
          constant: true,
          inputs: [
            {
              name: '_owner',
              type: 'address',
            },
          ],
          name: 'balanceOf',
          outputs: [
            {
              name: 'balance',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ];

      const contract = new web3.eth.Contract(balanceOfABI, tokenContract);

      document.getElementById('block_height').innerText = await contract.methods
        .balanceOf(walletAddress[0])
        .call();
    });
});
