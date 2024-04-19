import { Outlet, NavLink, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import MenuIcon from "@mui/icons-material/Menu"
import Toolbar from "@mui/material/Toolbar"
import Logo from "../images/logo2.png"
import Typography from "@mui/material/Typography"
import { Divider, Menu, MenuItem } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import useAuth from '../hooks/useAuth'
import CategoryIcon from "@mui/icons-material/Category"
import SubjectIcon from "@mui/icons-material/Subject"
import FolderCopyIcon from "@mui/icons-material/FolderCopy"

const drawerWidth = 240
function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState(null)

  const { user, loading, logOff } = useAuth()


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }


  const handleDrawerToggle = () => {

    if (window.innerWidth <= 600) {
      setMobileOpen(!mobileOpen)
    }
  }

  const links = [
    {
      name: "Categorias",
      icon: <CategoryIcon />,
      url: "/principal/categorias"
    },
    {
      name: "Temáticas",
      icon: <SubjectIcon />,
      url: "/principal/tematicas"
    },
    {
      name: "Contenidos",
      icon: <FolderCopyIcon />,
      url: "/principal/contenidos"
    },

  ]

  const drawer = (
    <div>
      <Box
        sx={{
          width: "230px",
          height: "65px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #C8CBD9",
        }}
      >
        <img style={{ width: "100%" }} src={Logo} alt="Logo" />
      </Box>
      <List>
        {links.map(link => (
          <ListItem key={link.name} disablePadding>
            <ListItemButton
              onClick={handleDrawerToggle}
              component={NavLink}
              to={link.url}
              selected={location.pathname === link.url}
              sx={{
                backgroundColor: location.pathname === link.url ? "#FAE7D6 !important" : "inherit",
              }}
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )

  const container = window !== undefined ? () => window.document.body : undefined

  const [dynamicHeight, setDynamicHeight] = useState("100vh")

  const handleResize = () => {
    const windowHeight = window.innerHeight
    const calculatedHeight = windowHeight > 600 ? "100vh" : "auto"

    setDynamicHeight(calculatedHeight)
  }

  useEffect(() => {
    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  if (loading) return ''


  return (
    <>

      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "colores.gris",
            boxShadow: "unset",
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar sx={{ justifyContent: { sm: "space-between", md: "flex-end" }, marginRight: { sm: "0px", md: "30px" } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "block", md: "none", color: "#000" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{
              ":hover": "none"
            }}>
              <IconButton
                sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                onClick={handleMenuOpen}>
                <AccountCircleOutlinedIcon />
                <Typography sx={{ marginLeft: "5px" }}>Perfil</Typography>
                <ArrowDropDownIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Box>
                    <Box>
                      <Typography sx={{ fontWeight: "bold" }}>{`${user?.name} ${user?.lastName}`}</Typography>

                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {user?.userType}
                      </Typography>

                      <Typography sx={{ fontSize: 14 }} gutterBottom>
                        {user?.userName}
                      </Typography>
                      <Divider />
                      <IconButton
                        sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                        onClick={() => logOff()}
                      >
                        <LogoutIcon />
                        <Typography sx={{ marginLeft: "5px", }}>Cerrar sesión</Typography>
                      </IconButton>
                    </Box>
                  </Box>
                </MenuItem>

              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            "& .MuiDrawer-paper": {
              backgroundColor: "colores.azulClaro",
            },
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >

            {drawer}

          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            backgroundColor: "colores.gris",
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            height: dynamicHeight,
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>

  )
}

MainLayout.propTypes = {
  window: PropTypes.func,
}

export default MainLayout
