import React, { useEffect, useState } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import getWeb3 from "./getWeb3";

import "./App.css";

function App() {
  // const [values, setValues] = useState({ storageValue: 0, web3: null, accounts: null, contract: null })
  
  // const componentDidMount = async () => {
  //   try {
  //     // Get network provider and web3 instance.
  //     const web3 = await getWeb3();

  //     // Use web3 to get the user's accounts.
  //     const accounts = await web3.eth.getAccounts();

  //     // Get the contract instance.
  //     const networkId = 5777;
  //     const deployedNetwork = SimpleStorageContract.networks[networkId];
  //     const instance = new web3.eth.Contract(
  //       SimpleStorageContract.abi,
  //       deployedNetwork && deployedNetwork.address,
  //     );

  //     // Set web3, accounts, and contract to the state, and then proceed with an
  //     // example of interacting with the contract's methods.
  //     setValues({...values, contract: instance, accounts, web3});
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     alert(
  //       `Failed to load web3, accounts, or contract. Check console for details.`,
  //     );
  //     console.error(error);
  //   }
  // };

  // const runExample = async () => {
  //   const { accounts, contract } = values;
  //   if(!contract)
  //     return
  //   console.log(contract)

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(29).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   setValues({...values,  storageValue: response });
  // };

  
  // useEffect(runExample, [values])

  // if (!values.web3) {
  //   return <div>Loading Web3, accounts, and contract...</div>;
  // }
  return (
    <div className="App">
      <h1>Dapp</h1>
    </div>
  );

}

export default App;
