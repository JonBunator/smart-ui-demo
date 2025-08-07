"use client"
import React, {useState, useEffect} from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Grid from '@mui/material/Grid';
import {blue, green, orange, red, teal} from '@mui/material/colors';
import {useRouter} from "next/navigation";
import SmartButton from "@/app/ui/components/SmartButton";
import Image from 'next/image';
import VillaIcon from '@mui/icons-material/Villa';
import HouseIcon from '@mui/icons-material/House';
import CabinIcon from '@mui/icons-material/Cabin';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import "./Properties.scss";
import InquiryPageLayout from "@/app/ui/propertyManagement/pages/inquiries/components/InquiryPageLayout";
import {
    AdditionalInfoType,
    PropertyData,     PropertyType
} from "@/app/ui/propertyManagement/pages/inquiries/types/properties";
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import AirIcon from '@mui/icons-material/Air';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PetsIcon from '@mui/icons-material/Pets';
import BedIcon from '@mui/icons-material/Bed';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BathtubIcon from '@mui/icons-material/Bathtub';
import {fakeData} from "@/app/ui/propertyManagement/pages/inquiries/types/properties";
import {getProperties} from "@/lib/db/database";
import LoadingPropertyCards from "@/app/ui/propertyManagement/pages/inquiries/LoadingPropertyCards";

export default function Properties() {
    const router = useRouter();
    const [properties, setProperties] = useState<PropertyData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProperties().then((properties) => {
            const addedProperties: PropertyData[] = properties.map((property) => ({
                name: property.name,
                address: `${property.street} ${property.houseNumber}, ${property.postalCode} ${property.city}, ${property.country}`,
                image: undefined,
                placeholderImage: undefined,
                description: property.description,
                type: property.type as PropertyType,
                additionalInfos: property.additionalInfo as AdditionalInfoType[],
                numBeds: property.numBedrooms,
                numBathrooms: property.numBathrooms,
                area: property.area,
                pricePerNight: property.pricePerNight,
                available: false
            }));

            setProperties([...addedProperties, ...fakeData]);
            setLoading(false);
        })
            .catch(() => setLoading(false));
    }, []);

    function navigateToAddPage() {
        router.push("/survey/properties/add");
    }

    const AddButton = (
        <SmartButton startIcon={<AddCircleIcon />} smartSemantic="navigates to the 'add vacation home' form" variant="contained" onClick={navigateToAddPage} smartHref="/survey/properties/add">Hinzufügen</SmartButton>
    );

    const getAvatarProps = (type: PropertyType) => {
        switch (type) {
            case PropertyType.VILLA:
                return { icon: <VillaIcon />, color: red[500] };
            case PropertyType.HOUSE:
                return { icon: <HouseIcon />, color: orange[500] };
            case PropertyType.CABIN:
                return { icon: <CabinIcon />, color: green[500] };
            case PropertyType.HOUSE_BOAT:
                return { icon: <DirectionsBoatIcon />, color: blue[500] };
            case PropertyType.APARTMENT:
                return { icon: <ApartmentIcon />, color: teal[500] };
            default:
                return { icon: undefined, color: red[500] };
        }
    };

    const getAdditionalInfoProps = (type: AdditionalInfoType) => {
        switch (type) {
            case AdditionalInfoType.WIFI:
                return { icon: <WifiIcon />, label: "WLAN" };
            case AdditionalInfoType.POOL:
                return { icon: <PoolIcon />, label: "Pool" };
            case AdditionalInfoType.AIR_CONDITIONING:
                return { icon: <AirIcon />, label: "Klimaanlage" };
            case AdditionalInfoType.PARKING:
                return { icon: <LocalParkingIcon />, label: "Parkplatz" };
            case AdditionalInfoType.PET_FRIENDLY:
                return { icon: <PetsIcon />, label: "Haustierfreundlich" };
            default:
                return { icon: undefined, label: "" };
        }
    };

    return (
        <InquiryPageLayout className="properties" title="Immobilien" buttonContent={AddButton}>
            {loading ? <LoadingPropertyCards/> :
            <Grid container spacing={4} className="properties-container">
                {properties.map((property, index) => {
                    const { icon, color } = getAvatarProps(property.type);
                    return (
                        <Grid key={index} size={{ lg: 12, xl: 6 }}>
                            <Card className="properties-card">
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: color }}>
                                            {icon}
                                        </Avatar>
                                    }
                                    title={property.name}
                                    subheader={property.address}
                                />
                                <CardMedia>
                                    <div className="image-container">
                                        {property.image === undefined ?
                                            <>
                                                <Image
                                                    className="image image-dark"
                                                    src="/image/placeholder-house-dark.svg"
                                                    width={600}
                                                    height={400}
                                                    alt=""
                                                    placeholder="blur"
                                                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAADIAAAAyAEU/dc7AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAZlJREFUOI2lk8FuGjEQhj97MaCybEIPBAKFSkG5AI1SRainSD1H6stWysM0p6YQBUi7sEA3MdjTQ1oUJEqROqcZa/5P/4xtdfXpStgjoigiSZJ/9mX2gfU+9DDGcPPlhtFw9H/Ai94FS7skTVNOWicclg55TB+ZzWbEP+L9gEopOu86KKXw3rNyKwDm8znlcpnoIALg+vP1fkARoVAoYK1lsVjwMH7gqHLEoD+g0WwgIgzvh1sn0tsO25021lqWy+VWUZIkVKqVtdOdwHa3Tf5Vfg3LZrMc144JgoDm2ybVahWtNdPplPP354RhuBs46A+wT5bVasXwfsjd4A4RQWtN/U0dkzXU6jW01sRxjPNuN3ASTwDwzpNMEybxBBEhip7H63/rAxAdRHjvSX+mG/qNSykWi1x+vGQ8GgPQOm2hlNoQeO+fnait6yfTaDbWRfesC0DpdQn5vvmBjDGICPl8HhEhyASEYchLPUDm9uvtuniZA+RyOZxz6EAT6AARwXuPtXarO/jLs/kTzjmMMSilcO738tUuBfwCjTqk653/N0wAAAAASUVORK5CYII="
                                                />
                                                <Image
                                                    className="image image-light"
                                                    src="/image/placeholder-house-light.svg"
                                                    width={600}
                                                    height={400}
                                                    alt=""
                                                    placeholder="blur"
                                                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAADIAAAAyAEU/dc7AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAXdJREFUOI2lkzFzm1AQhD/uvQcPkC0kZ8aFijRu8v9/QkrXKWIVuIljggjESEjoIUiRGTlOZKwZX3czuzu7O3fe7e3ngTPGOYcx5k2cnCOWZQ8sl1/Y7bbvF8zz79R1RRxPuL9fUlU/aZo1+317Eq9fd/UNY3zKsiAILABhGJGmdzTNmuvrBTc3n84XLIofGOOTJFfE8QV1XZEkcwCU0sznH07yTkauqhVaG3w/OEmaThPyPMO5/duCVVWQZY/HmNvthtXqkbbdkecZh8MBpTTWWtL0K13nxiNbG2GtxdqQOL5ARCjLgmHoeXr6RdOsCYKQ6TTh8nKG53njDo3xAVBKEQQh1oaICEWRs9nUzGZXtG1DWa4QUSj10tOLrescaXrHfv+nm81m/V9HWhuGkVfQTfNMKsvieLz/dmOMQUQ4HDqCIEQpwbmWv/kAOoomxyWKJiwWH4+7cw6lhL7v6fse8BDx0Pr1Fxz9FBGh6zqGYUBEjUGP8xvDYp4TCW9t0QAAAABJRU5ErkJggg=="
                                                />
                                            </>
                                        :
                                        <Image
                                            className="image"
                                            src={property.image}
                                            width={600}
                                            height={400}
                                            alt={`Image of ${property.name}`}
                                            placeholder="blur"
                                            blurDataURL={property.placeholderImage}
                                        />}
                                    </div>
                                </CardMedia>
                                <CardContent className="card-content">
                                    <div className="card-content-main">
                                        <div className="infos">
                                            <div className="info">
                                                <BedIcon/>
                                                <Typography variant="body2" className="label">Betten:</Typography>
                                                <Typography variant="body2">{property.numBeds}x</Typography>
                                            </div>
                                            <div className="info">
                                                <BathtubIcon/>
                                                <Typography variant="body2" className="label">Badezimmer:</Typography>
                                                <Typography variant="body2">{property.numBathrooms}x</Typography>
                                            </div>
                                            <div className="info">
                                                <SquareFootIcon/>
                                                <Typography variant="body2" className="label">Fläche:</Typography>
                                                <Typography variant="body2">{property.area}m²</Typography>
                                            </div>
                                            <div className="info">
                                                <LocalOfferIcon/>
                                                <Typography variant="body2" className="label">Preis/Nacht:</Typography>
                                                <Typography variant="body2">{property.pricePerNight}€</Typography>
                                            </div>
                                        </div>
                                        <Typography variant="body2" className="description">
                                            {property.description}
                                        </Typography>
                                    </div>
                                    <div className="additional-infos">
                                        {property.additionalInfos.map((info, index) => {
                                            const {icon, label} = getAdditionalInfoProps(info);
                                            return (
                                                <Chip key={index} size="small" variant="outlined" icon={icon} label={label} />
                                            )
                                        })}
                                        {property.available ? undefined :
                                        <Chip size="small" color="warning" label="Noch nicht verfügbar"/>}
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            }
        </InquiryPageLayout>
    );
}