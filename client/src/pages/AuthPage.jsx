import {useContext, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {toast} from "react-toastify";
import {AuthContext} from "../context/AuthContext";

export default function AuthPage() {
  const auth = useContext(AuthContext)
  const {loading, request} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      toast.success(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      toast.success('Login successful')
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="bg-sky-500 max-w-[500px] text-white rounded-lg shadow-md px-8 py-6 w-full md:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">URL Simplifier</h1>
          <div>
            <div className="mb-6">
              <label htmlFor="email" className="text-gray-300 block mb-2">Email</label>
              <input
                  type="text"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                  className="appearance-none border rounded-md w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Type your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="text-gray-300 block mb-2">Password</label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                  className="appearance-none border rounded-md w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Type your password"
              />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                style={{marginRight: 10}}
                disabled={loading}
                onClick={loginHandler}
            >
              Log In
            </button>
            <button
                className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                onClick={registerHandler}
                disabled={loading}
            >
              Register
            </button>
          </div>
        </div>
      </div>
  )
}
