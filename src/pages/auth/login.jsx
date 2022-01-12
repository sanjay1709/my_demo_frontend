import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Spinner,
} from "reactstrap";
import LOGIN_USER from "../../graphql/mutation/auth";
import { useMutation } from "@apollo/client";
import { Formik, Field, Form } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Login() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState([]);
  const [adminlogin] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      if (!data.adminlogin.status) {
        toast.error(data.adminlogin.msg);
        console.log(data.adminlogin.msg);
      } else {
        if (
          data.adminlogin.role === "superadmin" ||
          data.adminlogin.role === "admin" ||
          data.adminlogin.role === "user"
        ) {
          toast.success("User: Successfully Logged In");
          var userData = {
            user: data.adminlogin.role,
            token: data.adminlogin.token,
          };
          localStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem("token", data.adminlogin.token);
          if (
            data.adminlogin.role === "superadmin" ||
            data.adminlogin.role === "admin" ||
            data.adminlogin.role === "user"
          ) {
            window.location.href = "/admin/events";
          }
        }
      }

      setLoader(false);
    },
    onError: (error) => {
      setError(error.message);
      setLoader(false);
      toast.error("Login " + error);
    },
  });
  let initialValues = null;
  initialValues = { email: "", password: "" };
  return (
    <>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <div
        className=" d-flex align-items-center justify-content-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 150,
        }}
      >
        <div className="col-md-8">
          <div className="content">
            <section className="login-page">
              <div className="content">
                <div className="row d-flex align-items-center ">
                  <div className="col-md-8">
                    <Card className="card-user">
                      <div className="d-flex align-items-center justify-content-center"></div>
                      <CardHeader className="d-flex justify-content-center">
                        <CardTitle tag="h5">Login Here</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Formik
                          initialValues={initialValues}
                          onSubmit={async (fields) => {
                            setLoader(true);
                            const { email, password } = fields;
                            adminlogin({
                              variables: { email, password },
                            });
                          }}
                        >
                          <Form
                            ncols={["col-md-6", "col-md-6"]}
                            className="my-1"
                          >
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label htmlFor="email">Email</label>
                                  <Field
                                    name="email"
                                    placeholder="email"
                                    type="email"
                                    className="form-control"
                                  />
                                  {error && error.email ? (
                                    <label className="text-danger">
                                      {error.email.message}
                                    </label>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label htmlFor="email">Password</label>
                                  <Field
                                    name="password"
                                    placeholder="password"
                                    type="password"
                                    className="form-control"
                                  />
                                  {error && error.password ? (
                                    <label className="text-danger">
                                      {error.password.message}
                                    </label>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                            <div
                              className="update ml-auto mr-auto"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Button
                                className="btn-round"
                                color="primary"
                                value="Submit"
                                type="submit"
                              >
                                {loader ? (
                                  <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                                ) : null}
                                {loader === false ? "Login" : " Loading..."}
                              </Button>
                            </div>
                          </Form>
                        </Formik>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
