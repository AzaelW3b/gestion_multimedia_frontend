import { useEffect, useState } from "react"
import {
    Box,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material"
import PropTypes from "prop-types"
import useCategory from "../../hooks/useCategory"
const ModalCategory = ({ setOpen, open }) => {
    const [disabledButton, setDisabledButton] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [newCategory, setNewCategory] = useState({
        nameCategory: ""
    })
    const { nameCategory } = newCategory
    const { crateCategory, contentCategoryObject, setContentCategoryObject, editCategory } = useCategory()

    useEffect(() => {
        if (contentCategoryObject !== null) {
            setIsEdit(true)
            setNewCategory(contentCategoryObject)
        }
    }, [contentCategoryObject])

    useEffect(() => {
        if (nameCategory.trim() === '') {
            setDisabledButton(true)
        } else {
            setDisabledButton(false)
        }
    }, [nameCategory])

    const onChangeCategory = (e) => setNewCategory({ ...newCategory, [e.target.name]: e.target.value })

    const handleClose = () => {
        setOpen(false)
        setNewCategory({
            nameCategory: ""
        })
        setContentCategoryObject(null)
        setIsEdit(false)
    }

    const saveCategory = () => {
        if (isEdit) {
            editCategory(newCategory)
        } else {
            crateCategory(newCategory)

        }
        setOpen(false)
        setNewCategory({
            nameCategory: ""
        })
        setContentCategoryObject(null)
        setIsEdit(false)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Alta de categoria de contenido
            </DialogTitle>
            <DialogContent  >
                <Box sx={{
                    gap: "15px",
                    marginTop: "20px",
                }}
                    component="form"
                >
                    <FormControl
                        variant="standard"
                        sx={{ width: "100%" }}>
                        <InputLabel shrink sx={{
                            fontSize: "20px",
                            color: "#000",
                        }}>
                            Nombre de la categoria
                        </InputLabel>

                        <OutlinedInput
                            name="nameCategory"
                            sx={{
                                marginTop: "30px",
                                marginBottom: "30px"
                            }}
                            value={nameCategory}
                            onChange={(e) => onChangeCategory(e)}
                        />
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={handleClose}>Cancelar</Button>
                <Button
                    disabled={disabledButton}
                    variant="contained"
                    onClick={() => saveCategory()}
                    autoFocus>
                    Guardar
                </Button>
            </DialogActions>


        </Dialog>
    )
}

ModalCategory.propTypes = {
    setOpen: PropTypes.func,
    open: PropTypes.bool,
}

export default ModalCategory