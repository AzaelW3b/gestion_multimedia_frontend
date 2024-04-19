import { useContext } from "react"
import ThemeGlobalContext from "../context/ThemeGlobalProvider"

const useTheme = () => {
    return useContext(ThemeGlobalContext)
}

export default useTheme