"use client"
import React, { useState } from "react";
import {
    Grid,
    Typography,
    FormControl,
    FormLabel, TextField, FormControlLabel,
} from "@mui/material";
import SmartTextField from "@/app/ui/components/SmartTextField";
import SmartAutocomplete from "@/app/ui/components/SmartAutocomplete";
import SmartRadioGroup from "@/app/ui/components/radio/SmartRadioGroup";
import SmartRadio from "@/app/ui/components/radio/SmartRadio";

export default function AddMaintenance() {
    // Sample state management for form fields, adjust based on your needs.
    const [contactInfo, setContactInfo] = useState({
        firstName: "",
        surname: "",
        email: "",
    });

    const [urgency, setUrgency] = useState("");
    const [description, setDescription] = useState("");
    const [locationSpecific, setLocationSpecific] = useState("");

    const propertyOptions = [
        { label: "Villa Sunshine", id: "v1" },
        { label: "Mountain Retreat", id: "v2" },
        { label: "Beachside Bungalow", id: "v3" },
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

    return (
        <Grid container spacing={8}>
            {/* Contact Information */}
            <Grid container spacing={4}>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h6">Kontaktinformationen</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <SmartTextField
                        variant="filled"
                        label="Vorname"
                        fullWidth
                        value={contactInfo.firstName}
                        onChange={(e) =>
                            setContactInfo({ ...contactInfo, firstName: e.target.value })
                        }
                        required
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <SmartTextField
                        variant="filled"
                        label="Nachname"
                        fullWidth
                        value={contactInfo.surname}
                        onChange={(e) =>
                            setContactInfo({ ...contactInfo, surname: e.target.value })
                        }
                        required
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 12 }}>
                    <SmartTextField
                        variant="filled"
                        label="E-Mail"
                        fullWidth
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) =>
                            setContactInfo({ ...contactInfo, email: e.target.value })
                        }
                        required
                    />
                </Grid>
            </Grid>

            {/* Details */}
            <Grid container spacing={4}>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h6">Details</Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <SmartAutocomplete
                        options={propertyOptions}
                        smartSemantic="property"
                        fullWidth
                        renderInput={(params) => (
                            <TextField variant="filled" {...params} label="Immobilie" fullWidth  />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <SmartAutocomplete
                        options={categoryOptions}
                        smartSemantic="incident category"
                        renderInput={(params) => (
                            <TextField variant="filled" {...params} label="Kategorie" fullWidth />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Dringlichkeit</FormLabel>
                        <SmartRadioGroup
                            row
                            value={urgency}
                            onChange={(e) => setUrgency(e.target.value)}
                            smartSemantic="how urgent the maintenace is"
                        >
                            {urgencyOptions.map((option) => (
                                <FormControlLabel key={option.value} value={option.value} control={<SmartRadio id={option.value} />} label={option.label} />
                            ))}
                        </SmartRadioGroup>
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <SmartTextField
                        variant="filled"
                        label="Beschreibung"
                        fullWidth
                        value={description}
                        multiline
                        rows={5}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 12 }}>
                    <SmartTextField
                        variant="filled"
                        label="Ortsspezifische Angaben (z.B. Küche, Badezimmer)"
                        fullWidth
                        value={locationSpecific}
                        onChange={(e) => setLocationSpecific(e.target.value)}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}