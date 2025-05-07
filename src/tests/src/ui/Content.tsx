import SmartTextField from "../../../src/app/ui/components/SmartTextField.tsx";
import {useState} from "react";
import {FormControlLabel, TextField} from "@mui/material";
import SmartRadio from "../../../src/app/ui/components/SmartRadio.tsx";
import SmartCheckbox from "../../../src/app/ui/components/SmartCheckbox.tsx";
import SmartRadioGroup from "../../../src/app/ui/components/SmartRadioGroup.tsx";
import SmartAutocomplete from "../../../src/app/ui/components/SmartAutocomplete.tsx";
import SmartButton from "../../../src/app/ui/components/SmartButton.tsx";
import Agent from "./Agent.tsx";

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
    const [gender, setGender] = useState("");
    const [sport, setSport] = useState(false)
    const [animal, setAnimal] = useState<Animal|null>(null);
    const [toggleState, setToggleState] = useState(false);

  return (
    <div>
        <SmartTextField fullWidth label="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <SmartRadioGroup row value={gender} onChange={(e) => setGender(e.target.value)}>
            <FormControlLabel className="gender-male-label" value="male" control={<SmartRadio id="gender-male" />} label="Male" />
            <FormControlLabel className="gender-female-label" value="female" control={<SmartRadio id="gender-female" />} label="Female" />
            <FormControlLabel className="gender-other-label" value="other" control={<SmartRadio id="gender-other" />} label="Other" />
        </SmartRadioGroup>
        <FormControlLabel className="interests-sports-label" control={<SmartCheckbox id="interests-sports" checked={sport} onChange={(e) => setSport(e.target.checked)} />} label="Sports"/>
        <SmartAutocomplete
            id="favourite-animal"
            className="favourite-animal"
            fullWidth
            options={favouriteAnimals}
            value={animal}
            onChange={(_event: React.SyntheticEvent, newValue) => {
                setAnimal(newValue)
            }}
            renderInput={(params) => <TextField {...params} label="Favourite animal" />}
        />
        <SmartButton variant="contained" id="toggle-button" onClick={() => setToggleState(!toggleState)}>Toggle state</SmartButton>
        <div id="toggle-state">{toggleState ? "On" : "Off"}</div>
        <Agent/>
    </div>
  )
}