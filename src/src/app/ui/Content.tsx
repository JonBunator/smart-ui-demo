"use client"
import {SmartComponent, useSmartAgent, useSmartComponentManager} from "smart-ui"
import {useEffect, useState} from "react";
import SmartTextField from "@/app/ui/components/SmartTextField";
import SmartButton from "./components/SmartButton";
import SmartSelect from "./components/SmartSelect";
import SmartAutocomplete from "./components/SmartAutocomplete";
import {Autocomplete, FormControlLabel, Grid, MenuItem, RadioGroup, TextField, Typography} from "@mui/material";
import SmartCheckbox from "@/app/ui/components/SmartCheckbox";
import SmartRadio from "@/app/ui/components/SmartRadio";

type Animal = {
    label: string;
}
const favouriteAnimals: Animal[] = [
    {label: "Dog"},
    {label: "Cat"},
    {label: "Bird"}
]

export default function Content() {
    const {sendPrompt} = useSmartAgent();
    const {getHierarchy} = useSmartComponentManager();
    const [updateValue, setUpdateValue] = useState("I am Jonas and 24 years old. I am male and like sports and Rubik's Cubes.");

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [interests, setInterests] = useState({
        sports: false,
        music: false,
        reading: false,
        other: ""
    });
    const [animal, setAnimal] = useState<Animal|null>(null);
    useEffect(() => {
        console.log(animal)
    }, [animal]);
    return (
        <div style={{padding: "32px"}}>
            <Grid container spacing={2}>
                <SmartComponent>
                    <Grid size={2}>
                        <SmartTextField fullWidth label="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Grid>
                    <Grid size={2}>
                        <SmartTextField fullWidth type="number" id="age" label="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                    </Grid>
                    <Grid size={12}>
                        <SmartComponent id="gender">
                            <Typography>Gender:</Typography>
                            <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)}>
                                <FormControlLabel value="male" control={<SmartRadio id="gender-male" />} label="Male" />
                                <FormControlLabel value="female" control={<SmartRadio id="gender-female" />} label="Female" />
                                <FormControlLabel value="other" control={<SmartRadio id="gender-other" />} label="Other" />
                            </RadioGroup>
                        </SmartComponent>
                    </Grid>
                    <Grid size={12}>
                        <SmartComponent id="interests">
                            <Typography>Interests:</Typography>
                            <FormControlLabel control={<SmartCheckbox onClick={() => console.log("sports clicked")} id="interests-sports" checked={interests.sports} onChange={(e) => setInterests((prevInterests) => ({ ...prevInterests, sports: e.target.checked }))} />} label="Sports"/>
                            <FormControlLabel control={<SmartCheckbox onClick={() => console.log("music clicked")} id="interests-music" checked={interests.music} onChange={(e) => setInterests((prevInterests) => ({ ...prevInterests, music: e.target.checked }))} />} label="Music"/>
                            <FormControlLabel control={<SmartCheckbox onClick={() => console.log("reading clicked")} id="interests-reading" checked={interests.reading} onChange={(e) => setInterests((prevInterests) => ({ ...prevInterests, reading: e.target.checked }))} />} label="Reading"/>
                            <SmartTextField label="Other" id="interests-other" value={interests.other} onChange={(e) => setInterests((prevInterests) => ({ ...prevInterests, other: e.target.value }))} />
                        </SmartComponent>
                    </Grid>
                </SmartComponent>
                <Grid size={2}>
                    <SmartAutocomplete
                        id="favourite-animal"
                        fullWidth
                        options={favouriteAnimals}
                        value={animal}
                        onChange={(event: React.SyntheticEvent, newValue) => {
                            setAnimal(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Favourite animals" />}
                    />
                </Grid>
                <Grid size={6}>
                    <SmartButton variant="contained" id="smart-button" onClick={() => console.log("Test button was clicked")}>Test button</SmartButton>
                </Grid>
            </Grid>
            <br />
            <br />
            <textarea style={{ height: "400px", width: "100%", lineHeight: "12px" }} value={updateValue} onChange={(event) => setUpdateValue(event.target.value)} />
            <button onClick={() => sendPrompt(updateValue)}>Send</button>
            <button onClick={() => console.log(getHierarchy())}>Get hierarchy</button>
        </div>
    );
}