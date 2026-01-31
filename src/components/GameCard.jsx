import { Card, CardContent, Box, IconButton, Stack, Typography, CardMedia } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { TANK, DAMAGE, SUPPORT } from "../utils/heroes";
import { CONTROL, ESCORT, FLASHPOINT, HYBRID, PUSH } from "../utils/maps";
import { saveGames } from "../utils/storage";

const maps = {
    ...CONTROL,
    ...ESCORT,
    ...FLASHPOINT,
    ...HYBRID,
    ...PUSH
};

const heroes = {
    ...TANK,
    ...DAMAGE,
    ...SUPPORT
};

export default function GameCard({ game, games, setGames }) {
  return (
    <Card sx={{ 
        width: "500px",
        height: "280px", 
        borderRadius: "10px",
        borderStyle: "invisible",
    }}>
      <CardContent>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant="h6">
            {game.result ? "🏆 Victory" : "🤕 Defeat"}
            </Typography>
            <IconButton
                onClick={() => {
                    setGames(games.filter((currentGame) => currentGame != game))
                    saveGames(games.filter((currentGame) => currentGame != game));
                }}
                sx={{
                    color: "#ec669a",
                    "&:hover": { backgroundColor: "rgba(255,156,163,0.12)" } // subtle tint on hover
                }}
            >
                <DeleteIcon />
            </IconButton>
        </Stack>
        <Typography>Rank: {game?.lowestRank?.rank + " - " + game?.lowestRank?.division + "  ,  " + game?.highestRank?.rank + " - " + game?.highestRank?.division}</Typography>
        <Typography>Map: {game.map}</Typography>
        <Typography>Time: {new Date(game.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</Typography>
        <Typography>Duration: {game.duration}</Typography>    
        <Stack direction="row" alignItems={"flex-end"} spacing={2} justifyContent={"space-between"} sx={{bottom: "50px", position: "relative"}}>
            <Stack direction="row" spacing={1} mt={1}>
                {game.heroBans.map((name) => {
                    return (
                    <Box key={name}>
                        <Card
                        sx={{
                            width: "40px",
                            backgroundColor: "transparent",
                            borderColor: "#ec669a",
                            borderRadius: "10px",
                            borderStyle: "ridge",
                            overflow: "hidden",
                        }}
                        onClick={() => {
                            onClick(name);
                        }}
                        >
                        <Box sx={{ position: "relative" }}>
                            <CardMedia
                            component="img"
                            image={heroes[name]}
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
                                bgcolor: "#ec66993d"
                            }}
                            />
                        </Box>
                        </Card>
                    </Box>
                    );
                })}
            </Stack>

            <CardMedia
                component="img"
                image={maps[game.map]}
                sx={{
                    width: "200px",
                    objectFit: "contain",
                    borderRadius: "10px",
                    borderStyle: "ridge",
                }}
            />
        </Stack>
      </CardContent>
    </Card>
  );
}