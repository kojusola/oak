import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect, disConnect, setAddress } from "../store/connectSlice";
const { ApiPromise, WsProvider } = require("@polkadot/api");
import { toast } from "react-toastify";

export default function useConnect() {
  const { connected, address } = useSelector((state) => state.connect);
  const dispatch = useDispatch();

  const wsProvider = new WsProvider(
    "wss://rpc.turing-staging.oak.tech/public-ws"
  );

  const api = ApiPromise.create({ provider: wsProvider });

  // connecting to the extension
  async function connect() {
    const polkadot = await import("@polkadot/extension-dapp");
    const extensions = await polkadot.web3Enable("Oak Automation dApp");
    console.log("extensions", extensions);
    if (
      extensions &&
      extensions.length === 0 &&
      extensions[0].name !== "polkadot-js"
    ) {
      toast.error("Please enable the Polkadot extension");
      return;
    } else {
      //   dispatch(connect());
      toast.success("Connected to the Polkadot extension");
    }

    const allAccounts = await polkadot.web3Accounts();
    if (allAccounts.length === 0) {
      toast.error("Please add an account to your browser");
      return;
    } else {
      const address = allAccounts[0].address;
      //   dispatch(setAddress(allAccounts[0].address));
    }
    const api = await ApiPromise.create();

    console.log(connected, address);
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
