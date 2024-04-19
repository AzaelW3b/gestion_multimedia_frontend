import { useEffect, useState } from "react"
import {
    Box,
    Stack,
    Typography,
    FormControl,
    InputLabel,
    Button,
    InputAdornment,
    OutlinedInput,
    IconButton,
    Select,
    MenuItem
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import BackGround from "../../components/layout/BackGround"
import HeaderForm from "../../components/layout/HeaderForm"
import Label from "../../components/layout/Label"
import useUser from "../../hooks/useUser"
import ToastAlert from "../../components/alerts/ToastAlert"
const CrearCuenta = () => {
    const navigate = useNavigate()
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [showPassword, setShowPassword] = useState(true)
    const [newAccount, setNewAccount] = useState({
        name: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        userType: ""
    })
    const { name, lastName, userName, email, password, userType } = newAccount

    const { createUserForm, setOpenToast, toastAttributes, openToast } = useUser()

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const onChangeCreateAccount = e => setNewAccount({ ...newAccount, [e.target.name]: e.target.value })

    const authSubmit = (e) => {
        e.preventDefault()
        createUserForm(newAccount)
    }

    const handleCloseToast = () => {
        setOpenToast(false)
    }

    useEffect(() => {
        if (name === "" || lastName === "" || userName === "" || email === "" || password === "" || userType === "") {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }
    }, [name, lastName, userName, email, password, userType])

    return (
        <>
            <Box
                component="form"
                onSubmit={e => authSubmit(e)}
                sx={{
                    padding: '40px',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff"
                }}>
                <Box sx={{
                    marginBottom: "40px"
                }}>
                    <HeaderForm
                        title={"Crear cuenta"}
                        subTitle={"Debes llenar todos los campos"}
                    />
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "20px"
                        }}
                    >
                        <FormControl variant="standard" sx={{ width: "100%" }}>
                            <Label
                                title="Nombre *"
                            />

                            <OutlinedInput
                                sx={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
                                name="name"
                                onChange={(e) => onChangeCreateAccount(e)}
                                value={name}
                                id="outlined-basic"
                                variant="outlined"
                                placeholder="Ingresa el nombre" />
                        </FormControl>

                        <FormControl variant="standard" sx={{ width: "100%" }}>
                            <Label
                                title="Apellidos *"
                            />
                            <OutlinedInput
                                sx={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
                                name="lastName"
                                onChange={(e) => onChangeCreateAccount(e)}
                                value={lastName}
                                id="outlined-basic"
                                variant="outlined"
                                placeholder="Ingresa los apellidos" />
                        </FormControl>

                        <FormControl variant="standard" sx={{ width: "100%" }}>
                            <Label
                                title="Usuario *"
                            />
                            <OutlinedInput
                                sx={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
                                name="userName"
                                onChange={(e) => onChangeCreateAccount(e)}
                                value={userName}
                                id="outlined-basic"
                                variant="outlined"
                                placeholder="Ingresa el usuario" />
                        </FormControl>

                        <FormControl variant="standard" sx={{ width: "100%" }}>
                            <Label
                                title="Correo *"
                            />
                            <OutlinedInput
                                sx={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
                                name="email"
                                onChange={(e) => onChangeCreateAccount(e)}
                                value={email}
                                id="outlined-basic"
                                variant="outlined"
                                placeholder="Ingresa el correo" />
                        </FormControl>

                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel shrink sx={{ fontSize: "20px", color: "#000", marginLeft: "-15px" }}>
                                Tipo de usuario *
                            </InputLabel>
                            <Select
                                name="userType"
                                sx={{ marginTop: "20px", marginBottom: "10px" }}
                                value={userType}
                                onChange={(e) => onChangeCreateAccount(e)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="creator">Creador</MenuItem>
                                <MenuItem value="reader">Lector</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl
                            variant="standard"
                            sx={{ width: "100%" }}>
                            <Label
                                title="Contraseña *"
                            />
                            <OutlinedInput
                                sx={{ width: "100%", marginTop: "20px" }}
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                onChange={(e) => onChangeCreateAccount(e)}
                                value={password}
                                placeholder="Ingresa la contraseña"
                                endAdornment={
                                    <InputAdornment
                                        position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Box>
                </Box>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "50px"
                }}>
                    <Button
                        disabled={buttonDisabled}
                        sx={{ marginBottom: "30px", width: { xs: "100%", md: "40%" } }}
                        variant="contained"
                        type="submit">
                        Crear cuenta
                    </Button>
                </Box>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <Typography sx={{ color: "#000" }}>¿Ya tienes cuenta?</Typography>
                    <Typography
                        sx={{
                            color: '#2196F3',
                            cursor: 'pointer',
                            userSelect: "none"
                        }}
                        onClick={() => navigate("/")}>Inicia sesión</Typography>
                </Stack>
            </Box>
            <BackGround />
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

export default CrearCuenta