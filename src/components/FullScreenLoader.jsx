// import PulseLoader from "react-spinners/PulseLoader";
import PropTypes from "prop-types";
import { Spin } from "antd";

export default function FullScreenLoader({ forRequest }) {
	return (
		<div className={`loaderDiv ${forRequest && "for-request"}`}>
			<div className="spinner">
				{/* <PulseLoader
          color="#1a2065"
          loading="true"
          // cssOverride={override}
          size={15}
        /> */}
				<Spin />
			</div>
		</div>
	);
}

FullScreenLoader.propTypes = {
	forRequest: PropTypes.node,
};

FullScreenLoader.defaultProps = {
	forRequest: false,
};
