import { Box } from "@mui/material"
import BackGroundImage from '../../images/bg.jpg'

const BackGround = () => {
    return (
        <Box
            sx={{
                display: { xs: "none", md: "block" },
                position: 'relative',
                width: '100%',
                height: '100%',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(13, 62, 163, 0.6)',
                    mixBlendMode: 'hard-light',
                    zIndex: 1
                }
            }}
        >
            <img
                src={BackGroundImage}
                alt="Background imagen"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0
                }}
            />
        </Box>
    )
}

export default BackGround