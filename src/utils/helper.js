import dayjs from "dayjs";

export const getUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};
export const getActiveRole = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	if (user) {
		return user?.activeRole;
	} else {
		return null;
	}
};

export const getUserRole = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	if (user) {
		return user?.role;
	} else {
		return null;
	}
};

export const getFormattedDate = (date, format) => {
	if (format) {
		return dayjs(date).format(format);
	}
	const formattedDate = new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	return formattedDate;
};

export const getFormattedDateTime = (date, format) => {
	if (format) {
		return dayjs(date).format(format);
	}
	const formattedDate = new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	});
	return formattedDate;
};

export function providesList(resultsWithIds, tagType) {
	return resultsWithIds
		? [
				{ type: tagType, id: "LIST" },
				...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
		  ]
		: [{ type: tagType, id: "LIST" }];
}

export function convertUTCtoLocal(utcDate) {
	return dayjs(utcDate).format("YYYY-MM-DD");
}
