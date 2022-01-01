import React, { useEffect } from "react";
import { useState } from "react";
import { useWeb3 } from "../web3/Web3Context";

export const CandidatesList = () => {
    const { getCandidates, contract, isLoaded } = useWeb3();
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const loadCandidates = async () => {
            const c = await getCandidates();
            setCandidates(c);
        };
        loadCandidates();
    }, [isLoaded]);

    return (
        <div>
            <ul>
                {candidates.map((candidate, index) => (
                    <li key={index}>{candidate.name}</li>
                ))}
            </ul>
        </div>
    );
};
