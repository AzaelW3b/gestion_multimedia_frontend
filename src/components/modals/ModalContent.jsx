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
    TextField,
} from "@mui/material"
import PropTypes from "prop-types"
import useTheme from "../../hooks/useTheme"
import useContent from "../../hooks/useContent"
import useAuth from "../../hooks/useAuth"
import Label from "../layout/Label"

const ModalContent = ({ setOpen, open }) => {
    const [disabledButton, setDisabledButton] = useState(false)
    const [allowImage, setAllowImage] = useState(false)
    const [allowVideos, setAllowVideo] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [newContent, setNewContent] = useState({
        title: "",
        description: "",
        themeId: "",
        urlVideo: "",
        urlImage: "",
        urlText: ""
    })
    const { title, description, themeId, urlVideo, urlImage, urlText } = newContent
    const { themes } = useTheme()
    const { createContent, contentObject, setContentObject, editContent } = useContent()
    const { user } = useAuth()


    useEffect(() => {
        if (contentObject) {
            setIsEdit(true)
            setNewContent(contentObject)
        }
    }, [contentObject])

    useEffect(() => {
        if (themeId?.typePermissions?.images) {
            setAllowImage(true)
        } else if (!themeId?.typePermissions?.images) {
            setAllowImage(false)
        }
        if (themeId?.typePermissions?.videos) {
            setAllowVideo(true)
        } else if (!themeId?.typePermissions?.videos) {
            setAllowVideo(false)
        }
    }, [themeId])



    useEffect(() => {
        if (title?.trim() === '' || description === "" || themeId === "") {
            setDisabledButton(true)
        } else {
            setDisabledButton(false)
        }
    }, [title, description, themeId])

    const onChangeContent = (e) => {

        if (e.target.name === 'urlImage') {
            setNewContent({ ...newContent, urlImage: e.target.files[0] })
        } else {
            setNewContent({ ...newContent, [e.target.name]: e.target.value })
        }
    }


    const handleClose = () => {
        setOpen(false)
        setNewContent({
            title: "",
            description: "",
            themeId: "",
            createdBy: "",
            urlVideo: "",
            urlImage: "",
            urlText: ""
        })
        setContentObject(null)
        // setContentCategoryObject(null)
    }

    const saveTheme = () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('themeId', newContent.themeId?._id)
        formData.append('createdBy', user?._id)
        formData.append('urlVideo', urlVideo)
        formData.append('urlImage', urlImage)
        formData.append('urlText', urlText)
        if (isEdit) {
        
            editContent(newContent, formData)
        } else {
            createContent(formData)
        }
        setOpen(false)
        setNewContent({
            title: "",
            description: "",
            themeId: "",
            createdBy: "",
            urlVideo: "",
            urlImage: "",
            urlText: ""
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
                Alta de contenido
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
                            title="Titulo"
                        />
                        <OutlinedInput
                            name="title"
                            sx={{
                                marginTop: "30px",
                                marginBottom: "30px"
                            }}
                            value={title}
                            onChange={(e) => onChangeContent(e)}
                        />
                    </FormControl>

                    <FormControl
                        variant="standard"
                        sx={{ width: "100%" }}>
                        <Label
                            title="Descripción"
                        />
                        <OutlinedInput
                            name="description"
                            sx={{
                                marginTop: "30px",
                                marginBottom: "30px"
                            }}
                            value={description}
                            onChange={(e) => onChangeContent(e)}
                        />
                    </FormControl>

                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel shrink sx={{ fontSize: "20px", color: "#000", marginLeft: "-15px" }}>
                            Temática
                        </InputLabel>
                        <Select
                            name="themeId"
                            sx={{ marginTop: "20px", marginBottom: "10px" }}
                            value={themeId}
                            onChange={(e) => onChangeContent(e)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            {themes.map(theme => (
                                <MenuItem
                                    value={theme}
                                    key={theme?._id}>
                                    {theme?.nameTheme}
                                </MenuItem>

                            ))}
                        </Select>
                    </FormControl>

                    {
                        allowImage && (
                            <FormControl sx={{ width: "100%", marginTop: "20px" }}>
                                <InputLabel shrink sx={{ fontSize: "20px", color: "#000", marginLeft: "-15px" }}>
                                    Imagen del contenido
                                </InputLabel>

                                <input
                                    accept="image/*"
                                    id="contained-button-file"
                                    type="file"
                                    name="urlImage"
                                    onChange={(e) => onChangeContent(e)}
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
                                    value={urlImage ? urlImage.name : ""}
                                    fullWidth
                                    sx={{ marginTop: "10px" }}
                                />
                            </FormControl>
                        )
                    }
                    {
                        allowVideos && (
                            <FormControl
                                variant="standard"
                                sx={{ width: "100%", marginTop: "20px" }}>
                                <Label
                                    title="Url de youtube"
                                />
                                <OutlinedInput
                                    name="urlVideo"
                                    sx={{
                                        marginTop: "30px",
                                        marginBottom: "30px"
                                    }}
                                    value={urlVideo}
                                    onChange={(e) => onChangeContent(e)}
                                />
                            </FormControl>
                        )
                    }

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

ModalContent.propTypes = {
    setOpen: PropTypes.func,
    open: PropTypes.bool,
}

export default ModalContent