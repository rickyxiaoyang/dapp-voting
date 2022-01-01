import React from "react";
import { useState } from "react";
import { useWeb3 } from "../web3/Web3Context";

export const AddCandidate = () => {
    const [name, setName] = useState("");
    const { addCandidate } = useWeb3();

    function onAddCandidate(event) {
        event.preventDefault();
        addCandidate(name);
    }

    return (
        <form onSubmit={onAddCandidate}>
            <h2>Add Candidate</h2>
            <label htmlFor="name">Name</label>
            <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />
            <button type="submit">Add Candidate</button>
        </form>
    );
};
