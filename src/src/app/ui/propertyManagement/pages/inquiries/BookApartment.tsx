"use client"
import { Grid, Typography } from "@mui/material";
import SmartTextField from "@/app/ui/components/SmartTextField";
import SmartAutocomplete from "@/app/ui/components/SmartAutocomplete";
import TextField from '@mui/material/TextField';
import SmartPasteButton from "@/app/ui/components/SmartPasteButton";

export default function BookApartment() {
    const linkedProperties = [
        { label: 'Property 1' },
        { label: 'Property 2' },
        { label: 'Property 3' },
    ];

    return (
        <Grid container spacing={8}>
            {/* Personal Information Section */}
            <Grid container spacing={4}>
                <Grid size={{ xs: 9}}>
                    <Typography variant="h5" gutterBottom>
                        Neue Buchung hinzufügen
                    </Typography>
                </Grid>
                <Grid size={{ xs: 3}}>
                    <SmartPasteButton>Einfügen</SmartPasteButton>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h6" gutterBottom>
                        Persönliche Informationen
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SmartTextField variant="filled" label="Vorname" fullWidth />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SmartTextField variant="filled" label="Nachname" fullWidth />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SmartTextField variant="filled" label="Telefonnummer" fullWidth />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SmartTextField variant="filled" label="E-Mail" fullWidth />
                </Grid>
            </Grid>

            {/* Address Information Section */}
            <Grid container spacing={4}>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h6">
                        Addressinformationen
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                    <SmartTextField variant="filled" label="Straße" fullWidth />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <SmartTextField variant="filled" label="Hausnummer" fullWidth type="number"/>
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                    <SmartTextField variant="filled" label="Stadt" fullWidth />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <SmartTextField variant="filled" label="Postleizahl" fullWidth type="number" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SmartTextField variant="filled" label="Land" fullWidth />
                </Grid>
            </Grid>

            {/* Booking Details Section */}
            <Grid container spacing={4}>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h6">
                        Buchungsinformationen
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SmartTextField variant="filled" label="Ankunftsdatum" type="date" InputLabelProps={{ shrink: true }} fullWidth />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SmartTextField variant="filled" label="Abreisedatum" type="date" InputLabelProps={{ shrink: true }} fullWidth />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SmartTextField variant="filled" label="Anzahl Erwachsene" type="number" fullWidth />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SmartTextField variant="filled" label="Anzahl Kinder" type="number" fullWidth />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SmartAutocomplete
                        smartSemantic="Property this inquiry belongs to"
                        options={linkedProperties}
                        renderInput={(params) => <TextField {...params} variant="filled" label="Verlinkte Immobilie" fullWidth />}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}