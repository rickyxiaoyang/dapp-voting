import React from "react";
import { useWeb3 } from "../web3/Web3Context";

export const AccountBar = () => {
    const { account } = useWeb3();

    return (
        <div>
            <p>Account: {account}</p>
        </div>
    );
};
