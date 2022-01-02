import React, { Component, useEffect } from "react";
import "./App.css";
import { AccountBar } from "./components/AccountBar";
import { AddCandidate } from "./components/AddCandidate";
import { CandidatesList } from "./components/CandidatesList";
import { UserVoteStatus } from "./components/UserVoteStatus";
import { Web3Provider } from "./web3/Web3Context";

export default function App() {
    return (
        <Web3Provider>
            <AccountBar />
            <div className="d-flex flex-row">
                <div className="container">
                    <AddCandidate />
                    <CandidatesList />
                </div>
                <UserVoteStatus />
            </div>
        </Web3Provider>
    );
}
