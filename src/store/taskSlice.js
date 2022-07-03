import { createSlice } from "@reduxjs/toolkit";
import { ApiClient } from "./axiosClient";
import { formatSuccessResponse, formatErrorResponse } from "../utils/functions";

const limit = 10;

const initialState = {
  allTasks: null,
};

const apiCall = async (url, method, body, state) => {
  console.log(1);
  if (method === "GET") {
    try {
      console.log(state.allTasks);
      const response = await ApiClient.get(url);
      formatSuccessResponse(response);
      return (state.allTasks = response);
    } catch (error) {
      return formatErrorResponse(error);
    }
  } else {
    try {
      const response = await ApiClient.post(url, {
        ...body,
      });
      console.log(response);
      return formatSuccessResponse(response.data);
    } catch (error) {
      return formatErrorResponse(error);
    }
  }
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getTasks: (state, actions) => {
      console.log("actions", actions);
      const results = apiCall(
        `/task/get-tasks-for-address?address=5F455gZ12syJ1smg5bd7kS4A1DGEDFeH9jrikjRyu4yDxL88`,
        "GET",
        {},
        state
      );
      // state.allTasks = results;
    },
    scheduleTasks: (state, actions) => {
      console.log("actions", actions);
      apiCall(`/task/schedule-task`, "POST", actions.payload);
    },
  },
});

export const { getTasks, scheduleTasks } = taskSlice.actions;

export default taskSlice.reducer;
