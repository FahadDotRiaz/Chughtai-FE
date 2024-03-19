/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { PATH } from "../../../config";
import { ParentComponentWithHeader } from "../../components/ParentComponentWithHeader";
import { useSelector } from "react-redux";

function PrivateRoute({ element }) {
	const user = useSelector((state) => state.auth);
	if (user) {
		return <ParentComponentWithHeader>{element}</ParentComponentWithHeader>;
	}
	return <Navigate to={PATH.SIGN_IN} replace />;
}

PrivateRoute.propTypes = {
	element: PropTypes.node.isRequired,
};

export default PrivateRoute;
