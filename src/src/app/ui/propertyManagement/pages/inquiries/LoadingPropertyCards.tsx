import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from "@mui/material/Skeleton";
import "./LoadingPropertyCards.scss"

export default function LoadingPropertyCards() {

    return (
        <Grid container spacing={4} className="properties-container">
            {Array.from({ length: 4 }, (_, index) => (
                    <Grid key={index} size={{ lg: 12, xl: 6 }}>
                        <Card className="properties-card">
                            <CardHeader
                                avatar={
                                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                }
                                title={<Skeleton
                                    animation="wave"
                                    height={10}
                                    width="80%"
                                    style={{ marginBottom: 6 }}
                                />}
                                subheader={ <Skeleton animation="wave" height={10} width="40%" />}
                            />
                            <CardMedia>
                                <div className="image-container">
                                    <Skeleton className="image skeleton-image" animation="wave" variant="rectangular" />
                                </div>
                            </CardMedia>
                            <CardContent className="card-content">
                                <div className="card-content-main">
                                    <div className="infos">
                                        <div className="info">
                                            <Skeleton animation="wave" height={10} width={90} />
                                        </div>
                                        <div className="info">
                                            <Skeleton animation="wave" height={10} width={100} />
                                        </div>
                                        <div className="info">
                                            <Skeleton animation="wave" height={10} width={80}/>
                                        </div>
                                        <div className="info">
                                            <Skeleton animation="wave" height={10} width={110} />
                                        </div>
                                    </div>
                                    <div className="description-skeleton">
                                        <Skeleton animation="wave" />
                                        <Skeleton animation="wave" />
                                        <Skeleton animation="wave" />
                                        <Skeleton animation="wave" width="70%" />
                                    </div>
                                </div>
                                <div className="additional-infos">
                                    <Skeleton animation="wave" height={24} width={60} />
                                    <Skeleton animation="wave" height={24} width={50} />
                                    <Skeleton animation="wave" height={24} width={80} />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
            ))}
        </Grid>
    );
}