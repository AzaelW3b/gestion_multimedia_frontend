import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Box,
    Stack,
    Typography,
    FormControl,
    Button,
    InputAdornment,
    OutlinedInput,
    IconButton,
} from "@mui/material"
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import BackGround from "../../components/layout/BackGround"
import HeaderForm from "../../components/layout/HeaderForm"
import Label from "../../components/layout/Label"
import useAuth from "../../hooks/useAuth"
import ToastAlert from "../../components/alerts/ToastAlert"

const LoginForm = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(true)
    const [auth, setAuth] = useState({
        userName: '',
        password: ''
    })
    const { userName, password } = auth

    const { login, toastAttributes, setOpenToast, openToast } = useAuth()

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const onChangeAuth = e => setAuth({ ...auth, [e.target.name]: e.target.value })

    const handleCloseToast = () => {
        setOpenToast(false)
    }


    const authSubmit = (e) => {
        e.preventDefault()
        login(auth)
    }

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
                        title={"Inicia Sesión"}
                        subTitle={"Introduce tu correo y contraseña"}
                    />
                    <FormControl variant="standard" sx={{ width: "100%" }}>
                        <Label
                            title="Usuario"
                        />
                        <OutlinedInput
                            sx={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
                            name="userName"
                            onChange={(e) => onChangeAuth(e)}
                            value={userName}
                            id="outlined-basic"
                            variant="outlined" />
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{ width: "100%" }}>
                        <Label
                            title="Contraseña"
                        />
                        <OutlinedInput
                            sx={{ width: "100%", marginTop: "20px" }}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            onChange={(e) => onChangeAuth(e)}
                            value={password}

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
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "50px"
                }}>
                    <Button
                        sx={{ marginBottom: "30px", width: { xs: "100%", md: "40%" } }}
                        variant="contained"
                        type="submit">
                        Iniciar sesión
                    </Button>


                </Box>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <Typography sx={{ color: "#000" }}>¿No tienes cuenta?</Typography>
                    <Typography
                        sx={{
                            color: '#2196F3',
                            cursor: 'pointer',
                            userSelect: "none"
                        }}
                        onClick={() => navigate("/crear-cuenta")}>Crear cuenta</Typography>
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

export default LoginForm