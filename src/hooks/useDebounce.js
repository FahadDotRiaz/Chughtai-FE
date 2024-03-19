import { useState, useEffect } from "react";

function useDebounce(value, delay, debounceKeys) {
	// State and setter for debounced value
	const [debouncedValue, setDebouncedValue] = useState(value);
	let handler = null;
	useEffect(() => {
		// Set debouncedValue to value after the specified delay
		// if (value?.filters?.[debounceKeys] !== debouncedValue?.filters?.[debounceKeys]) {
		if (
			debounceKeys?.some(
				(key) => value?.filters?.[key] !== debouncedValue?.filters?.[key]
			)
		) {
			clearTimeout(handler);
			handler = setTimeout(() => {
				setDebouncedValue(value);
			}, delay);

			// Cleanup function that clears the timeout
			return () => {
				clearTimeout(handler);
			};
		} else {
			// If shouldDebounce is false, set debouncedValue to value directly
			setDebouncedValue(value);
		}
	}, [value, delay]); // Re-call effect if value, delay, or shouldDebounce changes

	return debouncedValue;
}

export default useDebounce;
