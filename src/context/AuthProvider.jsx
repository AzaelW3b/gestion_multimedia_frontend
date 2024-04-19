import { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import api from "../config/axios"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [openToast, setOpenToast] = useState(false)
  const [toastAttributes, setToastAttributes] = useState({
    icon: '',
    message: '',
    background: '',
  })

  useEffect(() => {
    authUser()
  }, [])

  const login = async (auth) => {
    try {
      setLoading(true)
      const { data } = await api.post('/api/user/login', auth)
      if (data?.token) {
        setLoading(false)
        localStorage.setItem('token', data?.token)
        
        authUser()
        navigate("/principal/categorias")
        

      }
      console.log(data)
    } catch (error) {
      setOpenToast(true)
      setToastAttributes({
        icon: "error",
        message: `${error?.response?.data?.msg}`,
        background: "#FF5252",
      })
    }
  }

  const authUser = async () => {
    const token = localStorage.getItem('token')

    if (!token) return

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const { data } = await api.get('/api/user/profile', config)
      localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
    } catch (error) {
      console.log(error)
    }


  }

  const logOff = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate("/")
  }


  return (
    <AuthContext.Provider
      value={{
        // state
        user,
        loading,
        toastAttributes,
        openToast,
        //metodos
        login,
        setOpenToast,
        logOff,

      }}
    >{children}
    </AuthContext.Provider>
  )
}

export {
  AuthProvider
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}
export default AuthContext