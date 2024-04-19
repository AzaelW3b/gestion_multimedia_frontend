import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import api from "../config/axios"

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [openToast, setOpenToast] = useState(false)
    const [toastAttributes, setToastAttributes] = useState({
        icon: '',
        message: '',
        background: '',
    })

    const navigate = useNavigate()

    const createUserForm = async (newUser) => {
        try {
            const { data } = await api.post('/api/user', newUser)
            if (data) {
                navigate("/")
            }
        } catch (error) {
            setOpenToast(true)
            setToastAttributes({
                icon: "error",
                message: `${error?.response?.data?.msg}`,
                background: "#FF5252",
            })
        }
    }

    return (
        <UserContext.Provider
            value={{
                // state
                openToast,
                toastAttributes,
                //methods
                setToastAttributes,
                createUserForm,
                setOpenToast

            }}
        >{children}
        </UserContext.Provider>
    )
}

export {
    UserProvider
}
UserProvider.propTypes = {
    children: PropTypes.node.isRequired
}
export default UserContext