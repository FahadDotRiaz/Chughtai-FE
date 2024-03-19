import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = "asd";
  let isUser = false;
  let isAdmin = false;
  //   let status = 'Employee';

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;

    isUser = roles.includes("User");
    isAdmin = roles.includes("Admin");

    return { username, roles, isUser, isAdmin };
  }

  return { username: "", roles: [], isUser, isAdmin };
};
export default useAuth;
