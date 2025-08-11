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
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import {fakeData} from "@/app/ui/propertyManagement/pages/inquiries/types/properties";
import {getProperties} from "@/lib/db/database";
import LoadingPropertyCards from "@/app/ui/propertyManagement/pages/inquiries/LoadingPropertyCards";
import { useSnackbar } from "@/app/ui/providers/SnackbarProvider";

export default function Properties() {
    const router = useRouter();
    const [properties, setProperties] = useState<PropertyData[]>([]);
    const [loading, setLoading] = useState(true);
    const {error} = useSnackbar();

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
                numBeds: property.numBeds,
                numBathrooms: property.numBeds,
                area: property.area,
                pricePerNight: property.pricePerNight,
                available: false
            }));

            setProperties([...addedProperties, ...fakeData]);
            setLoading(false);
        })
            .catch(() => {setLoading(false); error()});
    }, [error]);

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
            case AdditionalInfoType.KITCHEN:
                return { icon: <LocalDiningIcon />, label: "Küche" };
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
                                                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAADIAAAAyAEU/dc7AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAZJJREFUOI2lk8tq20AYhb8ZXQiVPEZZxHbsxoWYbmy3pKGhq0DXgb5sIW/SLJptFCI7rWxZrvDoMl2IhjqojqFn9w9zPv6ruPpyZdhDSimSJHnxn70P7OLTBY7jcPv9llk0+z/g+cdzcp2TZRmno1OCICDLMlarFfHPeD+gEILJuwmWZWGMoSgLANI05ahzhGorjDFcf73eD2iMwfM8tNas12se5490uh3CuxCAqqqIHqLGimTT43gyRmtNnueNpiRJ6Pa6qLZ6GTiejjl4dfAEc12X4/4xlmUxfDOk1+shpWS5XHL24Qzf93cDw7sQvdEURUH0EHEf3mOMQUrJ4PUAx3XoD/pIKYnjmLIqdwMX8QKAqqxIlgmLeIExBqXqQdx8u6njtqKqKrJf2ZZ/ayitVovLz5fMZ3MARm9HCCG2DGVR1hmLxvZjnwxPnoLp+ykAwWGA+bF9QI7jAOD5HkIILNvC933+9gOIXaenlGKz2eC6LrZj1zuZF6Rp+i9L89r8kdYaz/eQUqK1rjN41oLn+g0o46cJOtG88wAAAABJRU5ErkJggg=="
                                                    />
                                                <Image
                                                    className="image image-light"
                                                    src="/image/placeholder-house-light.svg"
                                                    width={600}
                                                    height={400}
                                                    alt=""
                                                    placeholder="blur"
                                                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAADIAAAAyAEU/dc7AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAUVJREFUOI2lk8Fq5DAQRJ+klu3JQGAh5P//bA85LRkciGVZltXSHgaGNZk4A6tz9VNV02Xe3n43HniqinPuR519BBbCJ5fLH0rZ/h8YwsS6LnRdzzheWNdEzhnVclcv34Gm6RPnLMsSEbnKvO8Yx3dUlWF44uXl9XHgPE+IOE6nM13Xsa6JYXgCIKWF8/l8d+5u5Ksrh3P+7tAwnAghoKo/A5clEsJ0g21bZp4DpRRiDNRasdYiInx8vFPrHvolsohHRBDx9H0PGFKKtFZJKbFtKyKeYRjo+xNgjh2KXG/NWoNzgvceYwwxzpSy8fz8i1qVGGeMsVi7R+wc1qqM4+W2m5zzTmxMw7njS5N/h1KKlLLRGqjWfRTrAEcpinNCaw3V8vXTo+rlnLBWUFVqVYwBa4Wu6751eOjfWiHnFai3Hrd2XP2/B1urMZsds6YAAAAASUVORK5CYII="
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