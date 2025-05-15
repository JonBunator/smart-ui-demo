"use client"
import React, { useState } from "react";
import {
  Grid,
  Typography,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,
    TextField,
} from "@mui/material";
import SmartTextField from "@/app/ui/components/SmartTextField";
import SmartAutocomplete from "@/app/ui/components/SmartAutocomplete";
import SmartCheckbox from "@/app/ui/components/SmartCheckbox";
import SmartRadioGroup from "@/app/ui/components/radio/SmartRadioGroup";
import SmartRadio from "@/app/ui/components/radio/SmartRadio";
import {SmartGroup} from "smart-ui";

export default function AddProperty() {
  // State for amenities checkboxes
  const [amenities, setAmenities] = useState({
    wifi: false,
    pool: false,
    airConditioning: false,
    parking: false,
    petFriendly: false,
  });

  const handleAmenityChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    setAmenities({
      ...amenities,
      [event.target.name]: event.target.checked,
    });
  };

  // State for property type using radio group
  const [propertyType, setPropertyType] = useState("");
  const handlePropertyTypeChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    setPropertyType(event.target.value);
  };

  // Sample data for Autocomplete field (e.g., countries)
  const countryOptions = [
    { label: "Deutschland", value: "Deutschland" },
    { label: "Österreich", value: "Österreich" },
    { label: "Schweiz", value: "Schweiz" },
  ];

  return (
    <Grid container spacing={8}>
    {/* Property Information Section */}
      <Grid container spacing={4}>
        <Grid size={{ xs: 12 }}>
            <Typography variant="h6">
                Immobilien Informationen
            </Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <SmartTextField variant="filled" label="Titel der Immobilie" fullWidth />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <SmartTextField variant="filled" label="Beschreibung" fullWidth multiline rows={3} />
        </Grid>
      </Grid>
      {/* Address Information Section */}
      <Grid container spacing={4}>
        <Grid size={{ xs: 12 }}>
            <Typography variant="h6">
                Adressinformationen
            </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <SmartTextField variant="filled" label="Straße" fullWidth />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SmartTextField variant="filled" label="Hausnummer" fullWidth type="number" />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <SmartTextField variant="filled" label="Stadt" fullWidth />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SmartTextField variant="filled" label="Postleitzahl" fullWidth type="number" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SmartAutocomplete
            options={countryOptions}
            smartSemantic="Land"
            renderInput={(params) => (
              <TextField variant="filled" {...params} label="Land" fullWidth />
            )}
          />
        </Grid>
      </Grid>

      {/* Property Details Section */}
      <Grid container spacing={4}>
        <Grid size={{ xs: 12}}>
            <Typography variant="h6">
                Immobilien Details
            </Typography>
        </Grid>
        <Grid size={{ xs: 12}}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Immobilienart</FormLabel>
            <SmartRadioGroup
              row
              value={propertyType}
              smartSemantic="property type"
              onChange={handlePropertyTypeChange}
            >
              <FormControlLabel value="villa" control={<SmartRadio id="villa"/>} label="Villa" />
              <FormControlLabel value="apartment" control={<SmartRadio id="apartment"/>} label="Apartment" />
              <FormControlLabel value="cabin" control={<SmartRadio id="cabin"/>} label="Hütte" />
              <FormControlLabel value="beachHouse" control={<SmartRadio id="beach-house"/>} label="Strandhaus" />
            </SmartRadioGroup>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SmartTextField variant="filled" label="Anzahl Schlafzimmer" fullWidth type="number" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SmartTextField variant="filled" label="Anzahl Badezimmer" fullWidth type="number" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SmartTextField variant="filled" label="Maximale Gäste" fullWidth type="number" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SmartTextField variant="filled" label="Fläche (m²)" fullWidth type="number" />
        </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
              <SmartTextField variant="filled" label="Preis pro Nacht (€)" fullWidth type="number" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
              <SmartTextField variant="filled" label="Kaution (€)" fullWidth type="number" />
          </Grid>
          <Grid size={{ xs: 12 }}>
              <SmartGroup smartSemantic="amenities">
                  <FormGroup row>
                      <FormControlLabel
                          control={
                              <SmartCheckbox
                                  checked={amenities.wifi}
                                  onChange={handleAmenityChange}
                                  id="wifi"
                              />
                          }
                          label="WLAN"
                      />
                      <FormControlLabel
                          control={
                              <SmartCheckbox
                                  checked={amenities.pool}
                                  onChange={handleAmenityChange}
                                  id="pool"
                              />
                          }
                          label="Pool"
                      />
                      <FormControlLabel
                          control={
                              <SmartCheckbox
                                  checked={amenities.airConditioning}
                                  onChange={handleAmenityChange}
                                  id="air-conditioning"
                              />
                          }
                          label="Klimaanlage"
                      />
                      <FormControlLabel
                          control={
                              <SmartCheckbox
                                  id="parking"
                                  checked={amenities.parking}
                                  onChange={handleAmenityChange}
                              />
                          }
                          label="Parkplatz"
                      />
                      <FormControlLabel
                          control={
                              <SmartCheckbox
                                  checked={amenities.petFriendly}
                                  onChange={handleAmenityChange}
                                  id="pet-friendly"
                              />
                          }
                          label="Haustierfreundlich"
                      />
                  </FormGroup>
              </SmartGroup>
          </Grid>
      </Grid>
    </Grid>
  );
}
