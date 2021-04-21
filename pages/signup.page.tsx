import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  InputGroup,
  Button,
  Input,
  InputRightElement,
  Text
} from "@chakra-ui/react";

import Link from "next/link";
import { Fragment, useState } from "react";
import { NextSeo } from "next-seo";
import axios from "axios";

const title = "Signup | MTs Techno Natura";
const description =
  "Join komunitas website MTs Techno Natura sekarang! Website resmi Remaja Madrasah Tsanawiyah Technonatura Depok. Website buatan para programmer MTs.";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  username: yup.string().trim().required("username is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  name: yup
    .string()
    .trim()
    .matches(RegExp(/^[a-zA-Z0-9]+$/), "Only Letters and Numbers are allowed")
    .required("name is required"),
  email: yup.string().email().required("username is required")
});

interface State {
  showPassword: boolean;
}

export default function signup() {
  const [values, setValues] = useState<State>({
    showPassword: false
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      name: "",
      email: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      const response = axios({
        url: ""
      });
    }
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <NextSeo
        title={title}
        description={description}
        canonical={process.env.PUBLIC_URL}
        openGraph={{
          url: process.env.PUBLIC_URL,
          title,
          description,
          type: "website",
          images: [
            {
              url: `${process.env.PUBLIC_URL}/ogp-img.png`,
              width: 256,
              height: 256,
              alt: "Mts Techno Natura Open Graph"
            }
          ],
          site_name: "MTs TechnoNatura"
        }}
      />
      <section>
        <div className="flex flex-wrap h-screen">
          <div className="pt-6 lg:pt-16 pb-6 w-full lg:w-1/2 flex-col justify-center items-center content-center">
            <div className="max-w-md m-auto ">
              <div className="mb-6 lg:mb-20 w-full px-3 flex items-center justify-between">
                <Link href="/">
                  <a className="text-3xl font-bold leading-none">
                    <img
                      className="h-12"
                      src="/favicon.ico"
                      alt=""
                      width="auto"
                    />
                  </a>
                </Link>

                <Link href="/login">
                  <a className="py-2 px-6 text-xs rounded-l-xl rounded-t-xl bg-green-100 hover:bg-green-200 text-green-600 font-bold transition duration-200">
                    Sign In
                  </a>
                </Link>
              </div>
              <div>
                <div className="mb-6">
                  <span className="text-gray-500">Sign Up</span>
                  <h3 className="text-2xl font-bold">Create an account</h3>
                </div>
                <form noValidate onSubmit={formik.handleSubmit}>
                  <InputGroup
                    mb={5}
                    size="md"
                    display="flex"
                    flexDirection="column"
                  >
                    <Text
                      mb="8px"
                      fontWeight="bold"
                      color={`${Boolean(formik.errors.name) ? "red.500" : ""}`}
                    >
                      Name
                    </Text>

                    <Input
                      isInvalid={Boolean(formik.errors.name)}
                      pr="4.5rem"
                      id="name"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      placeholder="Your Name"
                    />

                    {formik.errors.name && (
                      <Text
                        mb="8px"
                        fontWeight="medium"
                        color={`${
                          Boolean(formik.errors.name) ? "red.500" : ""
                        }`}
                      >
                        {formik.errors.name}
                      </Text>
                    )}
                  </InputGroup>

                  <InputGroup size="md" display="flex" flexDirection="column">
                    <Text
                      mb="8px"
                      fontWeight="bold"
                      color={`${Boolean(formik.errors.email) ? "red.500" : ""}`}
                    >
                      email
                    </Text>

                    <Input
                      isInvalid={Boolean(formik.errors.email)}
                      pr="4.5rem"
                      id="email"
                      email="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      placeholder="Your email"
                    />

                    {formik.errors.email && (
                      <Text
                        mb="8px"
                        fontWeight="medium"
                        color={`${
                          Boolean(formik.errors.email) ? "red.500" : ""
                        }`}
                      >
                        {formik.errors.email}
                      </Text>
                    )}
                  </InputGroup>

                  <InputGroup
                    mt={5}
                    mb={5}
                    size="md"
                    display="flex"
                    flexDirection="column"
                  >
                    <Text
                      mb="8px"
                      fontWeight="bold"
                      color={`${
                        Boolean(formik.errors.password) ? "red.500" : ""
                      }`}
                    >
                      Password
                    </Text>
                    <InputGroup side="md">
                      <Input
                        pr="4.5rem"
                        id="password"
                        name="password"
                        isInvalid={Boolean(formik.errors.password)}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        type={values.showPassword ? "text" : "password"}
                        placeholder="Enter password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          className="btn button"
                          onClick={handleClickShowPassword}
                        >
                          {values.showPassword ? (
                            <Visibility style={{ marginTop: "-5px" }} />
                          ) : (
                            <VisibilityOff style={{ marginTop: "-5px" }} />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>

                    {formik.errors.password && (
                      <Text
                        mb="8px"
                        fontWeight="medium"
                        color={`${
                          Boolean(formik.errors.password) ? "red.500" : ""
                        }`}
                      >
                        {formik.errors.password}
                      </Text>
                    )}
                  </InputGroup>
                  <div className="text-center">
                    <Button
                      isFullWidth
                      type="submit"
                      colorScheme="teal"
                      variant="solid"
                    >
                      Signup
                    </Button>
                    <span className="text-gray-400 text-xs">
                      <span>Already have an account?</span>
                      <a className="text-green-600 hover:underline" href="#">
                        Sign In
                      </a>
                    </span>
                    <p className="mt-16 text-xs text-gray-400">
                      <a className="underline hover:text-gray-500" href="#">
                        Policy privacy
                      </a>{" "}
                      and{" "}
                      <a className="underline hover:text-gray-500" href="#">
                        Terms of Use
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative w-full lg:w-1/2 bg-green-600">
            <div
              className="absolute bottom-0 inset-x-0 mx-auto mb-12 max-w-xl text-center"
              style={{ zIndex: 10 }}
            >
              <img
                className="lg:max-w-xl mx-auto"
                src="https://shuffle.dev/atis-assets/illustrations/pablo-coming-soon-dark-mono.png"
                alt=""
              />
              <h2 className="mb-2 text-2xl text-white font-bold">
                So much more than a business analytics tool
              </h2>
              <div className="max-w-lg mx-auto">
                <p className="mb-6 text-gray-50 leading-loose">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque efficitur nisl sodales egestas lobortis.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:hidden bg-green-600 w-full">
            <div className="relative w-full">
              <img
                className="relative mx-auto max-w-sm mt-4 mb-4 block"
                src="atis-assets/illustrations/pablo-coming-soon-dark-mono.png"
                alt=""
              />
              <div className="flex justify-center space-x-3">
                <button className="p-1 bg-green-500 rounded-full"></button>
                <button className="p-1 bg-green-500 rounded-full"></button>
                <button className="p-1 bg-white rounded-full"></button>
                <button className="p-1 bg-green-500 rounded-full"></button>
              </div>
            </div>
            <div className="py-10 px-3 text-center" style={{ zIndex: 10 }}>
              <h2 className="mb-2 text-2xl text-white font-bold">
                So much more than a business analytics tool
              </h2>
              <p className="mb-6 text-gray-50 leading-loose">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque efficitur nisl sodales egestas lobortis.
              </p>
              <a
                className="py-2 px-6 rounded-t-xl rounded-l-xl rounded-l-xl bg-white hover:bg-gray-500 text-gray-900 hover:text-white transition duration-200 font-bold"
                href="#"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
