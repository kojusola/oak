import { useState } from "react";
import dynamic from "next/dynamic";
const { ApiPromise, WsProvider } = require("@polkadot/api");

export default function useConnect() {
  const wsProvider = new WsProvider(
    "wss://rpc.turing-staging.oak.tech/public-ws"
  );
  const api = ApiPromise.create({ provider: wsProvider });
  async function connect() {
    const polkadot = await import("@polkadot/extension-dapp");
    const extensions = await polkadot.web3Enable("Oak Automation dApp");
    console.log("extensions", extensions);
    if (extensions.length === 0) {
      console.log("extensions", extensions);
      return;
    }
    const allAccounts = polkadot.web3Accounts();
    console.log(allAccounts);
    const api = await ApiPromise.create();
    let {
      data: { free: previousFree },
      nonce: previousNonce,
    } = await api.query.system.account(allAccounts);
    console.log(
      `${allAccounts} has a balance of ${previousFree}, nonce ${previousNonce}`
    );
    console.log(
      `You may leave this example running and start example 06 or transfer any value to ${allAccounts}`
    );
    api.query.system.account(
      allAccounts,
      ({ data: { free: currentFree }, nonce: currentNonce }) => {
        const change = currentFree.sub(previousFree);
        if (!change.isZero()) {
          console.log(`New balance change of ${change}, nonce ${currentNonce}`);
          previousFree = currentFree;
          previousNonce = currentNonce;
        }
      }
    );
  }

  return {
    connect,
  };
}
