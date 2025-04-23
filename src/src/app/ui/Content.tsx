"use client"
import {SmartComponent, SmartInput, useSmartAgent, useSmartComponentManager} from "smart-ui"
import {useState} from "react";
import SmartTextField from "@/app/ui/components/SmartTextField";
import SmartButton from "./components/SmartButton";
import SmartSelect from "./components/SmartSelect";
import {FormControlLabel, MenuItem, RadioGroup} from "@mui/material";
import SmartCheckbox from "@/app/ui/components/SmartCheckbox";
import SmartRadio from "@/app/ui/components/SmartRadio";

export default function Content() {
    const {sendPrompt} = useSmartAgent();
    const {getHierarchy} = useSmartComponentManager();
    const [updateValue, setUpdateValue] = useState("I am Max and 25 years old. I am male and like to play hockey.");

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [interests, setInterests] = useState({
        sports: false,
        music: false,
        reading: false,
        other: ""
    });
    const [animals, setAnimals] = useState("dog");

    return (
        <>
            <SmartComponent>
                <SmartTextField label="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                <SmartTextField type="number" id="age" label="Age" value={age} onChange={(e) => setAge(e.target.value)} />

                <SmartComponent id="gender">
                    <div>
                        <p>Gender:</p>
                        <RadioGroup value={gender} onChange={(e) => setGender(e.target.value)}>
                            <FormControlLabel value="male" control={<SmartRadio id="gender-male" />} label="Male" />
                            <FormControlLabel value="female" control={<SmartRadio id="gender-female" />} label="Female" />
                            <FormControlLabel value="other" control={<SmartRadio id="gender-other" />} label="Other" />
                        </RadioGroup>
                    </div>
                </SmartComponent>

                <SmartComponent id="interests">
                    <div>
                        <p>Interests:</p>
                        <label htmlFor="interests-sports">Sports</label>
                        <SmartCheckbox onClick={() => console.log("sports clicked")} id="interests-sports" checked={interests.sports} onChange={(e) => setInterests((prevInterests) => ({ ...prevInterests, sports: e.target.checked }))} />

                        <label htmlFor="interests-music">Music</label>
                        <SmartCheckbox onClick={() => console.log("music clicked")} id="interests-music" checked={interests.music} onChange={(e) => setInterests((prevInterests) => ({ ...prevInterests, music: e.target.checked }))} />

                        <label htmlFor="interests-reading">Reading</label>
                        <SmartCheckbox onClick={() => console.log("reading clicked")} id="interests-reading" checked={interests.reading} onChange={(e) => setInterests((prevInterests) => ({ ...prevInterests, reading: e.target.checked }))} />

                        <label htmlFor="interests-other">Other</label>
                        <SmartTextField label="Other" id="interests-other" value={interests.other} onChange={(e) => setInterests((prevInterests) => ({ ...prevInterests, other: e.target.value }))} />
                    </div>
                </SmartComponent>
            </SmartComponent>
            <SmartSelect label="Favourite animal" id="favourite-animal" value={animals} onChange={(e) => setAnimals(e.target.value)}>
                <MenuItem value="dog">Dog</MenuItem>
                <MenuItem value="cat">Cat</MenuItem>
                <MenuItem value="bird">Bird</MenuItem>
            </SmartSelect>
            <SmartButton id="smart-button" onClick={() => console.log("Test button was clicked")}>Test button</SmartButton>
            <br />
            <br />
            <textarea style={{ height: "400px", width: "100%", lineHeight: "12px" }} value={updateValue} onChange={(event) => setUpdateValue(event.target.value)} />
            <button onClick={() => sendPrompt(updateValue)}>Send</button>
            <button onClick={() => console.log(getHierarchy())}>Get hierarchy</button>
        </>
    );
}
