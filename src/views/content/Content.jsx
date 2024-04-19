import { Box, Card, CardHeader, IconButton, CardMedia, CardContent, Typography, Button, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import { useState } from "react"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import useContent from "../../hooks/useContent"
import { formatDate } from "../../helpers/formatDate"
import AddIcon from "@mui/icons-material/Add"
import ModalContent from "../../components/modals/ModalContent"
import ContentDescription from "./ContentDescription"
import useAuth from "../../hooks/useAuth"
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined"
import DeleteIcon from "@mui/icons-material/Delete"
const ROLE_READER = "reader"
const ROLE_ADMIN = "admin"

const tableStyles = {
    iconBlue: {
        color: "#2196F3"
    }
}

const Content = () => {
    const [open, setOpen] = useState(false)
    const [showDescription, setShowDescription] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [currentElement, setCurrentElement] = useState(null)
    const [dataContent, setDataContent] = useState(null)

    const { contents, findContentId } = useContent()
    const { user } = useAuth()

    const detailsContent = (data) => {
        setDataContent(data)
        setShowDescription(true)
    }
    const handleMenuClick = (event, data) => {
        setAnchorEl(event.currentTarget)
        setCurrentElement(data)
        setOpenMenu(true)
    }
    const handleClose = () => {
        setAnchorEl(null)
        setCurrentElement(null)
        setOpenMenu(false)
    }

    const handleMenuItemClick = (accion, data) => {
        if (accion === "edit") {
            // editFunction(data)
            findContentId(data?._id)
            setOpen(true)
        } else if (accion === "delete") {
            console.log('eliminando')
            // deleteFunction(data)
        }

        handleClose()
    }
    return (
        <Box sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            width: "95%"
        }}>
            {
                showDescription ?
                    <ContentDescription
                        dataContent={dataContent}
                    />

                    : (
                        <>
                            <Typography variant="h5" sx={{ fontSize: "20px", fontWeight: 600, color: "#3F3F3F", my: "32px" }}>Contenidos</Typography>
                            {
                                user?.userType !== ROLE_READER && (
                                    <Button
                                        variant="contained"
                                        onClick={() => setOpen(true)}
                                        startIcon={<AddIcon />}
                                        sx={{
                                            background: "#2196F3",
                                            fontSize: "12px",
                                            textTransform: "none",
                                            boxShadow: "none",
                                            marginBottom: "20px"
                                        }}
                                    >
                                        Nuevo contenido
                                    </Button>
                                )
                            }

                            <Box sx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: "10px",
                            }}>
                                {
                                    contents.length > 0 ?
                                        contents?.map(contentIndex => (
                                            <Card key={contentIndex?._id} sx={{ maxWidth: 345 }}>
                                                <CardHeader
                                                    action={
                                                        user?.userType !== ROLE_READER ?
                                                            <div>
                                                                <IconButton
                                                                    id="basic-button"
                                                                    aria-controls={openMenu ? "basic-menu" : undefined}
                                                                    aria-haspopup="true"
                                                                    aria-expanded={openMenu ? "true" : undefined}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        handleMenuClick(e, contentIndex)
                                                                    }}
                                                                >
                                                                    <MoreVertIcon />
                                                                </IconButton>
                                                                <Menu
                                                                    id="basic-menu"
                                                                    anchorEl={anchorEl}
                                                                    open={openMenu}
                                                                    onClose={handleClose}
                                                                    elevation={1}
                                                                >
                                                                    <MenuItem
                                                                        onClick={() =>
                                                                            handleMenuItemClick("edit", currentElement)
                                                                        }
                                                                    >
                                                                        <ListItemIcon>
                                                                            <BorderColorOutlinedIcon
                                                                                fontSize="small"
                                                                                sx={tableStyles.iconBlue}
                                                                            />
                                                                        </ListItemIcon>
                                                                        <ListItemText>Editar</ListItemText>
                                                                    </MenuItem>
                                                                    {
                                                                        user?.userType === ROLE_ADMIN && (
                                                                            <MenuItem
                                                                                onClick={() =>
                                                                                    handleMenuItemClick("delete", currentElement)
                                                                                }
                                                                            >
                                                                                <ListItemIcon>
                                                                                    <DeleteIcon
                                                                                        fontSize="small"
                                                                                        sx={tableStyles.iconBlue}
                                                                                    />
                                                                                </ListItemIcon>
                                                                                <ListItemText>Eliminar</ListItemText>
                                                                            </MenuItem>
                                                                        )
                                                                    }
                                                                </Menu>
                                                            </div>
                                                            : null
                                                    }
                                                    title={contentIndex?.title}
                                                    subheader={formatDate(contentIndex?.createdAt)}
                                                />
                                                <CardMedia
                                                    component="img"
                                                    height="194"
                                                    image={contentIndex?.themeId?.coverImage}
                                                    alt="Paella dish"
                                                />
                                                <CardContent>
                                                    <Typography variant="body2">
                                                        <b>Descripción: </b>{contentIndex?.description}
                                                    </Typography>

                                                    <Typography sx={{
                                                        marginTop: "20px",
                                                        color: "colores.azulOscuro",
                                                        userSelect: "none",
                                                        cursor: "pointer"
                                                    }} variant="body2"
                                                        onClick={() => detailsContent(contentIndex)}>
                                                        Leer más
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        )) :
                                        <Typography>
                                            {"No hay contenido registrado."}
                                        </Typography>
                                }

                            </Box>
                        </>
                    )
            }

            <ModalContent
                open={open}
                setOpen={setOpen}
            />
            {/* <ToastAlert
                openToast={openToast}
                message={toastAttributes.message}
                background={toastAttributes.background}
                icon={toastAttributes.icon}
                handleClose={handleCloseToast}
            /> */}
        </Box>
    )
}

export default Content