import { Button } from "@chakra-ui/react";
import GoogleButton from "./GoogleButton";
import GithubButton from "./GithubButton";
import PasswordInput from "./PasswordInput";
import EmailInput from "./EmailInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

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
  const onSubmit = (data) => console.log(data);

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
              <Link to={'/signup'} className="text-blue-600 font-semibold">Sign Up</Link>
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
