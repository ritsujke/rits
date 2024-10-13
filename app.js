let web3;

async function connectWallet() {
    if (window.ethereum) {
        try {
            web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            document.getElementById('donationForm').style.display = 'block';
            document.getElementById('statusMessage').textContent = "Wallet connected!";
        } catch (error) {
            console.log(error);
            document.getElementById('statusMessage').textContent = "Connection failed. Please try again.";
        }
    } else {
        alert('MetaMask is not installed. Please install it to use this app.');
    }
}

async function donate() {
    const amountInEther = document.getElementById('amountInput').value;
    const charityAddress = document.getElementById('charitySelect').value;

    if (!amountInEther || !charityAddress) {
        document.getElementById('statusMessage').textContent = "Please fill in all fields.";
        return;
    }

    const accounts = await web3.eth.getAccounts();
    const fromAddress = accounts[0];

    web3.eth.sendTransaction({
        from: fromAddress,
        to: charityAddress,
        value: web3.utils.toWei(amountInEther, 'ether')
    })
    .then(() => {
        document.getElementById('statusMessage').textContent = `Donation of ${amountInEther} ETH sent to ${charityAddress}. Thank you for your generosity!`;
    })
    .catch(error => {
        console.error(error);
        document.getElementById('statusMessage').textContent = "Transaction failed. Please try again.";
    });
}

document.getElementById('connectWallet').addEventListener('click', connectWallet);
document.getElementById('donateButton').addEventListener('click', donate);
