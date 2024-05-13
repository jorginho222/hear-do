import './App.css'
import {Button, List, ListItemText, ListSubheader, Stack, Switch} from "@mui/material";
import {useEffect, useRef, useState} from "react";

function App() {
    const [playing, setPlaying] = useState(false)
    const audiosList = useRef([])
    const audio = new Audio('/Glockenspiel.mp3');
    const intervalRef = useRef(setInterval(() => {
    }, 0))

    // audio.load();
    useEffect(() => {
        clearInterval(intervalRef.current);
    }, [])

    const play = () => {
        setPlaying(true)
        intervalRef.current = setInterval(() => {
            audio.play();
        }, (Math.floor(Math.random() * 10) + 1) * 1000);
    }

    const stop = () => {
        setPlaying(false)
        clearInterval(intervalRef.current);
    }

    return (
        <>
            <List
                sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Sonidos
                    </ListSubheader>
                }
            >
                <ListItemText primary="Glockenspiel.mp3" />
                <Switch />
                <ListItemText primary="Glockenspiel.mp3" />
            </List>

            <Stack direction="row" spacing={2}>
                <Button
                    color="success"
                    variant="contained"
                    onClick={play}
                >
                    Play
                </Button>
                <Button
                    color="error"
                    variant="contained"
                    onClick={stop}
                >
                    Stop
                </Button>
            </Stack>
        </>
    )
}

export default App
