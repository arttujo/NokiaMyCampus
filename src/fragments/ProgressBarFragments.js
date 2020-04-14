import {LinearProgress, makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, {Fragment, useEffect, useState} from 'react';
import API from "../hooks/ApiHooks";
import GlobalFunctions from "../hooks/GlobalFunctions";
import ApiUrls from "../hooks/ApiUrls";
import Typography from "@material-ui/core/Typography";


const ProgressBarFragments = (props) => {

    //Progressbar with props
    function HomeProgressBar(props) {
        return (
            <LinearProgress variant="determinate" value={props.value}/>
        );
    }

    const [restaurantData, setRestaurantData] = useState(undefined);
    const [parkingP5Data, setParkingP5Data] = useState(undefined);
    const [parkingP10Data, setParking10Data] = useState(undefined);
    const [parkingP10TopData, setParkingP10TopData] = useState(undefined);
    const {getUsageData} = API();
    const {onItemClickNavigate} = GlobalFunctions();
    const {parkingP5Url, restaurantUrl, parkingP10Url, parkingP10TopUrl} = ApiUrls();

    /*eslint-disable */
    useEffect(() => {
        getUsageData(parkingP5Url, props).
        then(result => setParkingP5Data(result.percent));
        getUsageData(restaurantUrl, props).
        then(result => setRestaurantData(result.fill_percent));
        getUsageData(parkingP10Url, props).
        then(result => setParking10Data(result.percent));
        getUsageData(parkingP10TopUrl, props).
        then(result => setParkingP10TopData(result.percent));
    }, []);
    /*eslint-enable */

    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },

        headLine: {
            marginTop: '10px',
            marginBottom: '10px',
            color: 'blue',
        },
        progressLabel: {
            position:"absolute",
            zIndex:1,

        },
    }));
    const progressBarTheme = useStyles();

    //Progress bar for restaurant, including all data
    const restaurantProgressBar = () => {
        return(
            <Fragment>
                <Grid container item xs={12} spacing={0}
                      onClick={() => onItemClickNavigate('restaurant')}>
                    <Grid item container className={progressBarTheme.progressLabel}
                          direction="row"
                          justify="space-between"
                          alignItems="center"
                          xs={12}>
                        <Grid item alignItems="flex-start"
                              className={progressBarTheme.labelLocation} xs={4}>
                            <Typography>
                                Restaurant
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                Fill rate: {restaurantData}%
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                    </Grid>
                    <HomeProgressBar value={restaurantData}>restaurantData
                    </HomeProgressBar>
                </Grid>
            </Fragment>
        )
    }

    //Progress bar for P5, including all data
    const p5ProgressBar = () => {
        return (
            <Fragment>
                <Grid item xs={12} spacing={0}
                      onClick={() => onItemClickNavigate('p5')}>
                    <Grid item container className={progressBarTheme.progressLabel}
                          direction="row"
                          justify="space-between"
                          alignItems="center"
                          xs={12}>
                        <Grid item alignItems="flex-start"
                              className={progressBarTheme.labelLocation} xs={4}>
                            <Typography>
                                P5
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                Live Utilization: {parkingP5Data}%
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                    </Grid>
                    <HomeProgressBar value={parkingP5Data}>
                    </HomeProgressBar>
                </Grid>
            </Fragment>
        )
    }

    //Progress bar for P10, including all data
    const p10InsideProgressBar = () => {
        return (
            <Fragment>
                <Grid item xs={12} spacing={0}
                    onClick={() => onItemClickNavigate('p10')}>
                <Grid item container className={progressBarTheme.progressLabel}
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                      xs={12}>
                    <Grid item alignItems="flex-start"
                          className={progressBarTheme.labelLocation} xs={4}>
                        <Typography>
                            P10 Inside
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>
                            Live Utilization: {parkingP10Data}%
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
                <HomeProgressBar value={parkingP10Data}>
                </HomeProgressBar>
            </Grid>
            </Fragment>
        )
    }

    const p10RooftopProgressBar = () => {
        return (
            <Fragment>
                <Grid item xs={12} spacing={0}
                    onClick={() => onItemClickNavigate('p10')}>
                    <Grid item container className={progressBarTheme.progressLabel}
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        xs={12}>
                        <Grid item alignItems="flex-start"
                            className={progressBarTheme.labelLocation} xs={4}>
                            <Typography>
                                P10 Rooftop
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                Live Utilization: {parkingP10TopData}%
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                    </Grid>
                    <HomeProgressBar value={parkingP10TopData}>
                    </HomeProgressBar>
                </Grid>
            </Fragment>
        )
    }


    return {
        p5ProgressBar: p5ProgressBar,
        restaurantProgressBar: restaurantProgressBar,
        p10InsideProgressBar: p10InsideProgressBar,
        p10RooftopProgressBar: p10RooftopProgressBar
    };
}