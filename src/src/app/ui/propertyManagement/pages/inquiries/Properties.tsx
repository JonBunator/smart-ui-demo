"use client"
import React from "react";
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
    PropertyData, propertyOptions,
    PropertyType
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

const properties: PropertyData[] = [
    {
        name: propertyOptions[0].label,
        address: "Dorfstrasse 8, 9835 Zürich, Schweiz",
        image: "/image/properties/property1.png",
        description: "Erleben Sie Zürich in unserer zentral gelegenen Wohnung, die perfekt für Work and Travel ausgestattet ist. Mit einem modernen Computer-Arbeitsplatz bietet diese Unterkunft alles, was Sie für produktives Arbeiten und entspanntes Wohnen benötigen. Genießen Sie die Nähe zu den kulturellen Highlights und den lebhaften Straßen der Stadt, ideal für Geschäftsreisende und digitale Nomaden.",
        type: PropertyType.APARTMENT,
        additionalInfos: [AdditionalInfoType.WIFI, AdditionalInfoType.AIR_CONDITIONING, AdditionalInfoType.PARKING],
        numBeds: 1,
        numBathrooms: 1,
        area: 40,
        price: 139,
    },
    {
        name: propertyOptions[1].label,
        address: "Britts Väg 91, 85490 Söderlöv, Schweden",
        image: "/image/properties/property3.png",
        description: "Entfliehen Sie dem Alltag und tauchen Sie ein in die Ruhe der schwedischen Natur mit unserer idyllischen Holzhütte im Herzen des Waldes. Diese gemütliche Unterkunft bietet Ihnen die perfekte Gelegenheit, sich zu entspannen und die unberührte Schönheit der Umgebung zu genießen. Ideal für Naturliebhaber und alle, die eine Auszeit in der Abgeschiedenheit suchen.",
        type: PropertyType.CABIN,
        additionalInfos: [AdditionalInfoType.PARKING, AdditionalInfoType.PET_FRIENDLY],
        numBeds: 2,
        numBathrooms: 1,
        area: 40,
        price: 120,
    },
    {
        name: propertyOptions[2].label,
        address: "Jasperplantsoen 618 I, 2975 IY Amsterdam, Niederlande",
        image: "/image/properties/property4.png",
        description: "Erleben Sie Amsterdam auf einzigartige Weise in unserem charmanten Hausboot, das direkt in der Innenstadt auf einem malerischen Fluss liegt. Genießen Sie die Nähe zu den kulturellen Highlights und den lebhaften Straßen der Stadt, während Sie die Ruhe und Gelassenheit des Wassers genießen. Ideal für einen unvergesslichen Aufenthalt in der niederländischen Hauptstadt.",
        type: PropertyType.HOUSE_BOAT,
        additionalInfos: [AdditionalInfoType.AIR_CONDITIONING, AdditionalInfoType.PET_FRIENDLY],
        numBeds: 3,
        numBathrooms: 1,
        area: 20,
        price: 169,
    },
    {
        name: propertyOptions[3].label,
        address: "Barrio Roser 5, 05962 Mataró, Spanien",
        image: "/image/properties/property2.png",
        description: "Erleben Sie den ultimativen Luxus in unserer modernen Villa in Spanien, die mit einem beeindruckenden Pool ausgestattet ist. Diese exquisite Unterkunft ist perfekt für stilvolle Cocktailpartys und bietet Ihnen und Ihren Gästen ein unvergessliches Erlebnis. Genießen Sie die elegante Architektur und die erstklassigen Annehmlichkeiten in einer der begehrtesten Lagen Spaniens. Ideal für diejenigen, die das Leben in vollen Zügen genießen möchten.",
        type: PropertyType.VILLA,
        additionalInfos: [AdditionalInfoType.WIFI, AdditionalInfoType.POOL, AdditionalInfoType.AIR_CONDITIONING, AdditionalInfoType.PARKING],
        numBeds: 8,
        numBathrooms: 4,
        area: 320,
        price: 1500,
    },
    {
        name: propertyOptions[4].label,
        address: "Fritz-Erler-Str. 96a, 25938 Wyk auf Föhr, Deutschland",
        image: "/image/properties/property5.png",
        description: "Entdecken Sie die Schönheit der nordfriesischen Insel Föhr in unserem großen Haus mit traditionellem Reetdach, direkt am Fluss gelegen. Diese charmante Unterkunft bietet Ihnen eine perfekte Mischung aus traditionellem Charme und natürlicher Schönheit. Genießen Sie die friedliche Umgebung und die malerische Aussicht, ideal für einen erholsamen Urlaub inmitten der Natur.",
        type: PropertyType.HOUSE,
        additionalInfos: [AdditionalInfoType.WIFI, AdditionalInfoType.PARKING, AdditionalInfoType.PET_FRIENDLY],
        numBeds: 6,
        numBathrooms: 2,
        area: 333,
        price: 120,
    },
]

export default function Properties() {
    const router = useRouter();

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
                                        <Image
                                            className="image"
                                            src={property.image}
                                            width={640}
                                            height={400}
                                            alt={`Image of ${property.name}`}
                                        />
                                    </div>
                                </CardMedia>
                                <CardContent className="card-content">
                                    <div className="row">
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
                                                <Typography variant="body2">{property.price}€</Typography>
                                            </div>
                                        </div>
                                        <Typography variant="body2">
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
        </InquiryPageLayout>
    );
}