"use client";

import { chain } from "@/app/chain";
import { client } from "@/app/client";
import {
  ConnectButton,
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import {
  claimTo,
  getNFTs,
  getOwnedNFTs,
  ownerOf,
  totalSupply,
} from "thirdweb/extensions/erc721";
import { NFT_CONTRACT, STAKING_CONTRACT } from "../utils/contract";
import { NFT } from "thirdweb";
import { useEffect, useState } from "react";
import { NFTcard } from "./NFTcard";

export const Staking = () => {
  const account = useActiveAccount();
  const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);

  const getOwnedNFTs = async () => {
    let ownedNFTs: NFT[] = [];
    const totalNFTSupply = await totalSupply({ contract: NFT_CONTRACT });
    const nfts = await getNFTs({
      contract: NFT_CONTRACT,
      start: 0,
      count: parseFloat(totalNFTSupply.toString()),
    });

    for (let nft of nfts) {
      const owner = await ownerOf({ contract: NFT_CONTRACT, tokenId: nft.id });
      if (owner === account?.address) {
        ownedNFTs.push(nft);
      }
    }
    setOwnedNFTs(ownedNFTs);
  };

  useEffect(() => {
    if (account) {
      getOwnedNFTs();
    }
  }, [account]);

  const { data: stakedInfo, refetch: refetchStakedInfo } = useReadContract({
    contract: STAKING_CONTRACT,
    method: "getStakeInfo",
    params: [account?.address || ""],
  });

  if (!account) {
    return <div>Please connect your wallet to access the Staking App.</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        marginLeft: "25%",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#151515",
        borderRadius: "8px",
        width: "500px",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "white" }}> Staking App</h1>
      <ConnectButton client={client} chain={chain} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          width: "100%",
        }}
      >
        <h2 style={{ marginRight: "20px" }}> Claim NFT to Stake </h2>
        <TransactionButton

            disabled={ownedNFTs.length === 0}

                
          transaction={() =>
          
            claimTo({
              contract: NFT_CONTRACT,
              to: account?.address,
              quantity: BigInt(1),
            })
          }
          onTransactionConfirmed={() => {
            alert("NFT Claimed");
          }}
          style={{
            fontSize: "16px",
            borderRadius: "8px",
            padding: "10px 20px",
            marginTop: "30px",
            marginBottom: "20px",
          }}
        >
          NFT Claim
        </TransactionButton>
      </div>
      <hr style={{ width: "100%", border: "1px solid #333" }} />
      <div
        style={{
          margin: "20px 0px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2> your Owned NFTs</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "500px",
          }}
        >
          {ownedNFTs && ownedNFTs.length > 0 ? (
            ownedNFTs.map((nft) => (
              <NFTcard
                key={nft.id}
                nft={nft}
                refetchOwnedNFTs={getOwnedNFTs}
                refetchStakedNFTs={refetchStakedInfo}
              />
            ))
          ) : (
            <p>You own 0 NFTs</p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "500%",
            flexWrap: "wrap",
          }}
        ></div>
      </div>
    </div>
  );
};