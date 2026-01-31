import {
    Box,
    Card,
    CardMedia,
    Stack,
    Button,
    Typography
} from "@mui/material";
import { ranks } from "../utils/ranks";

const divisions = [
    1,2,3,4,5
];

const RankSelector = ({rank, division, setRank, setDivision, label}) => (
    <Stack direction={"column"} spacing={2} justifyContent={"center"}>
        <Typography>{label}</Typography>
        <Stack
            direction={"row"}
            justifyContent={"center"}
            spacing={1}
        >
            {Object.entries(ranks).map(([name, src]) => {
                const isSelected = rank == name;
                return (
                <Box key={name}>
                    <Card
                        sx={{
                            width: "40px",
                            backgroundColor: "transparent",
                            borderColor: isSelected ? "#B3E5FC" : "gray",
                            borderRadius: "10px",
                            borderStyle: "ridge",
                            transition: "border-color 150ms",
                            overflow: "hidden",
                            "&:hover img": {
                            transform: "scale(1.1)",
                            },
                        }}
                        onClick={() => {
                            setRank(name);
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
                                    ? "#b3e5fca6"
                                    : "rgba(0,0,0,0.01)",
                                    transition: "background-color 300ms",
                                }}
                            />
                        </Box>
                    </Card>
                </Box>
                );
            })}
        </Stack> 
        <Stack direction="row-reverse" justifyContent={"center"} spacing={2}>
            {divisions.map((div) => (
                <Button
                    key={div}
                    variant="contained"
                    color={division == div ? "primary" : "secondary"}
                    size="small"
                    sx={{width: "30px", padding: "0px", minWidth: "auto"}}
                    onClick={() => setDivision(div)}
                >
                    {div}
                </Button>
            ))}
        </Stack>
    </Stack>
);

export default RankSelector;