import { useEffect, useState } from "react";
import React from "react";
import Contract from "../contracts/VotingSystem.json";
import getWeb3 from "../getWeb3";

const Web3Context = React.createContext(undefined);

const Web3Provider = ({ children }) => {
    const [account, setAccount] = useState(undefined);
    const [web3, setWeb3] = useState(undefined);
    const [contract, setContract] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [voted, setVoted] = useState(false);

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
            setIsLoaded(true);
        }
        load();
    });

    const getCandidates = async () => {
        if (!isLoaded) {
            return [];
        }
        const countOfCandidates = await contract.methods
            .countOfCandidates()
            .call();
        console.log(`Count of candidates: ${countOfCandidates}`);
        let arr = [];
        for (let i = 0; i < countOfCandidates; i++) {
            let candidate = await contract.methods.getCandidateAt(i).call();
            arr.push(candidate);
        }
        return arr;
    };

    const addCandidate = async (name) => {
        console.log(`Adding ${name}`);
        setIsLoaded(false);
        try {
            await contract.methods.addCandidate(name).send({ from: account });
        } catch (error) {
            console.error("Error adding candidate", error);
        }
        setIsLoaded(true);
    };

    const voteForCandidate = async (index) => {
        console.log(`Voting for Candidate ${index}`);
        try {
            await contract.methods
                .voteForCandidateAt(index)
                .send({ from: account });
            await getVoteStatus();
        } catch (error) {
            console.error("Could not vote for candidate", error);
        }
    };

    const getVoteStatus = async () => {
        if (!isLoaded) {
            return { voted: false, vote: -1 };
        }
        const resp = await contract.methods
            .getUserStatus()
            .call({ from: account });
        setVoted(resp[0]);
        return { voted: resp[0], vote: resp[1] };
    };

    return (
        <Web3Context.Provider
            value={{
                web3,
                account,
                contract,
                isLoaded,
                voted,
                getCandidates,
                addCandidate,
                voteForCandidate,
                getVoteStatus,
            }}
        >
            {children}
        </Web3Context.Provider>
    );
};

const useWeb3 = () => {
    const context = React.useContext(Web3Context);
    return context;
};

export { Web3Provider, useWeb3 };
