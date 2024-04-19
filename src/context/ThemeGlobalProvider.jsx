import { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import api from "../config/axios"

const ThemeGlobalContext = createContext()

const ThemeGlobalProvider = ({ children }) => {
    const [themes, setThemes] = useState([])
    const [openToast, setOpenToast] = useState(false)
    const [toastAttributes, setToastAttributes] = useState({
        icon: '',
        message: '',
        background: '',
    })

    useEffect(() => {
        getThemes()
    },[])

    const getThemes = async () => {
        try {
            const { data } = await api.get('/api/theme')
            setThemes(data)
        } catch (error) {
            console.log(error)
        }
    }

    const createTheme = async (theme) => {
        try {
            const { data } = await api.post('/api/theme', theme)
            setThemes([...themes, data])
            console.log(data)
        } catch (error) {
            console.log(error)
            setOpenToast(true)
            setToastAttributes({
                icon: "error",
                message: `${error?.response?.data?.msg}`,
                background: "#FF5252",
            })
        }
    }


    return (
        <ThemeGlobalContext.Provider
            value={{
                // state
                openToast,
                toastAttributes,
                themes,
                //methods
                createTheme,
                setToastAttributes,
                setOpenToast

            }}
        >{children}
        </ThemeGlobalContext.Provider>
    )
}

export {
    ThemeGlobalProvider
}
ThemeGlobalProvider.propTypes = {
    children: PropTypes.node.isRequired
}
export default ThemeGlobalContext