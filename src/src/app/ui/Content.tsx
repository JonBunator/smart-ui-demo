"use client"
import {SmartComponent} from "smart-ui"
import {useState} from "react";
import SmartTextField from "@/app/ui/components/SmartTextField";
import SmartButton from "./components/SmartButton";
import SmartAutocomplete from "./components/SmartAutocomplete";
import {FormControlLabel, Grid, TextField, Typography} from "@mui/material";
import SmartCheckbox from "@/app/ui/components/SmartCheckbox";
import SmartRadio from "@/app/ui/components/radio/SmartRadio";
import {SmartGroup} from "smart-ui";
import Agent from "./Agent";
import "./Content.scss"
import SmartRadioGroup from "@/app/ui/components/radio/SmartRadioGroup";

type Animal = {
    label: string;
}
const favouriteAnimals: Animal[] = [
    {label: "Dog"},
    {label: "Cat"},
    {label: "Bird"}
]

export default function Content() {
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

    return (
        <div className="content">
            <Grid container spacing={2}>
                <SmartGroup>
                    <Grid size={2}>
                        <SmartTextField fullWidth label="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Grid>
                    <Grid size={2}>
                        <SmartTextField fullWidth type="number" id="age" label="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                    </Grid>
                    <Grid size={12}>
                        <Typography>Gender:</Typography>
                        <SmartRadioGroup id="gender" row value={gender} onChange={(e) => setGender(e.target.value)}>
                            <FormControlLabel value="male" control={<SmartRadio id="gender-male" />} label="Male" />
                            <FormControlLabel value="female" control={<SmartRadio id="gender-female" />} label="Female" />
                            <FormControlLabel value="other" control={<SmartRadio id="gender-other" />} label="Other" />
                        </SmartRadioGroup>
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
                </SmartGroup>
                <Grid size={3}>
                    <SmartAutocomplete
                        id="favourite-animal"
                        fullWidth
                        options={favouriteAnimals}
                        value={animal}
                        onChange={(event: React.SyntheticEvent, newValue) => {
                            setAnimal(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} label="Favourite animal" />}
                    />
                </Grid>
                <Grid size={6}>
                    <SmartButton variant="contained" id="smart-button" onClick={() => console.log("Test button was clicked")}>Test button</SmartButton>
                </Grid>
            </Grid>
            <Agent/>
        </div>
    );
}