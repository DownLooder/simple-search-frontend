import { decode } from "@/lib/utils";
import { Skeleton, Typography, Box, Tooltip } from "@mui/material";
import { Video } from "@prisma/client";
import moment from "moment";
import Image from "next/image";
import React from "react";

interface VideosProps {
  loading?: boolean;
  data?: Video;
}

const VideoCard: React.FC<VideosProps> = ({ data, loading }) => {
  const title = decode(data?.title as string);

  return (
    <>
      <Box sx={{ width: 210, marginRight: 0.5, my: 5 }}>
        {data ? (
          <Image
            alt={title}
            src={data?.thumbnail as string}
            width={210}
            height={118}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <Skeleton variant="rectangular" width={210} height={118} />
        )}

        {data ? (
          <Tooltip title={title}>
            <Box sx={{ pr: 2 }}>
              <Typography noWrap gutterBottom variant="body2">
                {title}
              </Typography>
              <Typography
                display="block"
                variant="caption"
                color="text.secondary"
              >
                {data && moment(data?.publishDate).fromNow()}
              </Typography>
            </Box>
          </Tooltip>
        ) : (
          <Box sx={{ pt: 0.5 }}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        )}
      </Box>
    </>
  );
};

export default VideoCard;
