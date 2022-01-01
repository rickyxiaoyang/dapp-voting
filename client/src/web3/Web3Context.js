import { useEffect, useState } from "react";
import React from "react";
import Contract from "../contracts/VotingSystem.json";
import getWeb3 from "../getWeb3";

const Web3Context = React.createContext(undefined);

const Web3Provider = ({ children }) => {
    const [account, setAccount] = useState([]);
    const [web3, setWeb3] = useState(undefined);
    const [contract, setContract] = useState(undefined);

    useEffect(() => {
        async function load() {
            let w3 = await getWeb3();
            setWeb3(w3);

            const accounts = await w3.eth.getAccounts();
            setAccount(accounts[0]);

            const networkId = await w3.eth.net.getId();
            const deployedNetwork = Contract.networks[networkId];
            const contractInstance = new w3.eth.Contract(
                Contract.abi,
                deployedNetwork && deployedNetwork.address
            );
            setContract(contractInstance);
        }
        load();
    });

    return (
        <Web3Context.Provider
            value={{
                web3,
                account,
                contract,
            }}
        >
            {children}
        </Web3Context.Provider>
    );
};

const useWeb3 = () => {
    const context = React.useContext(Web3Context);
    console.log(context);
    return context;
};

export { Web3Provider, useWeb3 };
