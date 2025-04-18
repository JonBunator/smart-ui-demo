"use client"
import {SmartComponent, SmartInput, SmartSelect, useSmartAgent} from "smart-ui"
import {useState} from "react";
import SmartTextField from "@/app/ui/components/SmartTextField";
import SmartButton from "./components/SmartButton";

export default function Content() {
    const {sendPrompt} = useSmartAgent();

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
                        <label htmlFor="gender-male">Male</label>
                        <SmartInput type="radio" id="gender-male" checked={gender === "male"} onChange={() => setGender("male")} />

                        <label htmlFor="gender-female">Female</label>
                        <SmartInput type="radio" id="gender-female" checked={gender === "female"} onChange={() => setGender("female")} />

                        <label htmlFor="gender-other">Other</label>
                        <SmartInput type="radio" id="gender-other" checked={gender === "other"} onChange={() => setGender("other")} />
                    </div>
                </SmartComponent>

                <SmartComponent id="interests">
                    <div>
                        <p>Interests:</p>
                        <label htmlFor="interests-sports">Sports</label>
                        <SmartInput onClick={() => console.log("sports clicked")} type="checkbox" id="interests-sports" checked={interests.sports} onChange={(e) => setInterests((prevInterests) => ({ ...prevInterests, sports: e.target.checked }))} />

                        <label htmlFor="interests-music">Music</label>
                        <SmartInput onClick={() => console.log("music clicked")} type="checkbox" id="interests-music" checked={interests.music} onChange={(e) => setInterests((prevInterests) => ({ ...prevInterests, music: e.target.checked }))} />

                        <label htmlFor="interests-reading">Reading</label>
                        <SmartInput onClick={() => console.log("reading clicked")} type="checkbox" id="interests-reading" checked={interests.reading} onChange={(e) => setInterests((prevInterests) => ({ ...prevInterests, reading: e.target.checked }))} />

                        <label htmlFor="interests-other">Other</label>
                        <SmartTextField label="Other" id="interests-other" value={interests.other} onChange={(e) => setInterests((prevInterests) => ({ ...prevInterests, other: e.target.value }))} />
                    </div>
                </SmartComponent>
            </SmartComponent>
            <SmartSelect id="favourite-animal" value={animals} onChange={(e) => setAnimals(e.target.value)}>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
            </SmartSelect>
            <SmartButton id="smart-button" onClick={() => console.log("Test button was clicked")}>Test button</SmartButton>
            <br />
            <br />
            <textarea style={{ height: "400px", width: "100%", lineHeight: "12px" }} value={updateValue} onChange={(event) => setUpdateValue(event.target.value)} />
            <button onClick={() => sendPrompt(updateValue)}>Send</button>
        </>
    );
}
