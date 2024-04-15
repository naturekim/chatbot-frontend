import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: [
    {
      isReply: true,
      content: "안녕하세요, 무엇을 도와드릴까요?",
    },
  ],
  reducers: {
    addMessage: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
