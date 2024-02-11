import { Skeleton, Typography, Box } from "@mui/material";
import { Video } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface VideosProps {
  loading?: boolean;
  data?: Video;
}

const VideoCard: React.FC<VideosProps> = ({ data, loading }) => {
  return (
    <Box sx={{ width: 210, marginRight: 0.5, my: 5 }}>
      {loading ? (
        <Skeleton variant="rectangular" width={210} height={118} />
      ) : (
        <Image
          alt={data?.title as string}
          src={data?.thumbnail as string}
          width={210}
          height={118}
        />
      )}

      {loading ? (
        <Box sx={{ pt: 0.5 }}>
          <Skeleton />
          <Skeleton width="60%" />
        </Box>
      ) : (
        <Box sx={{ pr: 2 }}>
          <Typography gutterBottom variant="body2">
            {data?.title as string}
          </Typography>
          <Typography display="block" variant="caption" color="text.secondary">
            {data?.createdAt.toLocaleDateString()}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default VideoCard;
