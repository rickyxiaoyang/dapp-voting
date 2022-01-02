import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useWeb3 } from "../web3/Web3Context";

export function UserVoteStatus() {
    const [vote, setVote] = useState(-1);
    const { account, getVoteStatus, voted, isLoaded } = useWeb3();

    useEffect(() => {
        const getStatus = async () => {
            const c = await getVoteStatus();
            setVote(c.vote);
        };
        getStatus();
    }, [isLoaded, voted]);

    return (
        <div className="container mt-3">
            {voted}
            <ListGroup>
                <ListGroup.Item>User: {account}</ListGroup.Item>
                <ListGroup.Item>Voted: {voted ? "Yes" : "No"} </ListGroup.Item>
                <ListGroup.Item>Voted For: {vote} </ListGroup.Item>
            </ListGroup>
        </div>
    );
}
