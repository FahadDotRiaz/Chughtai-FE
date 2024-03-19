import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: JSON.parse(localStorage.getItem("user")) || null,
	permissions: null,
};

const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, user) => {
			state.user = user.payload;
		},
		setPermissions: (state, permissions) => {
			state.permissions = permissions.payload;
		},
	},
});

export const { setCredentials, setPermissions } = slice.actions;

export default slice.reducer;
