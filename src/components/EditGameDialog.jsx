import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  TextField,
  Checkbox
} from "@mui/material";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { CONTROL, ESCORT, FLASHPOINT, HYBRID, PUSH } from "../utils/maps";
import { TANK, DAMAGE, SUPPORT } from "../utils/heroes";
import HeroSelector from "./HeroSelector";
import MapSelector from "./MapSelector";
import RankSelector from "./RankSelector";

export default function EditGameDialog({ games, open, onClose, onSave }) {
  const [form, setForm] = useState(
    typeof open === "string" ?
    (games.filter((g) => g.id === open)?.[0]): 
    {
    result: true,
    lowestRank: {rank: "", division: 0},
    highestRank: {rank: "", division: 0},
    heroBans: [],
    map: null,
    duration: null,
  });

  useEffect(() => {
    if (typeof open === "string"){
      setForm(games.filter((g) => g.id === open)?.[0]);
    }else{
      setForm({
          result: true,
          lowestRank: {rank: null, division: null},
          highestRank: {rank: null, division: null},
          heroBans: [],
          map: null,
          duration: null,
      });
    }
  }, [setForm, open])

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    if(typeof open === "boolean"){
      onSave({
        ...form,
        id: uuid(),
        time: new Date().toISOString(),
      });
    }else{
      onSave(form);
    }
    onClose();
  }

  const handleHeroSelect = (name) => {
    if(form.heroBans.includes(name)){
        handleChange("heroBans", form.heroBans.filter((currentName) => currentName != name));
    }else if(form.heroBans.length < 4){
        handleChange("heroBans", [...form.heroBans,name]);
    } 
  }

  const handleMapSelect = (name) => (handleChange("map",form.map == name ? null : name));

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{
        borderBottom: 5,
        borderStyle: "solid",
        borderColor: "divider"
      }}>Edit the game twin..</DialogTitle>
      <DialogContent
        sx={{
            maxHeight: '90vh',          // keep it scrollable
            overflow: 'auto',
            /* WebKit (Chrome, Edge, Safari) */
            '&::-webkit-scrollbar': { width: 10 },
            '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#FF9CA3',
            borderRadius: 4,
            border: '2px solid transparent',
            backgroundClip: 'padding-box',
            },
            '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },

            /* Firefox */
            scrollbarWidth: 'thin',
            scrollbarColor: '#FF9CA3 transparent',
        }}
      >
        <Stack spacing={5} mt={1}>
            <Stack direction="row" alignItems="center" spacing={2} justifyContent={"center"}>
                <Typography sx={{width: "15rem"}}>{form.result ? "Did we win? (˶ᵔ ᵕ ᵔ˶)" : "Did we win? (╥﹏╥)"}</Typography>
                <Checkbox 
                    checked={form?.result ?? true}
                    onChange={(e) => handleChange("result", e.target.checked)} 
                    color="primary"
                />
            </Stack>

            <Stack direction="row" alignItems={"center"} spacing={3}>
                <Typography>Match duration:</Typography>
                <TextField 
                    variant="filled"
                    size="small"
                    value={form.duration ?? ""}
                    onChange={(e) => {handleChange("duration", e.target.value)}}
                />
            </Stack>
            
            <Stack direction={"row"} justifyContent={"space-between"}>
                <RankSelector 
                    label={"Lowest Rank:"} 
                    rank={form.lowestRank.rank} 
                    division={form.lowestRank.division} 
                    setRank={(rank) => {handleChange("lowestRank", {...form.lowestRank, rank})}}
                    setDivision={(division) => {handleChange("lowestRank", {...form.lowestRank, division})}}
                />
                <RankSelector 
                    label={"Highest Rank:"} 
                    rank={form.highestRank.rank} 
                    division={form.highestRank.division} 
                    setRank={(rank) => {handleChange("highestRank", {...form.highestRank, rank})}}
                    setDivision={(division) => {handleChange("highestRank", {...form.highestRank, division})}}
                />
            </Stack>

            <Stack>
                <Typography variant="h6">
                    {"Hero Bans:"}
                </Typography>
                <Stack direction={"column"} spacing={3} justifyContent={"center"}>
                    <HeroSelector heroes={TANK} bans={form.heroBans} onClick={handleHeroSelect}/>
                    <HeroSelector heroes={DAMAGE} bans={form.heroBans} onClick={handleHeroSelect}/>
                    <HeroSelector heroes={SUPPORT} bans={form.heroBans} onClick={handleHeroSelect}/>
                </Stack>
            </Stack>

            <Stack>
                <Typography variant="h6">
                    {"Map:"}
                </Typography>
                <Stack direction={"column"} spacing={3} justifyContent={"center"}>
                    <MapSelector label={"Control:"} maps={CONTROL} selectedMap={form.map} onClick={handleMapSelect}/>
                    <MapSelector label={"Escort:"} maps={ESCORT} selectedMap={form.map}  onClick={handleMapSelect}/>
                    <MapSelector label={"Hybrid:"} maps={HYBRID} selectedMap={form.map}  onClick={handleMapSelect}/>
                    <MapSelector label={"Push:"} maps={PUSH} selectedMap={form.map}  onClick={handleMapSelect}/>
                    <MapSelector label={"Flashpoint:"} maps={FLASHPOINT} selectedMap={form.map}  onClick={handleMapSelect}/>
                </Stack>
            </Stack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{
        borderTop: 5,
        borderStyle: "solid",
        borderColor: "divider"
      }}>
        <Button onClick={onClose} variant="contained" color="secondary">
            Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={
            form.lowestRank.rank == null || 
            form.lowestRank.division == null || 
            form.highestRank.rank == null || 
            form.highestRank.division == null ||
            form.map == null ||
            form.heroBans.length == 0 ||
            form.duration == null
        }>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
