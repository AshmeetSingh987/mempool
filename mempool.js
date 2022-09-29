const { ethers }=require("ethers");
const provider=new ethers.providers.WebSocketProvider("wss://mainnet.infura.io/ws/v3/2a074dc4b72449d99e8c66a60fa9bc75");
const express=require('express');
const axios=require('axios');

const touniv3="0xE592427A0AEce92De3Edee1F18E0157C05861564"
//address for swap router 
async function mempooltransaction() {
    provider.on("pending", async (tx) => {
        const txInfo=await provider.getTransaction(tx);
        try {
            if (txInfo.to==touniv3) {
                if (txInfo.value>0) {
                    await axios.post("https://hooks.slack.com/services/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", { text: `Trasaction from :${txInfo.from} , transaction to: ${txInfo.to} , Transaction value:${txInfo.value}` });
                    console.log(txInfo);

                }
                // console.lof("sent");
            }


        } catch {
            console.log("Not a Uniswap transaction");
        }
    })
}
mempooltransaction(); 
