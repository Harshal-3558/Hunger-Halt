import { Button } from "@chakra-ui/react";
import GoogleButton from "./GoogleButton";
import GithubButton from "./GithubButton";
import PasswordInput from "./PasswordInput";
import EmailInput from "./EmailInput";

export default function Login() {
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
              <span className="text-blue-600 font-semibold">Sign Up</span>
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
        <div className="space-y-3">
          <EmailInput />
          <PasswordInput />
        </div>
        {/* Section 4 */}
        <div>
          <Button colorScheme="blue" w={"full"} size={{ base: "md", md: "lg" }}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
