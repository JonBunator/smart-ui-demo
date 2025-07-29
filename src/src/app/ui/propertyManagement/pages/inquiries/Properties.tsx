"use client"
import React, {useState, useEffect, Suspense} from "react";
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
                image: "/image/properties/property1.png",
                placeholderImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAMAAACejr5sAAABGlBMVEWqnYQXGhO9rZNcWEcRFA62p44rLCJ1a1aorK/i2MZBPy9LSDYFBwMcHhQgIBMnKBqxoolQT0Y0Niyxt7yjmIKHf217dWSZkH1gX1WDdWB2cWJlW0QMDQkgJB2eknx/dFyVi3mViXStoYillns3OS7Ht5yGg3+ZlIdVTTqgmozKuZ+Wm55rY0+HiIdtcXCan512c2xLQjC7rJW5qY/CsZfEtJtDQzi6vsOtqqWOgGg7PDKWkY6RkpdmYEyBeWlaUTdlZkaOh36PhG6IfGVZWlOOlJlVU0STlHWhpqKcqbPh07tCTCp+cFezqZmUl6Gro5V3dXZaUkZiZ2/CvLJydn9+fHuAf3xubFvSxrGdjnOCj5V1hY6vv8eRpbOETkNaAAAA+UlEQVQY0w3BhWKCABQAwEd3dygoioSis5XZte6O//+N7Q4wyghlFB0Qch3+RTOHWsEiqOmAZs3REO0TBBF97jwWKKM6Qusy6NWqBQMZttiCBdPSmStUm9C5dtka1tf59+8RXCtlmCat0RcTLW1a3OHrZw9m655h+iXdPU3pNHO8TtHFwHbfnj9eO0/ntWm3lS2PG7fHAak2ytvYLHphfjAIO9GNNgei2nivRWHcW3bi9XU7sU2TAkRCuGAbtL3dzUxprCSSVFlAKhXMo4rScTYPakUUJcHnAUcULDlTlEfs7oUUcJ/neR8QkRQ5bszO5/Z+zEqCgOP4H8ZuIQV5KBgvAAAAAElFTkSuQmCC",
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
        <SmartButton startIcon={<AddCircleIcon />} smartSemantic="navigates to the 'add vacation home' form" variant="contained" onClick={navigateToAddPage}>Hinzufügen</SmartButton>
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
                                    action={property.available ? undefined :
                                        <Chip size="small" color="warning" label="Noch nicht verfügbar"/>
                                    }
                                    title={property.name}
                                    subheader={property.address}
                                />
                                <CardMedia>
                                    <div className="image-container">
                                        <Image
                                            className="image"
                                            src={property.image}
                                            width={600}
                                            height={400}
                                            alt={`Image of ${property.name}`}
                                            placeholder="blur"
                                            blurDataURL={property.placeholderImage}
                                        />
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