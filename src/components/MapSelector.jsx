import {
    Box,
    Stack,
    Card,
    CardMedia,
    Typography
} from "@mui/material";

const MapSelector = ({maps, onClick, selectedMap, label}) => (
    <Stack direction={"row"} alignItems={"center"} sx={{
        borderRadius: "10px",
        backgroundColor: "rgba(255,255,255,0.1)",
        borderStyle: "ridge",
        padding: "5px"
    }}>
        <Typography>
            {label}
        </Typography>
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}
        >
        {Object.entries(maps).map(([name, src]) => {
            const isSelected = selectedMap == name;

            return (
            <Box key={name}>
                <Card
                sx={{
                    width: "180px",
                    backgroundColor: "transparent",
                    borderColor: isSelected ? "rgb(223, 106, 193)" : "gray",
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
                        bgcolor: isSelected
                        ? "rgba(255, 119, 221, 0.51)"
                        : "rgba(0,0,0,0.01)",
                        transition: "background-color 300ms",
                    }}
                    />
                    <Box sx={{ position: "absolute", inset: 0, overflow: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography  sx={{   
                        textShadow: `
                        -1px -1px 0 #000,
                        1px -1px 0 #000,
                        -1px  1px 0 #000,
                        1px  1px 0 #000`
                    }}>
                        {name}
                    </Typography>
                    </Box>
                </Box>
                </Card>
            </Box>
            );
        })}
        </Box> 
    </Stack>
);

export default MapSelector;