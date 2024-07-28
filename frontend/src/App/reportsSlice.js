
// // redux/reportsSlice.js
// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const reportsSlice = createSlice({
//   name: 'reports',
//   initialState: {
//     reports: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     fetchReportsStart(state) {
//       state.status = 'loading';
//     },
//     fetchReportsSuccess(state, action) {
//       state.status = 'succeeded';
//       state.reports = action.payload;
//     },
//     fetchReportsFailure(state, action) {
//       state.status = 'failed';
//       state.error = action.payload;
//     },
//   },
// });

// export const { fetchReportsStart, fetchReportsSuccess, fetchReportsFailure } = reportsSlice.actions;

// export const fetchReports = () => async (dispatch) => {
//   dispatch(fetchReportsStart());
//   try {
//     const response = await axios.get('http://localhost:3000/reports');
//     dispatch(fetchReportsSuccess(response.data));
//   } catch (error) {
//     dispatch(fetchReportsFailure(error.message));
//   }
// };

// export default reportsSlice.reducer;

// redux/reportsSlice.js
// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const reportsSlice = createSlice({
//   name: 'reports',
//   initialState: {
//     reports: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     fetchReportsStart(state) {
//       state.status = 'loading';
//     },
//     fetchReportsSuccess(state, action) {
//       state.status = 'succeeded';
//       state.reports = action.payload;
//     },
//     fetchReportsFailure(state, action) {
//       state.status = 'failed';
//       state.error = action.payload;
//     },
//     filterReportsBySender(state, action) {
//       state.reports = state.reports.filter(report => report.senderId === action.payload);
//     },
//     filterReportsByEmployee(state, action) {
//       state.reports = state.reports.filter(report => report.employeeId === action.payload);
//     },
//   },
// });

// export const {
//   fetchReportsStart,
//   fetchReportsSuccess,
//   fetchReportsFailure,
//   filterReportsBySender,
//   filterReportsByEmployee,
// } = reportsSlice.actions;

// export const fetchReports = (token) => async (dispatch) => {
//   dispatch(fetchReportsStart());
//   try {
//     const response = await axios.get('http://localhost:3000/reports/allreports', {
//       headers: {
//         'x-auth-token': token,
//       },
//     });
//     dispatch(fetchReportsSuccess(response.data));
//   } catch (error) {
//     dispatch(fetchReportsFailure(error.message));
//   }
// };

// export default reportsSlice.reducer;
