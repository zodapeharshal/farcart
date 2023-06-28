import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../../assets/api";
import { UserContext } from "../context/UserContext";
const SignupPage = () => {
    const navigate = useNavigate();
    const [signUpClicked, setSignUpClicked] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOTP] = useState();
    const [userData, setUserData] = useContext(UserContext) ; 

    const requestOTP = async () => {
        try {
            const payload = {
                userName: name,
                email: email,
                password: password,
            };
            const header = {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Allow requests from all origins
            };
            const response = await axios.post(
                "https://pdf-manager-u6c8.onrender.com/pdf-manager/getOtp",
                payload,
                { headers: header }
            );
            if (response.status == 200) {
                console.log("Email sent Successfully");
            }
        } catch (error) {
            console.error(error);
            toast.error("Invalid Credentials", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };
    const createUser = async () => {
        try {
            const payload = {
                userName: name,
                email: email,
                password: password,
            };
            const header = {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Allow requests from all origins
            };
            const response = await axios.post(
                API_ENDPOINTS.signup,
                payload,
                { headers: header }
            );
            if (response.status == 200) {
                console.log("User Created Successfully");
                // console.log(response.data) ;
                setUserData(response.data) ;
                navigate("/dashboard");
            }
        } catch (error) {
            console.error(error);
            toast.error("Invalid Credentials", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };
    const handleSignUpClick = (event) => {
        event.preventDefault();
        console.log("here");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email) && name.length > 0 && password.length > 0) {
    
            createUser();

        }
    };
    return (
        <section className="bg-gray-50">
            <ToastContainer />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    placeholder="Name"
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="name@company.com"
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                onClick={handleSignUpClick}
                                className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Create an account
                            </button>

                            <p className="text-sm font-light text-gray-500">
                                Already have an account?{" "}
                                <Link
                                    to="/"
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignupPage;
