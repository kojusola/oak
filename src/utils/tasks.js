import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, scheduleTasks } from "../store/taskSlice";
import { Observer, Scheduler, oakConstants } from "oak-js-library";
const { ApiPromise, WsProvider } = require("@polkadot/api");
import { toast } from "react-toastify";
const uuid = require("uuid");

export default function useTask() {
  const { allTasks } = useSelector((state) => state.task);
  const { address } = useSelector((state) => state.connect);
  const dispatch = useDispatch();

  // connecting to the extension
  async function getAllTask() {
    await dispatch(getTasks({ address }));
    console.log("alltask state:", allTasks);
  }

  async function scheduleTask(message, timeSlot) {
    const polkadot = await import("@polkadot/extension-dapp");

    const injector = await polkadot.web3FromAddress(address);

    const scheduler = new Scheduler(oakConstants.OakChains.TUR);

    const recurrer = new Recurrer();

    const recurrences = 1;

    const timestamps = recurrer.getHourlyRecurringTimestamps(
      new Date(timeSlot),
      recurrences
    );
    console.log("timesatamps", timestamps);

    // Recommended to save this providedID to retreive task in the future
    const providedID = uuid.v4();

    const hex = await scheduler.buildScheduleNotifyExtrinsic(
      address,
      providedID,
      timestamps,
      message,
      injector.signer
    );
    return hex;
  }

  async function transferTask(message, timeSlot) {
    const polkadot = await import("@polkadot/extension-dapp");

    const injector = await polkadot.web3FromAddress(address);

    const scheduler = new Scheduler(oakConstants.OakChains.TUR);

    const recurrer = new Recurrer();

    const recurrences = 1;

    const timestamps = recurrer.getHourlyRecurringTimestamps(
      new Date(timeSlot),
      recurrences
    );
    console.log("timesatamps", timestamps);

    // Recommended to save this providedID to retreive task in the future
    const providedID = uuid.v4();

    const hex = await scheduler.buildScheduleNotifyExtrinsic(
      address,
      providedID,
      timestamps,
      message,
      injector.signer
    );
    return hex;
  }

  async function createAutomationTask(message, timeSlot, amount) {
    const hex = await scheduleTask(message, timeSlot);
    await dispatch(scheduleTasks({ address, message, timeSlot, amount, hex }));
    console.log("state:", allTasks);
  }

  async function createTransferTask(message, timeSlot, amount) {
    const hex = await scheduleTask(message, timeSlot);
    await dispatch(scheduleTasks({ address, message, timeSlot, amount, hex }));
    console.log("state:", allTasks);
  }

  return {
    getAllTask,
    createAutomationTask,
  };
}
