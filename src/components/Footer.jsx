import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t-2">
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl h-12 font-bold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
            Hunger Halt
          </h1>

          <div className="flex flex-wrap text-gray-500 justify-center mt-6 -mx-4 space-x-6">
            <Link
              to={"/"}
              className="hover:text-teal-500 transition ease-in duration-200"
            >
              Home
            </Link>
            <Link
              to={"/"}
              className="hover:text-teal-500 transition ease-in duration-200"
            >
              About
            </Link>
            <Link
              to={"/"}
              className="hover:text-teal-500 transition ease-in duration-200"
            >
              Teams
            </Link>
            <Link
              to={"/"}
              className="hover:text-teal-500 transition ease-in duration-200"
            >
              Privacy
            </Link>
            <Link
              to={"/"}
              className="hover:text-teal-500 transition ease-in duration-200"
            >
              Cookies
            </Link>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-10" />

        <div className="flex flex-col space-y-4 md:space-y-0 items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-500">
            © Hunger Halt 2024. All Rights Reserved.
          </p>

          <div className="flex space-x-6 items-center">
            <Link to={"/"}>
              <FaLinkedin size={20} className="text-gray-600" />
            </Link>
            <Link to={"/"}>
              <FaXTwitter size={20} className="text-gray-600" />
            </Link>
            <Link to={"/"}>
              <FaGithub size={20} className="text-gray-600" />
            </Link>
            <Link to={"/"}>
              <FaInstagram size={20} className="text-gray-600" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
