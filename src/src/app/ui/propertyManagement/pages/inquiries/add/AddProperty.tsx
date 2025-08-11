"use client"
import React, {useState, ChangeEvent, useCallback, useMemo} from "react";
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
import {SmartGroup, useSmartAgent} from "smart-ui";
import AddInquiryHeader from "@/app/ui/propertyManagement/pages/inquiries/components/AddInquiryHeader";
import {addProperty} from "@/lib/db/database";
import {useSurveyManager} from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import {AdditionalInfoType, propertyTypes} from "@/app/ui/propertyManagement/pages/inquiries/types/properties";
import {countryOptions} from "@/app/ui/propertyManagement/pages/inquiries/types/properties";
import {useSnackbar} from "@/app/ui/providers/SnackbarProvider";

const emptyFormData = {
    name: "",
    description: "",
    street: "",
    houseNumber: "",
    city: "",
    postalCode: "",
    country: "",
    type: "",
    numBeds: "",
    numBathrooms: "",
    area: "",
    pricePerNight: "",
    additionalInfo: {
        kitchen: false,
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
    numBeds: false,
    numBathrooms: false,
    area: false,
    pricePerNight: false,
};

export default function AddProperty() {
    const [formData, setFormData] = useState(emptyFormData);
    const [errors, setErrors] = useState(emptyErrors);
    const {handleChangeApproval} = useSmartAgent();
    const {addData} = useSurveyManager();
    const {error, success} = useSnackbar();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        handleValueChange(value, name);
    }

    const handleValueChange = useCallback((value: string, name: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: false,
        }));
    }, []);

    const resetRadios = useCallback((value: string) => {
        handleValueChange(value, "type");
    }, [handleValueChange]);

    const handleAdditionalInfoChange = (event: ChangeEvent<HTMLInputElement>) => {
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
            numBeds: formData.numBeds === "",
            numBathrooms: formData.numBathrooms === "",
            area: formData.area === "",
            pricePerNight: formData.pricePerNight === "",
        };
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => error);
        if (!hasErrors) {
            const additionalInfoList = Object.keys(formData.additionalInfo).filter((key) => formData.additionalInfo[key as AdditionalInfoType]);

            const propertyData = {
                ...formData,
                numBeds: Number(formData.numBeds),
                numBathrooms: Number(formData.numBathrooms),
                area: Number(formData.area),
                pricePerNight: Number(formData.pricePerNight),
                additionalInfo: additionalInfoList,
            };
            try {
                await handleChangeApproval(true);
                await addProperty(propertyData);
                addData();
                setFormData(emptyFormData);
                setErrors(emptyErrors);
                success("Erfolgreich hinzugefügt", "Immobilie wurde hinzugefügt")
            } catch {
                error();
            }
        }
    };

    return (
        <Grid container spacing={4}>
            <Grid size={{ xs: 12 }}>
                <AddInquiryHeader title="Immobilien" titleContent="Neue Immobilie hinzufügen" />
            </Grid>
            {/* Property Information Section */}
            <Grid container spacing={2} size={{ xs: 12 }}>
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
            <Grid container spacing={2}>
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
                <Grid size={{ xs: 12 }}>
                    <SmartAutocomplete
                        options={countryOptions}
                        smartSemantic="Land"
                        value={useMemo(() => countryOptions.find((option) => option.value === formData.country) || null, [formData.country])}
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
            <Grid container spacing={2}>
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
                            onResetRadios={resetRadios}
                            name="type"
                        >
                            {propertyTypes.map((property) => (
                                <FormControlLabel key={property.value} value={property.value} control={<SmartRadio id={property.value} />} label={property.label} />
                            ))}
                        </SmartRadioGroup>
                        {errors.type && <FormHelperText>Immobilienart ist erforderlich</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SmartTextField
                        variant="filled"
                        label="Anzahl Betten"
                        fullWidth
                        type="number"
                        required
                        name="numBeds"
                        value={formData.numBeds}
                        onChange={handleChange}
                        error={errors.numBeds}
                        helperText={errors.numBeds ? "Anzahl Betten ist erforderlich" : ""}
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
                <Grid size={{ xs: 12 }}>
                    <SmartGroup smartSemantic="amenities">
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <SmartCheckbox
                                        checked={formData.additionalInfo.kitchen}
                                        onChange={handleAdditionalInfoChange}
                                        id="kitchen"
                                        name="kitchen"
                                    />
                                }
                                label="Küche"
                            />
                            <FormControlLabel
                                control={
                                    <SmartCheckbox
                                        checked={formData.additionalInfo.wifi}
                                        onChange={handleAdditionalInfoChange}
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
                                        onChange={handleAdditionalInfoChange}
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
                                        onChange={handleAdditionalInfoChange}
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
                                        onChange={handleAdditionalInfoChange}
                                        name="parking"
                                    />
                                }
                                label="Parkplatz"
                            />
                            <FormControlLabel
                                control={
                                    <SmartCheckbox
                                        checked={formData.additionalInfo.petFriendly}
                                        onChange={handleAdditionalInfoChange}
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
    );
}