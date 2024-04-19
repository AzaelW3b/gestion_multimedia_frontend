import { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import api from "../config/axios"
import { formatDate } from "../helpers/formatDate"

const CategoryContext = createContext()

const CategoryProvider = ({ children }) => {
    const [contentCategorys, setContentCategorys] = useState([])
    const [contentCategoryObject, setContentCategoryObject] = useState(null)
    const [openToast, setOpenToast] = useState(false)
    const [toastAttributes, setToastAttributes] = useState({
        icon: '',
        message: '',
        background: '',
    })

    useEffect(() => {
        getAllCategorys()
    }, [])

    const getAllCategorys = async () => {
        try {
            const { data } = await api.get('/api/contentCategory')
            const formatCategory = data?.map(category => {
                return {
                    _id: category?._id,
                    nameCategory: category?.nameCategory,
                    createdAt: formatDate(category?.createdAt),
                    updatedAt: formatDate(category?.updatedAt),
                }
            })
            setContentCategorys(formatCategory)
        } catch (error) {
            console.log(error)
        }
    }

    const crateCategory = async (newCategory) => {
        try {
            const { data } = await api.post('/api/contentCategory', newCategory)
            const formatCategory = {
                _id: data?._id,
                nameCategory: data?.nameCategory,
                createdAt: formatDate(data?.createdAt),
                updatedAt: formatDate(data?.updatedAt),
            }
            setContentCategorys([...contentCategorys, formatCategory])
            setOpenToast(true)
            setToastAttributes({
                icon: 'success',
                message: 'Se creo la categoria con exito!',
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

    const editCategory = async (category) => {
        try {
            const { data } = await api.put(`/api/contentCategory/${category?._id}`, category)
            const categoryOriginal = contentCategorys.find(categoryIndex => categoryIndex?._id === category?._id)
            const formatCategory = {
                _id: data?._id,
                nameCategory: data?.nameCategory,
                createdAt: formatDate(data?.createdAt),
                updatedAt: formatDate(data?.updatedAt),
            }
            Object.assign(categoryOriginal, formatCategory)
            setOpenToast(true)
            setToastAttributes({
                icon: 'success',
                message: 'Se edito la categoria con exito!',
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

    const deleteCategory = async (id) => {
        try {
            const { data } = await api.delete(`/api/contentCategory/${id}`)
            const categorysFilter = contentCategorys.filter(categoryIndex => categoryIndex._id !== id)
            setContentCategorys(categorysFilter)
            setOpenToast(true)
            setToastAttributes({
                icon: 'success',
                message: `${data?.msg}`,
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

    const getCategoryId = (id) => {
        const categoryObject = contentCategorys.find(categoryIndex => categoryIndex._id === id)
        setContentCategoryObject(categoryObject)
    }

    return (
        <CategoryContext.Provider
            value={{
                // state
                openToast,
                toastAttributes,
                contentCategorys,
                contentCategoryObject,
                //methods
                setToastAttributes,
                crateCategory,
                setOpenToast,
                getCategoryId,
                setContentCategoryObject,
                editCategory,
                deleteCategory

            }}
        >{children}
        </CategoryContext.Provider>
    )
}

export {
    CategoryProvider
}
CategoryProvider.propTypes = {
    children: PropTypes.node.isRequired
}
export default CategoryContext