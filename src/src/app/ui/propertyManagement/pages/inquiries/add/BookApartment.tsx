"use client"
import React, {useState, ChangeEvent, useMemo} from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import SmartTextField from "@/app/ui/components/SmartTextField";
import SmartAutocomplete from "@/app/ui/components/SmartAutocomplete";
import TextField from '@mui/material/TextField';
import AddInquiryHeader from "@/app/ui/propertyManagement/pages/inquiries/components/AddInquiryHeader";
import { addBooking } from "@/lib/db/database";
import {useSmartAgent} from "smart-ui";
import {useSurveyManager} from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import {propertyOptions} from "@/app/ui/propertyManagement/pages/inquiries/types/properties";
import {countryOptions} from "@/app/ui/propertyManagement/pages/inquiries/types/common";

    const emptyFormData = {
        name: "",
        surname: "",
        phoneNumber: "",
        eMail: "",
        street: "",
        houseNumber: "",
        city: "",
        postalCode: "",
        country: "",
        bookingStart: "",
        bookingEnd: "",
        numAdults: "",
        numChildren: "",
        property: "",
    };

    const emptyErrors = {
        name: false,
        surname: false,
        phoneNumber: false,
        eMail: false,
        street: false,
        houseNumber: false,
        city: false,
        postalCode: false,
        country: false,
        bookingStart: false,
        bookingEnd: false,
        numAdults: false,
        numChildren: false,
        property: false,
    };

export default function BookApartment() {
    const [formData, setFormData] = useState(emptyFormData);
    const [errors, setErrors] = useState(emptyErrors);
    const {handleChangeApproval} = useSmartAgent();
    const {addData} = useSurveyManager();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        handleValueChange(value, name);
    };

    const handleValueChange = (value: string, name: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: false,
        }));
    };

    const handleSubmit = async () => {
        const newErrors = {
            name: formData.name === "",
            surname: formData.surname === "",
            phoneNumber: formData.phoneNumber === "",
            eMail: formData.eMail === "",
            street: formData.street === "",
            houseNumber: formData.houseNumber === "",
            city: formData.city === "",
            postalCode: formData.postalCode === "",
            country: formData.country === "",
            bookingStart: formData.bookingStart === "",
            bookingEnd: formData.bookingEnd === "",
            numAdults: formData.numAdults === "",
            numChildren: formData.numChildren === "",
            property: formData.property === "",
        };
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error);
        if (!hasErrors) {
            const bookingData = {
                ...formData,
                bookingStart: new Date(formData.bookingStart),
                bookingEnd: new Date(formData.bookingEnd),
                numAdults: Number(formData.numAdults),
                numChildren: Number(formData.numChildren),
            };
            await handleChangeApproval(true);
            await addBooking(bookingData);
            addData();
            setFormData(emptyFormData);
            setErrors(emptyErrors);
        }
    };

    return (
        <Grid container spacing={4}>
            <Grid size={{ xs: 12 }}>
                <AddInquiryHeader title="Buchungen" titleContent="Neue Buchung hinzufügen"/>
            </Grid>
            {/* Personal Information Section */}
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Persönliche Informationen
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SmartTextField
                        variant="filled"
                        label="Name"
                        fullWidth
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        helperText={errors.name ? "Name ist erforderlich" : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
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
                <Grid size={{ xs: 12, md: 6 }}>
                    <SmartTextField
                        variant="filled"
                        label="Telefonnummer"
                        fullWidth
                        required
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        error={errors.phoneNumber}
                        helperText={errors.phoneNumber ? "Telefonnummer ist erforderlich" : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SmartTextField
                        variant="filled"
                        label="E-Mail"
                        fullWidth
                        required
                        name="eMail"
                        value={formData.eMail}
                        onChange={handleChange}
                        error={errors.eMail}
                        helperText={errors.eMail ? "E-Mail ist erforderlich" : ""}
                    />
                </Grid>
            </Grid>

            {/* Address Information Section */}
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle1">
                        Addressinformationen
                    </Typography>
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
                        label="Postleizahl"
                        fullWidth
                        required
                        name="postalCode"
                        type="number"
                        value={formData.postalCode}
                        onChange={handleChange}
                        error={errors.postalCode}
                        helperText={errors.postalCode ? "Postleizahl ist erforderlich" : ""}
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

            {/* Booking Details Section */}
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle1">
                        Buchungsinformationen
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <SmartAutocomplete
                        smartSemantic="Property this inquiry belongs to"
                        options={propertyOptions}
                        value={useMemo(() => propertyOptions.find(option => option.label === formData.property) || null, [formData.property])}
                        onChange={(_event, value) => handleValueChange(value?.label ?? "", "property")}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="filled"
                                label="Immobilie"
                                fullWidth
                                required
                                error={errors.property}
                                helperText={errors.property ? "Immobilie ist erforderlich" : ""}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SmartTextField
                        variant="filled"
                        label="Buchungsbeginn"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        required
                        name="bookingStart"
                        value={formData.bookingStart}
                        onChange={handleChange}
                        error={errors.bookingStart}
                        helperText={errors.bookingStart ? "Buchungsbeginn ist erforderlich" : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SmartTextField
                        variant="filled"
                        label="Buchungsende"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        required
                        name="bookingEnd"
                        value={formData.bookingEnd}
                        onChange={handleChange}
                        error={errors.bookingEnd}
                        helperText={errors.bookingEnd ? "Buchungsende ist erforderlich" : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SmartTextField
                        variant="filled"
                        label="Anzahl Erwachsene"
                        type="number"
                        fullWidth
                        required
                        name="numAdults"
                        value={formData.numAdults}
                        onChange={handleChange}
                        error={errors.numAdults}
                        helperText={errors.numAdults ? "Anzahl Erwachsene ist erforderlich" : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SmartTextField
                        variant="filled"
                        label="Anzahl Kinder"
                        type="number"
                        fullWidth
                        required
                        name="numChildren"
                        value={formData.numChildren}
                        onChange={handleChange}
                        error={errors.numChildren}
                        helperText={errors.numChildren ? "Anzahl Kinder ist erforderlich" : ""}
                    />
                </Grid>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Box display="flex" justifyContent="flex-end">
                    <Button variant="contained" onClick={handleSubmit}>Hinzufügen</Button>
                </Box>
            </Grid>
        </Grid>
    );
}