import { useState } from "react";
import { login } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [form, setForm] = useState({email:"", password: ""})
    const {loginUser} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await login(form);
    loginUser(res.data.token, res.data.user);

    navigate("/", { replace: true });
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="flex justify-center mt-20">
        <form 
           onSubmit={handleSubmit}
           className="w-80 p-6 border rounded space-y-4"
        >
            <h2 className="text-xl font-bold">Login</h2>

            <input
               placeholder="Email"
               className="w-full border p-2"
               onChange={(e)=> setForm({...form, email:e.target.value})}
            />

            <input
               type="password"
               placeholder="Password"
               className="w-full border p-2"
               onChange={(e)=> setForm({...form, password:e.target.value})}
            />

            <button className="w-full bg-black text-white p-2">
                Login
            </button>
        </form>
    </div>
  )
}

export default Login