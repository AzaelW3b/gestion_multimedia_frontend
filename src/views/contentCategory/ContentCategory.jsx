import { useState } from "react"
import { TableCard } from "../../components/layout/TableCard"
import ModalCategory from "../../components/modals/ModalCategory"
import useCategory from "../../hooks/useCategory"
import ToastAlert from "../../components/alerts/ToastAlert"
import { Typography } from "@mui/material"

let colums = [
    "Nombre de la categoria",
    "Fecha de creación",
    "Fecha de actualización",
]


const ContentCategory = () => {
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(0)

    const { contentCategorys, openToast, toastAttributes, setOpenToast, getCategoryId, deleteCategory } = useCategory()
 

    const contentCategoryClick = () => {
        setOpen(true)
    }

    const handleCloseToast = () => {
        setOpenToast(false)
    }

    const editCategory = (data) => {
        getCategoryId(data?._id)
        setOpen(true)
    }

    const getCategoryData = (data) => {
        deleteCategory(data._id)
    }

    return (
        <>
            <Typography variant="h5" sx={{ fontSize: "20px", fontWeight: 600, color: "#3F3F3F", my: "32px" }}>Categorias</Typography>
            <TableCard
                handleClickUser={contentCategoryClick}
                displayColumns={colums}
                dataSource={contentCategorys}
                setPage={setPage}
                page={page}
                editFunction={editCategory}
                deleteFunction={getCategoryData}
            />
            <ModalCategory
                open={open}
                setOpen={setOpen}
            />
            <ToastAlert
                openToast={openToast}
                message={toastAttributes.message}
                background={toastAttributes.background}
                icon={toastAttributes.icon}
                handleClose={handleCloseToast}
            />
        </>
    )
}

export default ContentCategory