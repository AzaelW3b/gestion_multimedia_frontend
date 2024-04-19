import { Alert, Snackbar, Typography } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import PropTypes from "prop-types"


const ToastAlert = ({ openToast, message, background, icon, handleClose }) => {
  const icons = {
    'success': <CheckCircleIcon sx={{ color: "#FFFFFF" }} />,
    'error': <ErrorOutlineRoundedIcon sx={{ color: "#FFFFFF" }} />
  }

  const handleCloseToast = (status) => {
    handleClose(status)
  }

  return (
    <Snackbar open={openToast} onClose={handleCloseToast} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
      <Alert icon={icons[icon]} sx={{ width: '470px', background: background }}>
        <Typography sx={{ color: "#FFFFFF", fontSize: '16px' }}>{message}</Typography>
      </Alert>
    </Snackbar>
  )
}
ToastAlert.propTypes = {
  openToast: PropTypes.bool,
  message: PropTypes.string,
  background: PropTypes.string,
  icon: PropTypes.string,
  handleClose: PropTypes.func,
}
export default ToastAlert
