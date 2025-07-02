import { createSlice } from "@reduxjs/toolkit";

const attendanceSlice = createSlice({
    name: "attendanceDates",
    initialState:{
        dates: [],
        paw: [],
    },
    reducers:{
        setDates: (state, action)=>{
            state.dates = action.payload;
        },
        setPaw: (state, action)=>{
            state.paw = action.payload;
        },
        addDates: (state, action)=>{
            state.dates.push(action.payload);
        },
        addPaw: (state, action)=>{
            state.paw.push(action.payload);
        },
        updateDates: (state, action)=>{
            const { index, newDate } = action.payload;
            if (index >= 0 && index < state.dates.length) {
                state.dates[index] = newDate;
            }
        },
        updatePaw: (state, action)=>{
            const { index, newPaw } = action.payload;
            if (index >= 0 && index < state.paw.length) {
                state.paw[index] = newPaw;
            }
        },
    }
})

export const { setDates, setPaw, addDates, addPaw, updateDates, updatePaw } = attendanceSlice.actions;
export default attendanceSlice.reducer;
