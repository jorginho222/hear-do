import './App.css'
import {Box, Button, ListItemText, Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import LaptopIcon from '@mui/icons-material/Laptop';

function App() {
    const [playing, setPlaying] = useState(false)
    const audiosList: Array<{ key: string, name: string, src: string }> = useRef([
        {key: 'glock', name: 'Glockenspiel1', src: '/Glockenspiel.mp3'},
        {key: 'glock2', name: 'Glockenspiel2', src: '/Glockenspiel.mp3'},
        {key: 'glock3', name: 'Glockenspiel3', src: '/Glockenspiel.mp3'},
    ])
    const [selectedAudios, setSelectedAudios] = useState(['glock'])
    const intervalRef = useRef(setInterval(() => {}, 0))

    const handleSelectedAudios = (event: React.MouseEvent<HTMLElement>, newAudios: Array<string>) => {
            setSelectedAudios(newAudios)
    }

    // audioPath.load();
    useEffect(() => {
        clearInterval(intervalRef.current);
    }, [])

    const play = () => {
        setPlaying(true)
        intervalRef.current = setInterval(() => {
            const randomSelected: string = selectedAudios[Math.floor(Math.random() * selectedAudios.length)]
            const randomAudio = audiosList.current.find((audio: { key: string, name: string, src: string }) => audio.key === randomSelected)
            const randomAudioInstance = new Audio(randomAudio.src)

            console.log(randomSelected)
            randomAudioInstance.play();
        }, (Math.floor(Math.random() * 6) + 1) * 1000);
    }

    const stop = () => {
        setPlaying(false)
        clearInterval(intervalRef.current);
    }

    return (
        <>
            <ToggleButtonGroup
                orientation="vertical"
                value={selectedAudios}
                onChange={handleSelectedAudios}
                aria-label="audio"
            >
                {audiosList.current.map((audio: { key: string, name: string, src: string }, index: number) => (
                    <ToggleButton key={index} value={audio.key} sx={{marginTop: '5px'}}>
                        <LaptopIcon/>
                        <ListItemText primary={audio.name}/>
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
            <Box sx={{marginTop: '20px'}}>
                <Stack direction="row" spacing={2}>
                    <Button
                        color="success" variant="contained"
                        disabled={playing || selectedAudios.length === 0}
                        onClick={play}
                    >
                        Play
                    </Button>
                    <Button
                        color="error" variant="contained"
                        disabled={!playing}
                        onClick={stop}
                    >
                        Stop
                    </Button>
                </Stack>
            </Box>
        </>
    )
}

export default App
