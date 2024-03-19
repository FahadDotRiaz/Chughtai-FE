import {
	MaterialReactTable,
	useMaterialReactTable,
} from "material-react-table";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { convertUTCtoLocal } from "../utils/helper";

export default function GenericMuiTable({
	columns,
	data,
	updatePaginationFunc,
	isLoading,
	enablePagination,
	totalRecords,
	manualPagination,
	enableColumnFilters,
	simpleTable,
	manualFiltering,
	enableEditing,
	wrapperClassName,
	slimTable,
	rowSelection,
	maxHeight,
	rowClickFunc,
	rowClick,
	renderDetailPanel,
	enableExpanding,
	isExpandable,
	setSelectedRow,
	selectedRow,
	rowSelectionKey,
	columnVisibility,
	isModaltable,
	updateColumnFilters,
	dependentFilterToClear,
	enableGlobalFilter,
}) {
	const [call, setCall] = useState(true);
	const [tempRowSelection, setTempRowSelection] = useState([]);
	const [paginationValue, setPaginationValue] = useState({
		pageSize: 10,
		pageIndex: 0,
	});

	const [showColumnFilters, setShowColumnFilters] = useState(false);
	const [columnFilters, setColumnFilters] = useState([]);
	const [globalFilter, setGlobalFilter] = useState(null);

	useEffect(() => {
		if (manualPagination) updatePaginationFunc(paginationValue);
	}, [paginationValue]);

	// useEffect(() => {
	//   debugger;
	//   if (showColumnFilters) {
	//     debugger;
	//     setCall(false);
	//   }
	// }, [showColumnFilters]);

	let tempFilters = [];

	const checkDependedValues = (values) => {
		tempFilters = [...columnFilters];
		let isUpdate = false;
		const keys = Object.keys(dependentFilterToClear);
		keys.forEach((element) => {
			if (values[element] === undefined) {
				dependentFilterToClear[element].forEach((element2) => {
					if (values[element2] !== undefined) {
						tempFilters = tempFilters.filter((item) => item.id !== element2);
						isUpdate = true;
					}
				});
			}
		});
		return { updatedFilters: tempFilters, isUpdate };
	};
	useEffect(() => {
		if (call && manualFiltering) {
			const requestData = columnFilters?.reduce((result, item) => {
				result[item.id] = item.value;
				return result;
			}, {});
			if (columnFilters.length > 0 && dependentFilterToClear) {
				const result = checkDependedValues(requestData);
				if (result.isUpdate) {
					setColumnFilters(result?.updatedFilters);
					return;
				}
			}
			if (globalFilter) {
				requestData.search = globalFilter;
			}
			updateColumnFilters((prevState) => ({
				...prevState,
				filters: {
					...requestData,
				},
			}));
		} else {
			setCall(true);
		}
	}, [columnFilters]);

	useEffect(() => {
		if (manualFiltering && globalFilter !== null) {
			updateColumnFilters((prevState) => ({
				...prevState,
				filters: {
					...prevState.filters,
					search: globalFilter || "",
				},
			}));
		}
	}, [globalFilter]);

	function applyNumberFilterToColumns(columnsValue) {
		return columnsValue.map((column) => {
			const defaultOnInput = (e) => {
				e.persist();
				if (e.target.value.charAt(0) === " ") {
					e.target.value = e.target.value.trimStart();
				}
			};
			if (column.filterVariant === "date") {
				return {
					...column,
					muiFilterDatePickerProps: {
						slotProps: {
							textField: { readOnly: false },
							// actionBar: { actions: ["clear"] },
						},
						value:
							column?.filterValue && convertUTCtoLocal(column?.filterValue), // Convert the UTC date to local time
						onChange: (date) => {
							const localDate = convertUTCtoLocal(date);
							setColumnFilters([
								...columnFilters,
								{ id: column.accessorKey, value: !date ? date : localDate },
							]);
						},
					},
				};
			}
			if (column.muiFilterTextFieldProps) {
				if (column.muiFilterTextFieldProps.type === "number") {
					return {
						...column,
						muiFilterTextFieldProps: {
							type: "number",
							onInput: (e) => {
								e.persist();
								const currentValue = e.target.value;

								if (currentValue.startsWith("e")) {
									if (currentValue === "e" || /\de/.test(currentValue)) {
										e.target.value = 0;
									}
								} else {
									e.target.value = currentValue.replace(/[^0-9]/g, "");
								}
							},
							onKeyDown: (evt) => {
								if (evt.key === "e") {
									evt.preventDefault();
								}
							},
						},
					};
				}
			} else {
				return {
					...column,
					muiFilterTextFieldProps: {
						type: "text",
						onInput: defaultOnInput,
					},
				};
			}
			return column;
		});
	}
	const filteredColumns = applyNumberFilterToColumns(columns);

	const table = useMaterialReactTable({
		columns: filteredColumns,
		data,
		enableExpandAll: true, //hide expand all double arrow in column header
		enableExpanding: enableExpanding ? enableExpanding : false,
		manualPagination: manualPagination,
		rowCount: manualPagination ? totalRecords : null,
		enableHiding: false,
		enableGlobalFilter: false,
		onColumnFiltersChange: setColumnFilters,
		onShowColumnFiltersChange: setShowColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		...(manualPagination && {
			onPaginationChange: setPaginationValue,
		}),
		state: {
			globalFilter,
			columnVisibility: columnVisibility,
			showColumnFilters,
			columnFilters,
			...(manualPagination && { pagination: paginationValue }),
			...(rowSelection && { rowSelection: selectedRow || tempRowSelection }),
			isLoading,
			// showSkeletons: true,
			columnPinning: { right: ["actions"] },
		},
		muiPaginationProps: {
			showRowsPerPage: false,
		},
		// paginationDisplayMode: "pages",
		enablePagination,
		enableDensityToggle: false,
		enableFullScreenToggle: false,
		enableSorting: false,
		enableColumnFilters,
		editDisplayMode: "cell",
		enableEditing,
		manualFiltering: manualFiltering,
		enableTopToolbar: !simpleTable,
		enableBottomToolbar: simpleTable === true ? false : enablePagination,
		enableColumnActions: false,
		// enableColumnPinning: true,
		initialState: {
			// columnPinning: { right: ["actions"] },
			showColumnFilters: false,
		},
		enableRowSelection: rowSelection,
		...(rowSelection && {
			onRowSelectionChange: setSelectedRow || setTempRowSelection,
		}),
		...(rowSelection &&
			rowSelectionKey && { getRowId: (row) => row[rowSelectionKey] }),
		// enableSelectAll: false,
		enableStickyHeader: true,
		muiTableContainerProps: { sx: { maxHeight: maxHeight } },
		...(rowClick && {
			muiTableBodyRowProps: ({ row }) => ({
				onClick: () => {
					rowClickFunc(row?.original);
				},
			}),
			sx: {
				cursor: "pointer", //you might want to change the cursor too when adding an onClick
			},
		}),
		renderDetailPanel: renderDetailPanel,
		positionExpandColumn: "last",
		icons: {
			ExpandMoreIcon: () => (
				<>
					<span className="">
						<FaPlus className="plus" />
					</span>
					<span className="minus">
						<FaMinus className="minus" />
					</span>
				</>
			),
		},
		filterFns: (a, b, c) => console.log("ZAIN", a, b, c),
	});

	return (
		<div
			className={`${wrapperClassName} generic-data-table ${
				slimTable ? "slim-table" : ""
			} ${isExpandable ? "sub-detail" : ""} ${
				simpleTable ? "pt-5 simple-table" : ""
			} ${isModaltable ? "modal-table" : ""} `}
		>
			<MaterialReactTable table={table} />
		</div>
	);
}

GenericMuiTable.propTypes = {
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	updatePaginationFunc: PropTypes.func,
	enablePagination: PropTypes.bool,
	isLoading: PropTypes.bool,
	totalRecords: PropTypes.number,
	manualPagination: PropTypes.bool,
	enableEditing: PropTypes.bool,
	enableColumnFilters: PropTypes.bool,
	simpleTable: PropTypes.bool,
	manualFiltering: PropTypes.bool,
	slimTable: PropTypes.bool,
	wrapperClassName: PropTypes.string,
	rowSelection: PropTypes.bool,
	maxHeight: PropTypes.string,
	rowClickFunc: PropTypes.func,
	renderDetailPanel: PropTypes.object,
	enableExpanding: PropTypes.bool,
	isExpandable: PropTypes.bool,
	rowClick: PropTypes.bool,
	setSelectedRow: PropTypes.func,
	selectedRow: PropTypes.object,
	rowSelectionKey: PropTypes.text,
	columnVisibility: PropTypes.object,
	isModaltable: PropTypes.bool,
	updateColumnFilters: PropTypes.func,
	dependentFilterToClear: PropTypes.object,
	enableGlobalFilter: PropTypes.bool,
};

GenericMuiTable.defaultProps = {
	updatePaginationFunc: () => {},
	enablePagination: true,
	isLoading: false,
	totalRecords: 0,
	manualPagination: false,
	enableEditing: false,
	enableColumnFilters: true,
	simpleTable: false,
	manualFiltering: false,
	slimTable: false,
	wrapperClassName: "",
	rowSelection: false,
	maxHeight: "100vh",
	rowClickProps: () => {},
	rowClick: false,
	columnVisibility: {},
	updateColumnFilters: undefined,
	enableColumnActions: false,
	dependentFilterToClear: undefined,
	enableGlobalFilter: true,
};
