/* eslint-disable no-mixed-spaces-and-tabs */
import { Routes, Route } from "react-router-dom";
// import INITIAL_VALUE from "./DataRouteConfig";
// import ModerateRoute from "./Routes/ModerateRoutes";
// import PrivateRoute from "./Routes/PrivateRoutes";
// import PublicRoute from "./Routes/PublicRoutes";
import ROUTES from "./Routes";
import { PATH } from "../../config";
import WEB_PAGES from "../pages";
import { useLazyPermissionsQuery } from "../redux/slices/auth";
import { useSelector } from "react-redux";
import FullScreenLoader from "../components/FullScreenLoader";
import { useEffect, useState } from "react";

function RouterConfig() {
	const { user } = useSelector((state) => state.auth);
	const roleId = user?.activeRole?.roleId;
	const [
		getPermissions,
		{ data: permissions = {}, isLoading, isFetching, isSuccess },
	] = useLazyPermissionsQuery();
	const [routesArray, setRoutesArray] = useState([]);
	// console.log("routesArray", routesArray);

	const calculatingRoutes = () => {
		const routes = [];
		ROUTES.forEach((item) => {
			const superAdminPermission = user?.isSuperAdmin === item?.isSuperAdmin;
			const hasPermission = item?.permissionKey
				? item?.permissionKey?.subKey
					? permissions?.[item?.permissionKey?.mainKey]?.[
							item?.permissionKey?.subKey
					  ]
					: permissions?.[item?.permissionKey?.mainKey]
				: item?.isSuperAdmin !== undefined
				? superAdminPermission
				: true;
			routes.push({
				...item,
				hasPermission,
			});
		});
		setRoutesArray(routes);
	};

	useEffect(() => {
		if (roleId) {
			getPermissions(roleId);
		} else {
			calculatingRoutes();
		}
	}, [getPermissions, roleId]);

	useEffect(() => {
		if (isSuccess) {
			calculatingRoutes();
		}
	}, [isSuccess]);

	if (
		isLoading ||
		isFetching ||
		(roleId && permissions === undefined) ||
		routesArray.length === 0
	)
		return <FullScreenLoader />;

	return (
		<Routes key={`routes`}>
			{routesArray?.map((item) => {
				const RouteType = item.routeType;
				// const hasPermission = item?.permissionKey
				//   ? item?.permissionKey?.subKey
				//     ? permissions?.[item?.permissionKey?.mainKey]?.[
				//         item?.permissionKey?.subKey
				//       ]
				//     : permissions?.[item?.permissionKey?.mainKey]
				//   : true;
				return item.hasPermission ? (
					<Route
						key={item.path}
						path={item.path}
						element={<RouteType element={item.page} />}
					/>
				) : (
					<Route path={item.path} element={<WEB_PAGES.UNAUTHORIZED />} />
				);
			})}
			{/* NO PAGE FOUND */}
			<Route path={PATH.NOPAGE} element={<WEB_PAGES.NOPAGE />} />
		</Routes>
	);
}

export default RouterConfig;
