import PropTypes from "prop-types";
// import { LoaderPageWithoutBG } from "../../assets";

function PublicRoute({ element }) {
  //   const jwtToken = JSON.parse(localStorage.getItem("project_name_user"));
  //   if (jwtToken) {
  //     window.location.href = "/dashboard";
  //     return null; // Return null here to prevent rendering anything in this case
  //   }
  return (
    <>
      {/* {jwtToken ? <LoaderPageWithoutBG /> : null} */}
      {element}
    </>
  );
}

PublicRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default PublicRoute;
