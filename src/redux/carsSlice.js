import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addAll:(state,action)=>{
        state.value=action.payload;
        console.log(state.value);

    },
    add: (state,action) => {
        state.value.push(action.payload);
    },
    remove: (state, action) => {
      state.value = state.value.filter(item=>item.id !== action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { addAll,add, remove} = carsSlice.actions

export default carsSlice.reducer;