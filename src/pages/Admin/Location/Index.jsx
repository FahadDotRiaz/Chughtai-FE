/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { PATH } from "../../../../config";
import ActionDropdown from "../../../components/ActionDropdown";
import GenericMuiTable from "../../../components/GenericMuiTable";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import {
	useDeleteLocationMutation,
	useGetProvincesQuery,
	useLazyGetAreasByCityQuery,
	useLazyGetCitiesByProvinceQuery,
	useLazyGetLocationListQuery,
} from "../../../redux/slices/location";
import useNotification from "../../../components/Notification";
import PropTypes from "prop-types";
import useDebounce from "../../../hooks/useDebounce";
import LOOKUPS from "../../../utils/lookups";

const Index = () => {
	const navigate = useNavigate();
	const [showDialog, setShowDialog] = useState({ show: false, id: null });
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			pageSize: 10,
			pageIndex: 0,
		},
	});
	const [getLocations, { data: locations, isLoading }] =
		useLazyGetLocationListQuery();
	const [deleteLocation, { isLoading: deleteLoading }] =
		useDeleteLocationMutation();
	const { data: provinces = [] } = useGetProvincesQuery({ id: null });
	const [getCityByProvince, { data: cities }] =
		useLazyGetCitiesByProvinceQuery();
	const [getAreaByCity, { data: areas }] = useLazyGetAreasByCityQuery();
	const { openNotification, contextHolder } = useNotification();
	const debouncedTableOptions = useDebounce(tableOptions, 1000, [
		"name",
		"search",
	]);

	useEffect(() => {
		getLocations({ tableOptions: debouncedTableOptions });
	}, [debouncedTableOptions]);

	useEffect(() => {
		if (tableOptions?.filters?.province) {
			getCityByProvince({ id: tableOptions?.filters?.province });
		}
		if (tableOptions?.filters?.city) {
			getAreaByCity({ id: tableOptions?.filters?.city });
		}
	}, [
		getAreaByCity,
		getCityByProvince,
		tableOptions?.filters?.city,
		tableOptions?.filters?.province,
	]);

	const columns = [
		{
			header: "Address",
			accessorKey: "address",
			size: 350,
			Cell: ({ cell }) => <div>{cell?.getValue() ?? "N/A"}</div>,
		},
		{
			header: "Type",
			accessorKey: "service",
			filterSelectOptions: LOOKUPS?.SERVICE_TYPE,
			filterVariant: "select",
		},
		{
			header: "Province",
			accessorKey: "province.name",
			id: "province",
			filterSelectOptions: provinces?.map((dep) => {
				return {
					label: dep.name,
					value: dep.id,
				};
			}),
			filterVariant: "select",
		},
		{
			header: "City",
			accessorKey: "city.name",
			id: "city",
			filterSelectOptions:
				tableOptions?.filters?.province &&
				cities?.map((dep) => {
					return {
						label: dep.name,
						value: dep.id,
					};
				}),
			filterVariant: "select",
		},
		{
			header: "Area",
			accessorKey: "area.name",
			id: "area",
			filterSelectOptions:
				tableOptions?.filters?.province &&
				tableOptions?.filters?.city &&
				areas?.map((dep) => {
					return {
						label: dep.name,
						value: dep.id,
					};
				}),
			filterVariant: "select",
		},
		{
			header: "Action",
			accessorKey: "actions",
			enableColumnFilter: false,
			align: "center",
			size: 20,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			Cell: ({ row }) => (
				<ActionDropdown
					editOnClick={() =>
						navigate(
							PATH.ADMIN_LOCATION_UPDATE.replace(":id", row?.original?.id)
						)
					}
					deleteOnClick={() =>
						setShowDialog({ show: true, id: row?.original?.id })
					}
				/>
			),
		},
	];

	const handleDelete = async () => {
		const { error } = await deleteLocation(showDialog?.id);
		if (!error) {
			openNotification("success", "Location deleted successfully");
		} else {
			openNotification("error", error?.message || "Error deleting location");
		}
		setShowDialog({ show: false, id: null });
	};

	return (
		<div>
			{contextHolder}
			<CardButtonFilterGroup
				title={{ text: "Location", level: 1 }}
				button={{
					label: "Create Location",
					icon: <PlusOutlined />,
					onClick: () => navigate(PATH.ADMIN_LOCATION_CREATE),
				}}
			>
				<GenericMuiTable
					columns={columns}
					data={locations?.list || []}
					isLoading={isLoading || deleteLoading}
					manualPagination={true}
					totalRecords={locations?.totalRows || 0}
					updatePaginationFunc={(data) =>
						setTableOptions({ ...tableOptions, pagination: data })
					}
					updateColumnFilters={setTableOptions}
					manualFiltering={true}
					dependentFilterToClear={{
						province: ["city", "area"],
						city: ["area"],
					}}
					enableGlobalFilter={false}
				/>
			</CardButtonFilterGroup>
			<AppConfirmDialog
				showModal={showDialog?.show}
				description="Are you sure you want to delete this location?"
				handleCancel={() => setShowDialog({ show: false, id: null })}
				handleOk={handleDelete}
			/>
		</div>
	);
};

export default Index;

Index.propTypes = {
	row: PropTypes.shape({
		original: PropTypes.shape({
			id: PropTypes.string,
		}),
	}),
};
