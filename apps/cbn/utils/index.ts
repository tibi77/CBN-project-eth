// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { ethers } from "ethers";
import { Buffer } from "buffer";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
export const uploadFileToIPFS = async (file?: any) => {
    try {
        const blob = new Blob([JSON.stringify(file, null, 2)], {
            type: "application/json",
        });
        const fileFromBlob = new File([blob], `${file.title}_${file.date}.json`);
        const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_FILECOIN_API_KEY });
        const rootCid = await client.put([fileFromBlob]);
        console.log("Successfully sent to IPFS");
        console.log("https://" + rootCid + ".ipfs.w3s.link");

        await fetch(`/api`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                path: rootCid,
                file: `${file.title}_${file.date}.json`
            }),
        })


    } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
    }
};


export const encodeCIDtoBytes32 = (IPFSUploadToken: string) => {
    const cidHex = bs58.decode(IPFSUploadToken);
    // console.log(cidHex.slice(0, 4), cidHex.slice(4));
    const cid = ethers.hexlify(cidHex.slice(2));
    // console.log("CID::", cid)
    return cid;
};

export const decodeCIDfromBytes32 = (cid: string) => {
    const cidBytes = ethers.getBytes(cid);
    const newA = new Uint8Array(cidBytes.length + 2);
    newA.set([18, 32], 0);
    newA.set(cidBytes, 2);
    const revertedCid = bs58.encode(Buffer.from(newA));
    // console.log("RevertedCID::", revertedCid)
    return revertedCid;
};
