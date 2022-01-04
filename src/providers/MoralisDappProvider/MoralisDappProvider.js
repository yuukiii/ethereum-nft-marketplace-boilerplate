import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import MoralisDappContext from "./context";



require('dotenv').config();


function MoralisDappProvider({ children }) {
  const { web3, Moralis, user } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState();
  console.log(`ABI CONTRACT HERE!!!`)

  const [contractABI, setContractABI] = useState(process.env.REACT_APP_CONTRACT_ABI); //Smart Contract ABI here
  const [marketAddress, setMarketAddress] = useState(process.env.REACT_APP_MARKET_ADDRESS); //Smart Contract Address Here


  useEffect(() => {
    Moralis.onChainChanged(function (chain) {
      setChainId(chain);
    });

    Moralis.onAccountsChanged(function (address) {
      setWalletAddress(address[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setChainId(web3.givenProvider?.chainId));
  useEffect(
    () => setWalletAddress(web3.givenProvider?.selectedAddress || user?.get("ethAddress")),
    [web3, user]
  );

  return (
    <MoralisDappContext.Provider value={{ walletAddress, chainId, marketAddress, setMarketAddress, contractABI, setContractABI }}>
      {children}
    </MoralisDappContext.Provider>
  );
}

function useMoralisDapp() {
  const context = React.useContext(MoralisDappContext);
  if (context === undefined) {
    throw new Error("useMoralisDapp must be used within a MoralisDappProvider");
  }
  return context;
}

export { MoralisDappProvider, useMoralisDapp };
