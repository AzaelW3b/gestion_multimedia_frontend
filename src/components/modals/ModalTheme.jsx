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
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    TextField
} from "@mui/material"
import PropTypes from "prop-types"
import useTheme from "../../hooks/useTheme"
import useCategory from "../../hooks/useCategory"
import Label from "../layout/Label"

const ModalTheme = ({ setOpen, open }) => {
    const [disabledButton, setDisabledButton] = useState(false)
    const [newTheme, setNewTheme] = useState({
        nameTheme: "",
        contentCategoryId: "",
        typePermissions: {
            images: false,
            videos: false,
            texts: false
        },
        coverImage: ""
    })
    const { nameTheme, contentCategoryId, typePermissions, coverImage } = newTheme
    const { createTheme } = useTheme()
    const { contentCategorys } = useCategory()

    useEffect(() => {
        if (nameTheme?.trim() === '' || contentCategoryId === "" || coverImage === "") {
            setDisabledButton(true)
        } else {
            setDisabledButton(false)
        }
    }, [nameTheme, contentCategoryId, coverImage])

    const onChangeTheme = (e) => {
        if (e.target.name === 'typePermissions') {
            setNewTheme({
                ...newTheme,
                typePermissions: {
                    ...typePermissions,
                    [e.target.value]: e.target.checked
                }
            })
        } else if (e.target.name === 'coverImage') {
            setNewTheme({ ...newTheme, coverImage: e.target.files[0] })
        } else {
            setNewTheme({ ...newTheme, [e.target.name]: e.target.value })
        }
    }


    const handleClose = () => {
        setOpen(false)
        setNewTheme({
            nameTheme: "",
            contentCategoryId: "",
            typePermissions: {
                images: false,
                videos: false,
                texts: false
            },
            coverImage: ""
        })
    }

    const saveTheme = () => {
        const formData = new FormData()
        formData.append('nameTheme', nameTheme)
        formData.append('contentCategoryId', contentCategoryId)
        formData.append('typePermissions.images', typePermissions.images)
        formData.append('typePermissions.videos', typePermissions.videos)
        formData.append('typePermissions.texts', typePermissions.texts)
        formData.append('coverImage', coverImage)
        createTheme(formData)
        setOpen(false)
        setNewTheme({
            nameTheme: "",
            contentCategoryId: "",
            typePermissions: {
                images: false,
                videos: false,
                texts: false
            },
            coverImage: ""
        })
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Alta de temática
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
                        <Label
                            title=" Nombre de la temática"
                        />
                        <OutlinedInput
                            name="nameTheme"
                            sx={{
                                marginTop: "30px",
                                marginBottom: "30px"
                            }}
                            value={nameTheme}
                            onChange={(e) => onChangeTheme(e)}
                        />
                    </FormControl>
                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel shrink sx={{ fontSize: "20px", color: "#000", marginLeft: "-15px" }}>
                            Categoria de contenido
                        </InputLabel>
                        <Select
                            name="contentCategoryId"
                            sx={{ marginTop: "20px", marginBottom: "10px" }}
                            value={contentCategoryId}
                            onChange={(e) => onChangeTheme(e)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            {contentCategorys.map(category => (
                                <MenuItem
                                    value={category?._id}
                                    key={category?._id}>
                                    {category?.nameCategory}
                                </MenuItem>

                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ width: "100%", marginTop: "20px" }}>
                        <InputLabel shrink sx={{ fontSize: "20px", color: "#000", marginLeft: "-15px" }}>
                            Permisos
                        </InputLabel>
                        <FormControlLabel
                            sx={{ marginTop: "15px" }}
                            control={<Checkbox checked={typePermissions?.images} onChange={(e) => onChangeTheme(e)} name="typePermissions" value="images" />}
                            label="Imagenes"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={typePermissions?.videos} onChange={(e) => onChangeTheme(e)} name="typePermissions" value="videos" />}
                            label="Videos"
                        />
                        <FormControlLabel
                            sx={{ marginBottom: "20px" }}
                            control={<Checkbox checked={typePermissions?.texts} onChange={(e) => onChangeTheme(e)} name="typePermissions" value="texts" />}
                            label="Textos"
                        />
                    </FormControl>

                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel shrink sx={{ fontSize: "20px", color: "#000", marginLeft: "-15px" }}>
                            Portada de la temática
                        </InputLabel>

                        <input
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            name="coverImage"
                            onChange={onChangeTheme}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="contained-button-file">
                            <Button sx={{ marginTop: "20px" }} variant="contained" component="span">
                                Cargar imagen
                            </Button>
                        </label>
                        <TextField
                            variant="outlined"
                            disabled
                            value={coverImage ? coverImage.name : ""}
                            fullWidth
                            sx={{ marginTop: "10px" }}
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
                    onClick={() => saveTheme()}
                    autoFocus>
                    Guardar
                </Button>
            </DialogActions>


        </Dialog>
    )
}

ModalTheme.propTypes = {
    setOpen: PropTypes.func,
    open: PropTypes.bool,
}

export default ModalTheme