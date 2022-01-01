import React, { Component, useEffect } from "react";
import "./App.css";
import { AccountBar } from "./components/AccountBar";
import { Web3Provider } from "./web3/Web3Context";

export default function App() {
    return (
        <Web3Provider>
            <AccountBar />
        </Web3Provider>
    );
}
