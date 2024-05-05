import { useState } from "react";
import { MediaRenderer, TransactionButton } from "thirdweb/react";
import { client } from "@/app/client";
import { NFT, prepareContractCall } from "thirdweb";
import { approve } from "thirdweb/extensions/erc20";
import { NFT_CONTRACT, STAKING_CONTRACT } from "../utils/contract";
import { setApprovalForAll } from "thirdweb/extensions/erc721";

type OwnedNFTsProps = { 
    nft: NFT;
    refetchOwnedNFTs: () => void;
    refetchStakedNFTs: () => void;
};

export const NFTcard = ({ nft, refetchOwnedNFTs, refetchStakedNFTs }: OwnedNFTsProps) => { 
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [ isAPPROVED, setIsAPPROVED ] = useState(false);

    const handleCloseModal = () => {
        setIsModelOpen(false);
    };

    function stake(arg0: unknown) {
        throw new Error("Function not implemented.");
    }

    return ( 
        <div style={{ margin: "10px" }}> 
       
            <MediaRenderer
                client={client}
                src={nft.metadata.image} 
                style={{ width: "200px", height: "200px", marginBottom: "10px", borderRadius: "8px" }}
            />
            
            <p>{nft.metadata.name}</p>

            <button onClick={() => setIsModelOpen(true)} style={{ 
                border: "none",
                background: "black",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                width: "100%"
            }}>
                Stake
            </button>

            {isModelOpen && (
                <div style={{ 
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{ 
                        minWidth: "300px",
                        background: "white",
                        padding: "20px",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>

                        <button style={{ 
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            padding: "10px",
                            borderRadius: "8px",
                            border: "none",
                            background: "black",
                            color: "white",
                            cursor: "pointer",
                            marginTop: "10px"
                        }} onClick={handleCloseModal}>
                            Close
                        </button>
                 
                        <h2 style={{ margin: "10px 0 " , color:"red" }}>YOU ARE ABOUT TO STAKE :</h2>
                        
                        <MediaRenderer
                            client={client}
                            src={nft.metadata.image}
                            style={{ width: "200px", height: "200px", marginBottom: "10px", borderRadius: "8px" }}
                        />
                       {! isAPPROVED ? (
                         <TransactionButton
                                transaction={() => ( 
                                      setApprovalForAll({
                                     contract: NFT_CONTRACT,
      operator: STAKING_CONTRACT.address,
      approved: true,
    })
                                )}
                                style={{
                                    width: "100%"
                                }}
                                onTransactionConfirmed={() => setIsAPPROVED(true)}
                            >Approve</TransactionButton>
                       
                       ) : (
                      <TransactionButton
                                transaction={() => (
                                    prepareContractCall({
                                        contract: STAKING_CONTRACT,
                                        method: "function stake(uint256 tokenId)",
                                        params: [nft.id]
                                    })
                                )}
                                onTransactionConfirmed={() => {
                                    alert("Staked!");
                                    handleCloseModal();
                                    refetchOwnedNFTs();
                                    refetchStakedNFTs();

                                }}
                                style={{
                                    width: "100%"
                                }}
                            >Stake</TransactionButton>

                       ) }
                    </div>
                </div>
            )}
        </div>
    );
};
