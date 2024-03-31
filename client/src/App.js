import {useRoutes} from "./routes";
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "./components/Spinner";

function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuth = !!token
  const router = useRoutes(isAuth)

  if (!ready) {
    return <Spinner />
  }

  return (
      <AuthContext.Provider value={{
        token, login, logout, userId, isAuth
      }}>
        <div className='bg-gray-200 h-screen w-screen flex justify-center items-center px-5'>
          <BrowserRouter>
            <ToastContainer/>
            {isAuth && <Navbar/>}
            {router}
          </BrowserRouter>
        </div>
      </AuthContext.Provider>
  );
}

export default App;
