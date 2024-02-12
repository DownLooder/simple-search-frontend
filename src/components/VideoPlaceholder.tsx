import { Skeleton, Box } from "@mui/material";
import React from "react";

const VideoPlaceholder = () => {
  return (
    <Box sx={{ width: 210, marginRight: 0.5, my: 5 }}>
      <Skeleton variant="rectangular" width={210} height={118} />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
    </Box>
  );
};

export default VideoPlaceholder;
