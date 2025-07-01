"use client"
import React, { useState, ChangeEvent } from "react";
import {
    Grid,
    Typography,
    FormControl,
    FormLabel, TextField, FormControlLabel,
    FormHelperText,
    Box
} from "@mui/material";
import SmartTextField from "@/app/ui/components/SmartTextField";
import SmartAutocomplete from "@/app/ui/components/SmartAutocomplete";
import SmartRadioGroup from "@/app/ui/components/radio/SmartRadioGroup";
import SmartRadio from "@/app/ui/components/radio/SmartRadio";
import SmartButton from "@/app/ui/components/SmartButton";
import AddInquiryHeader from "@/app/ui/propertyManagement/pages/inquiries/components/AddInquiryHeader";
import {addMaintenance} from "@/lib/db/database";
import {useSmartAgent} from "smart-ui";
import {useSurveyManager} from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";

const propertyOptions = [
    {label: "Nordseeparadies"},
    {label: "Alpenblick"},
    {label: "Seeblick"},
    {label: "Bergpanorama"},
    {label: "Waldblick"},
    {label: "Stadtvilla"},
    {label: "Landhaus"},
    {label: "Strandresort"},
    {label: "Bergchalet"},
    {label: "Ferienoase"},
];

const categoryOptions = [
    { label: "Klempnerarbeit", value: "plumbing" },
    { label: "Elektrik", value: "electrical" },
    { label: "HVAC", value: "hvac" },
    { label: "Gebäude", value: "structural" },
    { label: "Garten", value: "garden" },
    { label: "Möbel", value: "furniture" },
];

const urgencyOptions = [
    { label: "Niedrig", value: "low" },
    { label: "Mittel", value: "medium" },
    { label: "Hoch", value: "high" },
];

const emptyFormData = {
    name: "",
    surname: "",
    eMail: "",
    property: "",
    category: "",
    urgency: "",
    description: "",
    location: "",
};

const emptyErrors = {
    name: false,
    surname: false,
    eMail: false,
    property: false,
    category: false,
    urgency: false,
    description: false,
    location: false,
}

export default function AddMaintenance() {
    const [formData, setFormData] = useState(emptyFormData);
    const [errors, setErrors] = useState(emptyErrors);
    const {handleChangeApproval} = useSmartAgent();
    const {addData} = useSurveyManager();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        handleValueChange(value, name);
    }

    const handleValueChange = (value: string, name: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: false,
        }));
    }

    const handleSubmit = async () => {
        const newErrors = {
            name: formData.name === "",
            surname: formData.surname === "",
            eMail: formData.eMail === "",
            property: formData.property === "",
            category: formData.category === "",
            urgency: formData.urgency === "",
            description: formData.description === "",
            location: formData.location === "",
        };
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error);
        if (!hasErrors) {
            await handleChangeApproval(true);
            await addMaintenance(formData);
            addData();
            setFormData(emptyFormData);
            setErrors(emptyErrors);
        }
    };

    return (
        <Grid container spacing={4}>
            <Grid size={{ xs: 12 }}>
                <AddInquiryHeader titleContent="Neue Instandhaltung hinzufügen"/>
            </Grid>
            {/* Contact Information */}
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle1">Kontaktinformationen</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <SmartTextField
                        variant="filled"
                        label="Vorname"
                        fullWidth
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        helperText={errors.name ? "Vorname ist erforderlich" : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <SmartTextField
                        variant="filled"
                        label="Nachname"
                        fullWidth
                        required
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        error={errors.surname}
                        helperText={errors.surname ? "Nachname ist erforderlich" : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 12 }}>
                    <SmartTextField
                        variant="filled"
                        label="E-Mail"
                        fullWidth
                        type="email"
                        required
                        name="eMail"
                        value={formData.eMail}
                        onChange={handleChange}
                        error={errors.eMail}
                        helperText={errors.eMail ? "E-Mail ist erforderlich" : ""}
                    />
                </Grid>
            </Grid>

            {/* Details */}
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle1">Details</Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <SmartAutocomplete
                        options={propertyOptions}
                        smartSemantic="property"
                        fullWidth
                        value={propertyOptions.find(option => option.label === formData.property) || null}
                        onChange={(_event, value) => handleValueChange(value?.label ?? "", "property")}
                        renderInput={(params) => (
                            <TextField
                                required
                                variant="filled"
                                {...params}
                                label="Immobilie"
                                fullWidth
                                error={errors.property}
                                helperText={errors.property ? "Immobilie ist erforderlich" : ""}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <SmartAutocomplete
                        options={categoryOptions}
                        smartSemantic="incident category"
                        value={categoryOptions.find(option => option.value === formData.category) || null}
                        onChange={(_event, value) => handleValueChange(value?.value ?? "", "category")}
                        renderInput={(params) => (
                            <TextField
                                required
                                variant="filled"
                                {...params}
                                label="Kategorie"
                                fullWidth
                                error={errors.category}
                                helperText={errors.category ? "Kategorie ist erforderlich" : ""}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl component="fieldset" required error={errors.urgency}>
                        <FormLabel component="legend">Dringlichkeit</FormLabel>
                        <SmartRadioGroup
                            row
                            smartSemantic="how urgent the maintenance is"
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                        >
                            {urgencyOptions.map((option) => (
                                <FormControlLabel key={option.value} value={option.value} control={<SmartRadio id={option.value} />} label={option.label} />
                            ))}
                        </SmartRadioGroup>
                        {errors.urgency && <FormHelperText>Dringlichkeit ist erforderlich</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <SmartTextField
                        variant="filled"
                        label="Beschreibung"
                        fullWidth
                        multiline
                        rows={5}
                        required
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        error={errors.description}
                        helperText={errors.description ? "Beschreibung ist erforderlich" : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 12 }}>
                    <SmartTextField
                        variant="filled"
                        label="Ortsspezifische Angaben (z.B. Küche, Badezimmer)"
                        fullWidth
                        required
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        error={errors.location}
                        helperText={errors.location ? "Ortsspezifische Angaben sind erforderlich" : ""}
                    />
                </Grid>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Box display="flex" justifyContent="flex-end">
                    <SmartButton smartSemantic="adds new maintenance" variant="contained" onClick={handleSubmit}>Hinzufügen</SmartButton>
                </Box>
            </Grid>
        </Grid>
    );
}