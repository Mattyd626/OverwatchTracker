import {
    Box,
    Card,
    CardMedia
} from "@mui/material";

const HeroSelector = ({heroes, bans, onClick}) => (
    <Box
    sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        justifyContent: "center",
        width: "100%",
    }}
    >
    {Object.entries(heroes).map(([name, src]) => {
        const isBanned = bans.includes(name);

        return (
        <Box key={name}>
            <Card
            sx={{
                width: "80px",
                backgroundColor: "transparent",
                borderColor: isBanned ? "red" : "gray",
                borderRadius: "10px",
                borderStyle: "ridge",
                transition: "border-color 150ms",
                overflow: "hidden",
                "&:hover img": {
                transform: "scale(1.1)",
                },
            }}
            onClick={() => {
                onClick(name);
            }}
            >
            <Box sx={{ position: "relative" }}>
                <CardMedia
                component="img"
                image={src}
                alt={name}
                sx={{
                    objectFit: "cover",
                    transition: "transform 180ms ease",
                }}
                />

                <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: isBanned
                    ? "rgba(255,0,0,0.35)"
                    : "rgba(0,0,0,0.01)",
                    transition: "background-color 150ms",
                }}
                />
            </Box>
            </Card>
        </Box>
        );
    })}
    </Box> 
);

export default HeroSelector;