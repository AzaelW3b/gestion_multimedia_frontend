import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { createTheme } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
import { AuthProvider } from "./context/AuthProvider"
import { UserProvider } from "./context/UserProvider"
import { CategoryProvider } from "./context/CategoryProvider"
import { ThemeGlobalProvider } from "./context/ThemeGlobalProvider"
import { ContentProvider } from "./context/ContentProvider"
import LoginForm from "./views/login/LoginForm"
import CreateAccount from "./views/login/CreateAccount"
import AuthLayout from "./layout/AuthLayout"
import MainLayout from "./layout/MainLayout"
import ContentCategory from "./views/contentCategory/ContentCategory"
import Themes from "./views/themes/Themes"
import Content from "./views/content/Content"

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2196F3",
      },
      colores: {
        azulClaro: "#E5EEF5",
        gris: "#F4F7F9",
        azulOscuro: "#1976D2",
        iconGris: "#777777",
        titleColorBlack: "#3F3F3F",
        celeste: "#0D99FF",
      },
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <UserProvider>
            <CategoryProvider>
              <ThemeGlobalProvider>
                <ContentProvider>
                  <Routes>
                    <Route path="/" element={<AuthLayout />}>
                      <Route index element={<LoginForm />} />
                      <Route path="crear-cuenta" element={<CreateAccount />} />
                    </Route>
                    <Route path="/principal" element={< MainLayout />}>
                      <Route path="categorias" element={<ContentCategory />} />
                      <Route path="tematicas" element={<Themes />} />
                      <Route path="contenidos" element={<Content />} />
                    </Route>
                  </Routes>
                </ContentProvider>
              </ThemeGlobalProvider>
            </CategoryProvider>
          </UserProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
