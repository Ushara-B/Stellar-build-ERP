import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

const UserProfile = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={3}>
                <Grid container spacing={2} alignItems="center" justify="center">
                    <Grid item>
                        <Avatar className={classes.avatar} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">User Name</Typography>
                        <Typography variant="subtitle1">User Role</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default UserProfile;