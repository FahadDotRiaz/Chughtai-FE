import { configureStore } from "@reduxjs/toolkit";
import { rtkQApi } from "./rtkQApi";
import authReducer from "./features/authSlice";

const store = configureStore({
	reducer: {
		[rtkQApi.reducerPath]: rtkQApi.reducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(rtkQApi.middleware),
});

export default store;
