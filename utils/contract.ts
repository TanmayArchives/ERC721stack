import { client } from "@/app/client";
import { chain } from "@/app/chain";
import { getContract } from "thirdweb";

const nftContractAddress = "0x3b3c9F57De3E055AC5bbc40c848cfafAb9B6051B";
const rewardTokencontract = "0x70b22877675A6C253CaDdA50f506D21ccEEd74C0";
const stakingContractAddress = "0x9DE0C719566E9872F33ACd3A7Ea47A80BA70837A";

export  const NFT_CONTRACT = getContract({
    address: nftContractAddress,
    chain : chain ,
    client : client
    })

export const REWARD_TOKEN = getContract({
    address: rewardTokencontract,
    chain : chain ,
    client : client
    })

export const STAKING_CONTRACT = getContract({
    address: stakingContractAddress,
    chain : chain ,
    client : client
    })
    