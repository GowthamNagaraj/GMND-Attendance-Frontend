import { configureStore } from '@reduxjs/toolkit';
import attendanceReducer from './slices/attendanceSlice';

const store = configureStore({
    reducer:{
        attendanceDates: attendanceReducer,
    }
})

export default store;