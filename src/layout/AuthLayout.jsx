import { Outlet } from "react-router-dom"
import { Box } from "@mui/material"

const AuthLayout = () => {
    return (
        <Box
            sx={{
                display: { xs: "block", md: "grid" },
                gridTemplateColumns: "repeat(2, 1fr)",
                height: "100vh"
            }}>
            <Outlet />
        </Box>
    )
}


export default AuthLayout