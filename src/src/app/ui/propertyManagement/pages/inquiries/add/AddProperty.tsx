"use client"
import React, { useState, ChangeEvent } from "react";
import {
    Grid,
    Typography,
    FormControlLabel,
    FormGroup,
    FormControl,
    FormLabel,
    TextField,
    Button,
    Box, FormHelperText,
} from "@mui/material";
import SmartTextField from "@/app/ui/components/SmartTextField";
import SmartAutocomplete from "@/app/ui/components/SmartAutocomplete";
import SmartCheckbox from "@/app/ui/components/SmartCheckbox";
import SmartRadioGroup from "@/app/ui/components/radio/SmartRadioGroup";
import SmartRadio from "@/app/ui/components/radio/SmartRadio";
import { SmartGroup } from "smart-ui";
import AddInquiryHeader from "@/app/ui/propertyManagement/pages/inquiries/components/AddInquiryHeader";
import { addProperty } from "@/lib/db/database";

const countryOptions = [
    { label: "Deutschland", value: "Deutschland" },
    { label: "Österreich", value: "Österreich" },
    { label: "Schweiz", value: "Schweiz" },
];

type AdditionalInfoType = "wifi" | "pool" | "airConditioning" |  "parking" | "petFriendly";

const emptyFormData = {
    name: "",
    description: "",
    street: "",
    houseNumber: "",
    city: "",
    postalCode: "",
    country: "",
    type: "",
    numBedrooms: "",
    numBathrooms: "",
    numMaximumGuests: "",
    area: "",
    pricePerNight: "",
    deposit: "",
    additionalInfo: {
        wifi: false,
        pool: false,
        airConditioning: false,
        parking: false,
        petFriendly: false,
    },
};

const emptyErrors = {
    name: false,
    description: false,
    street: false,
    houseNumber: false,
    city: false,
    postalCode: false,
    country: false,
    type: false,
    numBedrooms: false,
    numBathrooms: false,
    numMaximumGuests: false,
    area: false,
    pricePerNight: false,
    deposit: false,
};

export default function AddProperty() {
    const [formData, setFormData] = useState(emptyFormData);
    const [errors, setErrors] = useState(emptyErrors);

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

    const handleAditionalInfoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            additionalInfo: {
                ...prev.additionalInfo,
                [event.target.name]: event.target.checked,
            },
        }));
    };

    const handleSubmit = async () => {
        const newErrors = {
            name: formData.name === "",
            description: formData.description === "",
            street: formData.street === "",
            houseNumber: formData.houseNumber === "",
            city: formData.city === "",
            postalCode: formData.postalCode === "",
            country: formData.country === "",
            type: formData.type === "",
            numBedrooms: formData.numBedrooms === "",
            numBathrooms: formData.numBathrooms === "",
            numMaximumGuests: formData.numMaximumGuests === "",
            area: formData.area === "",
            pricePerNight: formData.pricePerNight === "",
            deposit: formData.deposit === "",
        };
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => error);
        if (!hasErrors) {
            const additionalInfoList = Object.keys(formData.additionalInfo).filter((key) => formData.additionalInfo[key as AdditionalInfoType]);

            const propertyData = {
                ...formData,
                numBedrooms: Number(formData.numBedrooms),
                numBathrooms: Number(formData.numBathrooms),
                numMaximumGuests: Number(formData.numMaximumGuests),
                area: Number(formData.area),
                pricePerNight: Number(formData.pricePerNight),
                deposit: Number(formData.deposit),
                additionalInfo: additionalInfoList,
            };

            await addProperty(propertyData);
            setFormData(emptyFormData);
            setErrors(emptyErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={8}>
                <Grid size={{ xs: 12 }}>
                    <AddInquiryHeader titleContent="Neue Immobilie hinzufügen" />
                </Grid>
                {/* Property Information Section */}
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle1">Immobilien Informationen</Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <SmartTextField
                            variant="filled"
                            label="Titel der Immobilie"
                            fullWidth
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                            helperText={errors.name ? "Titel ist erforderlich" : ""}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <SmartTextField
                            variant="filled"
                            label="Beschreibung"
                            fullWidth
                            multiline
                            rows={3}
                            required
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            error={errors.description}
                            helperText={errors.description ? "Beschreibung ist erforderlich" : ""}
                        />
                    </Grid>
                </Grid>
                {/* Address Information Section */}
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle1">Adressinformationen</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <SmartTextField
                            variant="filled"
                            label="Straße"
                            fullWidth
                            required
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            error={errors.street}
                            helperText={errors.street ? "Straße ist erforderlich" : ""}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <SmartTextField
                            variant="filled"
                            label="Hausnummer"
                            fullWidth
                            type="number"
                            required
                            name="houseNumber"
                            value={formData.houseNumber}
                            onChange={handleChange}
                            error={errors.houseNumber}
                            helperText={errors.houseNumber ? "Hausnummer ist erforderlich" : ""}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <SmartTextField
                            variant="filled"
                            label="Stadt"
                            fullWidth
                            required
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            error={errors.city}
                            helperText={errors.city ? "Stadt ist erforderlich" : ""}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <SmartTextField
                            variant="filled"
                            label="Postleitzahl"
                            fullWidth
                            type="number"
                            required
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            error={errors.postalCode}
                            helperText={errors.postalCode ? "Postleitzahl ist erforderlich" : ""}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <SmartAutocomplete
                            options={countryOptions}
                            smartSemantic="Land"
                            value={countryOptions.find((option) => option.value === formData.country) || null}
                            onChange={(_event, value) => handleValueChange(value?.value ?? "", "country")}
                            renderInput={(params) => (
                                <TextField
                                    variant="filled"
                                    {...params}
                                    label="Land"
                                    fullWidth
                                    required
                                    error={errors.country}
                                    helperText={errors.country ? "Land ist erforderlich" : ""}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                {/* Property Details Section */}
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle1">Immobilien Details</Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <FormControl component="fieldset" fullWidth required error={errors.type}>
                            <FormLabel component="legend">Immobilienart</FormLabel>
                            <SmartRadioGroup
                                row
                                value={formData.type}
                                smartSemantic="property type"
                                onChange={handleChange}
                                name="type"
                            >
                                <FormControlLabel value="villa" control={<SmartRadio id="villa" />} label="Villa" />
                                <FormControlLabel value="apartment" control={<SmartRadio id="apartment" />} label="Apartment" />
                                <FormControlLabel value="cabin" control={<SmartRadio id="cabin" />} label="Hütte" />
                                <FormControlLabel value="beachHouse" control={<SmartRadio id="beach-house" />} label="Strandhaus" />
                            </SmartRadioGroup>
                            {errors.type && <FormHelperText>Immobilienart ist erforderlich</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <SmartTextField
                            variant="filled"
                            label="Anzahl Schlafzimmer"
                            fullWidth
                            type="number"
                            required
                            name="numBedrooms"
                            value={formData.numBedrooms}
                            onChange={handleChange}
                            error={errors.numBedrooms}
                            helperText={errors.numBedrooms ? "Anzahl Schlafzimmer ist erforderlich" : ""}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <SmartTextField
                            variant="filled"
                            label="Anzahl Badezimmer"
                            fullWidth
                            type="number"
                            required
                            name="numBathrooms"
                            value={formData.numBathrooms}
                            onChange={handleChange}
                            error={errors.numBathrooms}
                            helperText={errors.numBathrooms ? "Anzahl Badezimmer ist erforderlich" : ""}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <SmartTextField
                            variant="filled"
                            label="Maximale Gäste"
                            fullWidth
                            type="number"
                            required
                            name="numMaximumGuests"
                            value={formData.numMaximumGuests}
                            onChange={handleChange}
                            error={errors.numMaximumGuests}
                            helperText={errors.numMaximumGuests ? "Maximale Gäste ist erforderlich" : ""}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <SmartTextField
                            variant="filled"
                            label="Fläche (m²)"
                            fullWidth
                            type="number"
                            required
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            error={errors.area}
                            helperText={errors.area ? "Fläche ist erforderlich" : ""}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <SmartTextField
                            variant="filled"
                            label="Preis pro Nacht (€)"
                            fullWidth
                            type="number"
                            required
                            name="pricePerNight"
                            value={formData.pricePerNight}
                            onChange={handleChange}
                            error={errors.pricePerNight}
                            helperText={errors.pricePerNight ? "Preis pro Nacht ist erforderlich" : ""}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <SmartTextField
                            variant="filled"
                            label="Kaution (€)"
                            fullWidth
                            type="number"
                            required
                            name="deposit"
                            value={formData.deposit}
                            onChange={handleChange}
                            error={errors.deposit}
                            helperText={errors.deposit ? "Kaution ist erforderlich" : ""}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <SmartGroup smartSemantic="amenities">
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <SmartCheckbox
                                            checked={formData.additionalInfo.wifi}
                                            onChange={handleAditionalInfoChange}
                                            id="wifi"
                                            name="wifi"
                                        />
                                    }
                                    label="WLAN"
                                />
                                <FormControlLabel
                                    control={
                                        <SmartCheckbox
                                            checked={formData.additionalInfo.pool}
                                            onChange={handleAditionalInfoChange}
                                            id="pool"
                                            name="pool"
                                        />
                                    }
                                    label="Pool"
                                />
                                <FormControlLabel
                                    control={
                                        <SmartCheckbox
                                            checked={formData.additionalInfo.airConditioning}
                                            onChange={handleAditionalInfoChange}
                                            id="air-conditioning"
                                            name="airConditioning"
                                        />
                                    }
                                    label="Klimaanlage"
                                />
                                <FormControlLabel
                                    control={
                                        <SmartCheckbox
                                            id="parking"
                                            checked={formData.additionalInfo.parking}
                                            onChange={handleAditionalInfoChange}
                                            name="parking"
                                        />
                                    }
                                    label="Parkplatz"
                                />
                                <FormControlLabel
                                    control={
                                        <SmartCheckbox
                                            checked={formData.additionalInfo.petFriendly}
                                            onChange={handleAditionalInfoChange}
                                            id="pet-friendly"
                                            name="petFriendly"
                                        />
                                    }
                                    label="Haustierfreundlich"
                                />
                            </FormGroup>
                        </SmartGroup>
                    </Grid>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" onClick={handleSubmit}>
                            Hinzufügen
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
}