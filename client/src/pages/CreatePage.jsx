import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function CreatePage() {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [link, setLink] = useState('')

  const pressHandler = async event => {
    try {
      event.preventDefault()

      if (!link) {
        toast.warn("URL field should not be empty")
        return
      }

      const data = await request('/api/link/generate', 'POST', {from: link}, {
        Authorization: `Bearer ${auth.token}`
      })
      navigate(`/detail/${data.link._id}`)
    } catch (e) {}
  }

  return (
      <div className="container h-full mx-auto flex justify-center items-center">
        <form className="bg-sky-500 shadow-md rounded-md p-4 flex flex-col items-center w-full max-w-md">
          <h2 className="text-white text-xl font-bold mb-4">Create Simplified URL</h2>
          <input
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-sky-700 w-full"
              type="text"
              placeholder="Type URL"
              value={link}
              onChange={(e) => setLink(e.target.value)}
          />
          <button onClick={pressHandler} className="bg-sky-700 text-white px-4 py-2 rounded-md mt-4 hover:bg-sky-900">Create</button>
        </form>
      </div>
  )
}
