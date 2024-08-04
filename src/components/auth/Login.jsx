import { Button, useToast } from "@chakra-ui/react";
import GoogleButton from "./GoogleButton";
import GithubButton from "./GithubButton";
import PasswordInput from "./PasswordInput";
import EmailInput from "./EmailInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAuthStatus } from "../../reduxStore/auth/authSlice";
import { requestFCMPermission } from "../../firebase/fcmSetup";

const schema = yup
  .object({
    Email: yup
      .string()
      .required()
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
        "Invalid email format"
      ),
    Password: yup
      .string()
      .required()
      .min(7, "Password must be at least 7 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/,
        "Password must contain at least one letter, one number, and one special character"
      ),
  })
  .required();

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_HOST2}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This is important
        body: JSON.stringify({
          email: data.Email,
          password: data.Password,
        }),
      });

      if (response.ok) {
        toast({
          title: "Login Successful",
          status: "success",
          position: "top",
          duration: 1000,
        });
        const user = await response.json();
        console.log(user);
        const token = await requestFCMPermission();
        await fetch(`${import.meta.env.VITE_HOST}/user/updateFCM`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.user.email,
            token,
          }),
        });
        dispatch(fetchAuthStatus());
        setTimeout(() => {
          if (user.user.role) {
            if (user.user.role == "volunteer") navigate("/volunteer");
            else if (user.user.role == "donor") navigate("/donor");
            else if (user.user.role == "ngo") navigate("/ngo");
          } else {
            navigate("/selectrole");
          }
        }, [1000]);
      } else {
        toast({
          title: "Invalid Credentials",
          status: "error",
          position: "top",
          duration: 1000,
        });
      }
    } catch (error) {
      toast({
        title: "Network error",
        status: "error",
        position: "top",
        duration: 1000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center py-7">
      <div className="p-6 rounded-xl border shadow-xl md:space-y-4 space-y-2 w-[350px] md:w-[500px]">
        {/* Section 1 */}
        <div className="space-y-4">
          <div className="flex-row space-y-2">
            <h1 className="md:text-3xl text-2xl font-bold text-center">
              Login
            </h1>
            <div className="text-sm text-center">
              <span>{`Don't have an account yet?`}</span>{" "}
              <Link to={"/signup"} className="text-blue-600 font-semibold">
                Sign Up
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <GoogleButton />
            <GithubButton />
          </div>
        </div>
        {/* Section 2 */}
        <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
          Or
        </div>
        {/* Section 3 */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Email Input */}
          <EmailInput register={register} errors={errors} />

          {/* Password Input */}
          <PasswordInput register={register} errors={errors} />

          {/* Submit Button */}
          <Button
            type="submit"
            colorScheme="blue"
            w={"full"}
            size={{ base: "md", md: "lg" }}
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
