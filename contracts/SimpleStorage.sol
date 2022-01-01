// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract VotingSystem {
    address public owner;
    mapping(address => Voter) voters;
    Candidate[] candidates;
    uint256 countOfCandidates;

    struct Voter {
        uint256 weight;
        bool voted;
        uint256 vote;
    }

    struct Candidate {
        string name;
        uint256 voteCount;
    }

    constructor() public {
        owner = msg.sender;
    }

    modifier didNotVoteYet(){
        require(!voters[msg.sender].voted, "User has already voted.");
        _;
    }

    modifier isOwner(){
      require(msg.sender == owner, "The sender is not the owner.");
      _;
    }

    function addCandidate(string memory _name) public isOwner {
        candidates.push(Candidate({name: _name, voteCount: 0}));
        countOfCandidates++;
    }

    function voteForCandidateAt(uint256 _index) public didNotVoteYet {
        candidates[_index].voteCount++;
        voters[msg.sender].voted = true;
    }

    function getCandidateAt(uint256 _index) public view returns (Candidate memory){
        return candidates[_index];
    }
}