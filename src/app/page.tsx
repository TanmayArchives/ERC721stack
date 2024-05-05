import { ConnectEmbed } from "@/app/thirdweb";
import { client } from "@/app/client";
import { chain } from "@/app/chain";
import { Staking } from "../../components/Staking";

export default function Home() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
          width: "100%",
          background: "black",
          color: "white",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        <h1> ERC-721 Staking App</h1>
      </div>
      <ConnectEmbed
        style={{
          marginTop: "5",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "25%",
          display: "flex",
          width: "50%",
          height: "50vh",
        }}
        client={client}
        chain={chain}
      />
      <Staking />
    </>
  );
}