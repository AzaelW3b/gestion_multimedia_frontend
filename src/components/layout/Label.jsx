import { InputLabel } from "@mui/material"
import PropTypes from "prop-types"

const Label = ({ title }) => {
    return (
        <InputLabel shrink sx={{ fontSize: "20px", color: "#000", marginTop: "-10px" }}>
            {title}
        </InputLabel>
    )
}
Label.propTypes = {
    title: PropTypes.string,
}
export default Label