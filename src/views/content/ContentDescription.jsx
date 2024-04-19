import PropTypes from "prop-types"
import { Box, Button, Typography } from "@mui/material"

const ContentDescription = ({ dataContent }) => {
    const { themeId } = dataContent || {}
    const coverImage = themeId?.coverImage
    console.log(dataContent)
    return (
        <Box sx={{ backgroundColor: "#fff" }}>
            <Box
            >
                <img style={{
                    width: "100%",
                    height: "300px",
                }} src={coverImage} />
            </Box>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>{dataContent?.title}</Typography>
            <iframe
                width="560"
                height="315"
                src={dataContent?.urlVideo}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen>
            </iframe>
            <Typography>{dataContent?.description}</Typography>
            <img style={{
                width: "100%",
                height: "300px",
            }} src={dataContent?.urlImage} />

            <Button
                variant="contained"
                // onClick={() => setOpen(true)}
                sx={{
                    background: "#2196F3",
                    fontSize: "20px",
                    textTransform: "none",
                    boxShadow: "none",
                    marginBottom: "20px"
                }}>
                Atras
            </Button>
        </Box>
    )
}
ContentDescription.propTypes = {
    dataContent: PropTypes.object,
}

export default ContentDescription