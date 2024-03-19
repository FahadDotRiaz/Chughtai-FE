/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

import { PATH } from "../../../config";
import { useNavigate } from "react-router-dom";
import GenericMuiTable from "../../components/GenericMuiTable";
import ActionDropdown from "../../components/ActionDropdown";
import CardButtonFilterGroup from "../../components/CardButtonFilterGroup";
import {
	useDeleteVendorMutation,
	useLazyGetVendorsListQuery,
} from "../../redux/slices/vendors";
import AppConfirmDialog from "../../components/AppConfirmDialog";
import useNotification from "../../components/Notification";
import { VENDOR_TYPE } from "../../utils/constant";
import useDebounce from "../../hooks/useDebounce";
import LOOKUPS from "../../utils/lookups";
import {
	useGetCountriesQuery,
	useLazyGetCitiesByProvinceQuery,
	useLazyGetProvincesQuery,
} from "../../redux/slices/location";

const Index = () => {
	const { openNotification, contextHolder } = useNotification();
	const [showDialog, setShowDialog] = useState(false);
	const [idToDelete, setIdToDelete] = useState(null);
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			pageSize: 10,
			pageIndex: 0,
		},
	});
	const [getVendorList, { data: vendorsList, isLoading, isFetching }] =
		useLazyGetVendorsListQuery();
	const [deleteVendor] = useDeleteVendorMutation();
	const { data: countries } = useGetCountriesQuery();
	const [getProvincesByCountry, { data: provinces = [] }] =
		useLazyGetProvincesQuery();
	const [getCityByProvince, { data: cities }] =
		useLazyGetCitiesByProvinceQuery();

	const debouncedTableOptions = useDebounce(tableOptions, 1000, [
		"vendorCode",
		"search",
		"name",
		"address",
		"email",
		"mobile",
	]);

	useEffect(() => {
		if (debouncedTableOptions) {
			getVendorList({ tableOptions: debouncedTableOptions });
		}
	}, [debouncedTableOptions, getVendorList]);

	useEffect(() => {
		if (tableOptions?.filters?.country) {
			getProvincesByCountry({ id: tableOptions?.filters?.country });
		}
		if (tableOptions?.filters?.province) {
			getCityByProvince({ id: tableOptions?.filters?.province });
		}
	}, [
		getCityByProvince,
		getProvincesByCountry,
		tableOptions?.filters?.country,
		tableOptions?.filters?.province,
	]);

	const navigate = useNavigate();

	const handleOpenModal = (id) => {
		setIdToDelete(id);
		setShowDialog(true);
	};

	const handleDelete = async (id) => {
		const { error } = await deleteVendor(id);
		if (!error) {
			openNotification("success", "Vendor deleted successfully");
		} else {
			openNotification("error", "Error deleting request");
		}
	};

	const handleOk = () => {
		if (idToDelete) {
			handleDelete(idToDelete);
			setShowDialog(false);
		}
	};

	const columns = [
		{
			header: "vendor Code",
			accessorKey: "vendorCode",
		},
		{
			header: "Vendor Name",
			accessorKey: "name",
		},
		{
			header: "Vendor Type",
			accessorKey: "vendorType",
			Cell: ({ cell }) => (
				<span>
					{cell?.getValue() === VENDOR_TYPE.STORE ? "Goods" : "Service"}
				</span>
			),
			id: "type",
			filterSelectOptions: LOOKUPS?.VENDOR_TYPE,
			filterVariant: "select",
		},
		{
			header: "Email",
			accessorKey: "email",
		},
		{
			header: "Mobile",
			accessorKey: "mobile",
		},
		{
			header: "Country",
			accessorKey: "country.name",
			filterSelectOptions: countries?.map((country) => {
				return {
					label: country?.name,
					value: country?.id,
				};
			}),
			filterVariant: "select",
			id: "country",
		},
		{
			header: "Province",
			accessorKey: "province.name",
			filterSelectOptions:
				tableOptions?.filters?.country &&
				provinces?.map((dep) => {
					return {
						label: dep.name,
						value: dep.id,
					};
				}),
			filterVariant: "select",
			id: "province",
		},
		{
			header: "City",
			accessorKey: "city.name",
			filterSelectOptions:
				tableOptions?.filters?.country &&
				tableOptions?.filters?.province &&
				cities?.map((dep) => {
					return {
						label: dep.name,
						value: dep.id,
					};
				}),
			filterVariant: "select",
			id: "city",
		},
		{
			header: "Address",
			accessorKey: "address",
			size: 200,
		},
		{
			header: "Action",
			accessorKey: "id",
			enableColumnFilter: false,
			align: "center",
			size: 20,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			Cell: ({ cell }) => (
				<ActionDropdown
					viewOnClick={() =>
						navigate(PATH.VENDOR_VIEW.replace(":id", cell?.getValue()))
					}
					editOnClick={() =>
						navigate(PATH.VENDOR_UPDATE.replace(":id", cell?.getValue()))
					}
					deleteOnClick={() => handleOpenModal(cell?.getValue())}
				/>
			),
		},
	];

	return (
		<div>
			{contextHolder}
			<CardButtonFilterGroup
				title={{ text: "Vendors", level: 1 }}
				button={{
					label: "Create Vendor",
					icon: <PlusOutlined />,
					onClick: () => navigate(PATH.VENDOR_CREATE),
				}}
			>
				<GenericMuiTable
					columns={columns}
					data={vendorsList?.list || []}
					isLoading={isLoading || isFetching}
					manualPagination={true}
					totalRecords={vendorsList?.totalRows}
					updatePaginationFunc={(data) =>
						setTableOptions({ ...tableOptions, pagination: data })
					}
					updateColumnFilters={setTableOptions}
					manualFiltering={true}
					dependentFilterToClear={{
						country: ["province", "city"],
						province: ["city"],
					}}
					enableGlobalFilter={false}
				/>
			</CardButtonFilterGroup>
			<AppConfirmDialog
				showModal={showDialog}
				description="Are you sure you want to delete this Vendor?"
				handleCancel={() => setShowDialog(false)}
				handleOk={handleOk}
			/>
		</div>
	);
};

export default Index;
