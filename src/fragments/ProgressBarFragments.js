import {LinearProgress} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, {Fragment} from 'react';
import GlobalFunctions from "../hooks/GlobalFunctions";
import Typography from "@material-ui/core/Typography";
import '../styles/progressBar.css';

const ProgressBarFragments = (props) => {
    //Progressbar with props
    function HomeProgressBar(props) {
        return (
            <LinearProgress variant="determinate" value={props.value}/>
        );
    }
    const {onItemClickNavigate} = GlobalFunctions();

    /*eslint-enable */
    //Restaurant progress bar

    const ProgressBar = (barData) =>{
        return (
            <Fragment>
                <Grid item xs={12} spacing={0}
                      onClick={() => {onItemClickNavigate(barData.navigationUrl)}}>
                    <Grid item container className={barData.barTheme.progressLabel}
                          direction="row"
                          justify="space-between"
                          alignItems="center"
                          xs={12}>
                        <Grid item alignItems="flex-start"
                              className={barData.barTheme.labelLocation} xs={4}>
                            <Typography className="alignLeft">
                                {barData.barLabel}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                {barData.utilization}: {barData.data}%
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                    </Grid>
                    <HomeProgressBar value={barData.data}>
                    </HomeProgressBar>
                </Grid>
            </Fragment>
        )
    };

    return {
        ProgressBar:ProgressBar
    };
}

export default ProgressBarFragments;
