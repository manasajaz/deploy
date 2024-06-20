import BAbutton from "../component/button";
import BAinput from "../component/input";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


export default function Login() {

  const [model, setModel] = useState({});
  const navigate = useNavigate();

  const fillModel = (key, val) => {
    model[key] = val;
    setModel({ ...model });
  };

  let LoginUser = async () => {
    // console.log(model.userName);
    const formData = {
      "userName": model.userName,
      "passward": model.passward
    }
    try {
      const response = await axios.post("http://localhost:8000/auth/login", formData); // Adjust the endpoint as necessary
      console.log(response.data);
      if (response.data.error == "") {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-pink-500">
      <div className=" dark:bg-white bg-[rgba(255,255,255,.3)] p-5 rounded-lg border-t-4 border-b-4 border-indigo-300  text-center">
        <div className="py-2">
          <h1 className="text-5xl ">Login</h1>
        </div>

        <div className="py-2">
          <BAinput
            type="text"
            label="userName"
            value={model.userName}
            onChange={(e) => fillModel("userName", e.target.value)}
          />
        </div>
        <div className="py-2">
          <BAinput
            type="passward"
            label="passward"
            value={model.passward}
            onChange={(e) => fillModel("passward", e.target.value)}
          />
        </div>
        <div className="py-2">
          <BAbutton onClick={LoginUser} label="login" />
        </div>
        <div>
          <Link to="/signup">Creat an Account</Link>
        </div>
      </div>
    </div>
  );
}
