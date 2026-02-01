import { useEffect, useState } from "react";
import { Button, Container, Stack, Box, Typography } from "@mui/material";
import { loadGames, saveGames } from "./utils/storage";
import GameCard from "./components/GameCard";
import EditGameDialog from "./components/EditGameDialog";
import FlowerBackground from "./components/FlowerBackground";
import * as XLSX from 'xlsx';

function exportGamesToXlsx(games) {
  const rows = games.map(g => ({
    id: g.id,
    date: new Date(g.time).toLocaleString(),
    result: g.result,
    rank: g.lowestRank.rank + "-" + g.lowestRank.division + "," + g.highestRank.rank + "-" + g.highestRank.division,
    map: g.map,
    heroBans: g.heroBans.join(',')
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Games');
  XLSX.writeFile(wb, 'games.xlsx');
}

export default function App() {
  const [games, setGames] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setGames(loadGames());
  }, []);

  function addGame(game) {
    let updated = [];

    if (games.filter((g) => g.id === game.id).length > 0){
      updated = games.map((g) => g.id == game.id ? game : g);
    }else{
      updated = [game, ...games];
    }

    setGames(updated);
    saveGames(updated);
  }

  return (
    <Container maxWidth={false} sx={{ position: 'relative', zIndex: 1, display: "flex", justifyContent: "center", mt: 4, minWidth: "500px" }}>
      <FlowerBackground count={64} />
      <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
        <Typography sx={{fontSize: "120px"}}>Overwatch Tracker</Typography>
        <Stack>
          {/* Header */}
          <Stack justifyContent={"space-between"} direction={"row"} sx={{ mb: 2, width: "500px"}}>
            <Button variant={"contained"} color={"secondary"} onClick={() => {
              const json = JSON.stringify(games, null, 2);

              navigator.clipboard.writeText(json)
                .then(() => console.log("Copied!"))
                .catch(err => console.error("Failed to copy", err));
            }}>
              Copy Json
            </Button>      
            <Button variant={"contained"} color={"secondary"} onClick={() => exportGamesToXlsx(games)}>
              Download Excel
            </Button>
            <Button variant={"contained"} color={"primary"} onClick={() => setOpen(true)}>
              New Game
            </Button>
          </Stack>
          <Stack spacing={2}>
            {games.map(game => (
              <GameCard key={game.id} game={game} games={games} setGames={setGames} setOpen={setOpen}/>
            ))}
          </Stack>
          <EditGameDialog
            open={open}
            onClose={() => setOpen(false)}
            onSave={addGame}
            games={games}
          />
        </Stack>
      </Stack>
    </Container>
  );
}