import { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import api from "../config/axios"
const ContentContext = createContext()

const ContentProvider = ({ children }) => {
    const [contents, setContents] = useState([])
    const [contentObject, setContentObject] = useState(null)
    const [openToast, setOpenToast] = useState(false)
    const [toastAttributes, setToastAttributes] = useState({
        icon: '',
        message: '',
        background: '',
    })

    useEffect(() => {
        getContents()
    }, [])

    const getContents = async () => {
        try {
            const { data } = await api.get('/api/content')
            console.log(data)
            setContents(data)
        } catch (error) {
            console.log(error)
        }
    }

    const createContent = async (content) => {
        try {
            const { data } = await api.post('/api/content', content)
            setContents([...contents, data])
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

    const findContentId = (id) => {
        const content = contents.find(contentIndex => contentIndex?._id === id)
        setContentObject(content)
    }

    const editContent = async (object, content) => {
        try {
            const { data } = await api.put(`/api/content/${object._id}`, content)
            const contentOriginal = contents.find(categoryIndex => categoryIndex?._id === object?._id)
          
            Object.assign(contentOriginal, data)
            setOpenToast(true)
            setToastAttributes({
                icon: 'success',
                message: 'Se edito el contenido con exito!',
                background: '#4CAF50',
            })
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
        <ContentContext.Provider
            value={{
                // state
                openToast,
                toastAttributes,
                contents,
                contentObject,
                //methods
                createContent,
                setToastAttributes,
                setOpenToast,
                setContentObject,
                findContentId,
                editContent,

            }}
        >{children}
        </ContentContext.Provider>
    )
}

export {
    ContentProvider
}
ContentProvider.propTypes = {
    children: PropTypes.node.isRequired
}
export default ContentContext