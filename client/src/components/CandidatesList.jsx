import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useWeb3 } from "../web3/Web3Context";
import { ListGroup } from "react-bootstrap";

const styles = {
    width: "500px",
};

export const CandidatesList = () => {
    const { getCandidates, isLoaded, voteForCandidate, voted } = useWeb3();
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const loadCandidates = async () => {
            const c = await getCandidates();
            setCandidates(c);
        };
        loadCandidates();
    }, [isLoaded]);

    return (
        <div className="mt-3" style={styles}>
            <ListGroup>
                {candidates.map((candidate, index) => (
                    <ListGroup.Item
                        key={index}
                        className="d-flex justify-content-between"
                    >
                        {candidate.name}
                        <Button
                            disabled={voted}
                            variant="primary"
                            size="sm"
                            onClick={() => {
                                voteForCandidate(index);
                            }}
                        >
                            Vote for {candidate.name}
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};
