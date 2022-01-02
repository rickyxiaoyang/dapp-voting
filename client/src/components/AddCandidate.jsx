import React from "react";
import { Button, Form } from "react-bootstrap";
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
        <Form onSubmit={onAddCandidate} className="mt-3">
            <h2>Add Candidate</h2>
            <Form.Group className="d-flex flex-row text-align-center space-children">
                {/* <Form.Label htmlFor="name">Name</Form.Label> */}
                <Form.Control
                    style={{ width: "200px" }}
                    id="name"
                    type="text"
                    placeholder="Enter Candidate Name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <Button type="submit" variant="success">
                    Add Candidate
                </Button>
            </Form.Group>
        </Form>
    );
};
