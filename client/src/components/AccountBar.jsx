import React from "react";
import { Button } from "react-bootstrap";
import { useWeb3 } from "../web3/Web3Context";
import "./AccountBar.css";

export const AccountBar = () => {
    const { account, disconnect, connect, isConnected } = useWeb3();

    return (
        <div className="top-bar d-flex justify-content-end">
            <p className="account-container">
                Account: <span style={{ fontWeight: "500" }}>{account}</span>
            </p>
        </div>
    );
};
