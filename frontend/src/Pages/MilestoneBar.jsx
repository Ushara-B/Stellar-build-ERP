import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

const MilestoneBar = ({ progress }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(progress)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default MilestoneBar;