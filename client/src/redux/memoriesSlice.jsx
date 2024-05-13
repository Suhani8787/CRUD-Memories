import { createSlice } from "@reduxjs/toolkit";

const memoriesSlice = createSlice({
  name: "memories",
  initialState: {
    memories: []
  },
  reducers: {
    getMemories: (state, action) => {
      state.memories = action.payload.map(memory => {
        return {
          id: memory._id,
          memory: memory.memory,
          description: memory.description,
          date: memory.date
        }
      })
    },
    addMemory: (state, action) => {
      state.memories.push(action.payload)
    },
    updateMemory: (state, action) => {
      const index = state.memories.findIndex(x => x.id === action.payload.id)
      state.memories[index] = {
        id: action.payload.id,
        memory: action.payload.memory,
        description: action.payload.description,
        date: action.payload.date
      }
    },
    deleteMemory: (state, action) => {
      const id = action.payload.id;
      state.memories = state.memories.filter(memory => memory.id !== id)
    }
  }
});

export const { getMemories, addMemory, updateMemory, deleteMemory } = memoriesSlice.actions;
export default memoriesSlice.reducer;