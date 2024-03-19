/* eslint-disable no-debugger */
/* eslint-disable react/no-unescaped-entities */
import { Row, Col, Form, Input, Button, notification } from "antd";
import { PATH } from "../../../config";
import IMAGES from "../../assets/images";
import { setCredentials } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/slices/auth";
import { DEPARTMENT_TYPE } from "../../utils/constant";
import { getTokenFunc } from "../../../firebase";

const SignInPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const openNotification = (message) => {
    api.error({
      message: "Error",
      description: message,
      duration: 3,
    });
  };
  const onFinish = async (values) => {
    if (
      values.email?.toLowerCase() === "admin@chugtai.com" &&
      values.password === "12345"
    ) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Admin",
          role: "ADMIN",
        })
      );
      dispatch(setCredentials({ name: "Admin", role: "ADMIN" }));
      // navigate(PATH.USERSLIST);
      window.location.href = PATH.USERSLIST;
      return;
    } else if (
      values.email?.toLowerCase() === "procurement@chugtai.com" &&
      values.password === "12345"
    ) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Procurement",
          role: "PROCUREMENT",
        })
      );
      dispatch(setCredentials({ name: "Procurement", role: "PROCUREMENT" }));
      // navigate(PATH.DECLARATION_LIST);
      window.location.href = PATH.DECLARATION_LIST;

      return;
    } else {
      const token = await getTokenFunc();

      const finalData = {
        email: values.email,
        password: values.password,
        deviceToken: token,
      };
      const { data = null, error = null } = await login(finalData);
      if (!error) {
        const obj = {
          ...data,
          activeRole: data?.roles?.[0] || null,
        };
        localStorage.setItem("user", JSON.stringify(obj));
        dispatch(setCredentials(obj));
        // navigate(PATH.MIR_GENERATE_LIST);
        if (obj.isSuperAdmin) {
          window.location.href = PATH.ADMIN_USER_LIST;
        } else {
          if (obj.activeRole.departmentType === DEPARTMENT_TYPE.OTHERS)
            window.location.href = PATH.MIR_GENERATE_LIST;
          else window.location.href = PATH.MIR_ISSUE_LIST;
        }

        return;
      } else {
        openNotification(error?.message);
      }
    }

    // if (
    //   values.email?.toLowerCase() === "hod@chugtai.com" &&
    //   values.password === "12345"
    // ) {
    //   localStorage.setItem(
    //     "user",
    //     JSON.stringify({
    //       name: "HOD",
    //       role: "HOD",
    //     })
    //   );
    //   navigate(PATH.MIR_GENERATE_LIST);
    // } else if (
    //   values.email?.toLowerCase() === "store@chugtai.com" &&
    //   values.password === "12345"
    // ) {
    //   localStorage.setItem(
    //     "user",
    //     JSON.stringify({
    //       name: "Store",
    //       role: "STORE",
    //     })
    //   );
    //   dispatch(setCredentials({ name: "Store", role: "STORE" }));
    //   navigate(PATH.MIR_GENERATE_LIST);
    // } else if (
    //   values.email?.toLowerCase() === "shop@chugtai.com" &&
    //   values.password === "12345"
    // ) {
    //   localStorage.setItem(
    //     "user",
    //     JSON.stringify({
    //       name: "Shop",
    //       role: "SHOP",
    //     })
    //   );
    //   dispatch(setCredentials({ name: "Shop", role: "SHOP" }));
    //   navigate(PATH.MIR_GENERATE_LIST);
    // } else if (
    //   values.email?.toLowerCase() === "admin@chugtai.com" &&
    //   values.password === "12345"
    // ) {
    //   localStorage.setItem(
    //     "user",
    //     JSON.stringify({
    //       name: "Admin",
    //       role: "ADMIN",
    //     })
    //   );
    //   dispatch(setCredentials({ name: "Admin", role: "ADMIN" }));
    //   navigate(PATH.USERSLIST);
    // } else if (
    //   values.email?.toLowerCase() === "procurement@chugtai.com" &&
    //   values.password === "12345"
    // ) {
    //   localStorage.setItem(
    //     "user",
    //     JSON.stringify({
    //       name: "Procurement",
    //       role: "PROCUREMENT",
    //     })
    //   );
    //   dispatch(setCredentials({ name: "Procurement", role: "PROCUREMENT" }));
    //   navigate(PATH.DECLARATION_LIST);
    // } else if (
    //   values.email?.toLowerCase() === "collectioncenter@chugtai.com" &&
    //   values.password === "12345"
    // ) {
    //   localStorage.setItem(
    //     "user",
    //     JSON.stringify({
    //       name: "Collection_Center",
    //       role: "COLLECTIONCENTER",
    //     })
    //   );
    //   dispatch(
    //     setCredentials({ name: "Collection_Center", role: "COLLECTIONCENTER" })
    //   );
    //   navigate(PATH.MIR_GENERATE_LIST);
    // } else {
    //   openNotification();
    // }
    // navigate(PATH.MIR);
  };

  return (
    <>
      {contextHolder}
      <div className="sign-in-page">
        <Row style={{ height: "100%" }}>
          <Col span={12} className="left-col">
            {/* Left side - Background Image */}
          </Col>
          <Col span={12} className="right-col">
            <div className="relative flex flex-col justify-center h-full">
              {/* Right side - Login Form */}
              <div className="logo">
                <img src={IMAGES.LOGO2} />
              </div>

              <div className="h-full flex flex-col justify-center">
                <h1>Sign In</h1>
                <Form name="login-form" onFinish={onFinish}>
                  <Form.Item
                    labelAlign="top"
                    name="email"
                    label="Email address"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a valid email",
                        type: "email",
                      },
                    ]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input placeholder="Email" size="large" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Your password"
                    labelAlign="top"
                    rules={[
                      { required: true, message: "Please enter your password" },
                    ]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 0 }}
                  >
                    <Input.Password placeholder="Password" size="large" />
                  </Form.Item>
                  <Form.Item name="forget" className="forget-btn">
                    <Button type="link">Forget your password?</Button>
                  </Form.Item>
                  <Form.Item className="sign-in-btn">
                    <Button
                      type="primary"
                      htmlType="submit"
                      shape="round"
                      // onClick={() => navigate(PATH.TRANSACTION)}
                      loading={isLoginLoading}
                      disabled={isLoginLoading}
                    >
                      Sign In
                    </Button>
                  </Form.Item>
                  {/* <Form.Item name="signup" className="sign-up-btn">
                    Don't have an account?<Button type="link">Sign up</Button>
                  </Form.Item> */}
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SignInPage;
