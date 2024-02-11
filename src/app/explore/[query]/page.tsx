import VideoCard from "@/components/VideoCard";
import { Container, Typography, Grid, Box, Skeleton } from "@mui/material";
import prisma from "@/lib/prisma";
import Image from "next/image";
import React, { Suspense } from "react";
import { Video } from "@prisma/client";

const QueryResults = async ({ params }: { params: { query: string } }) => {
  const data = await prisma.info.findFirst({
    where: {
      query: decodeURIComponent(params.query),
    },
    include: {
      videos: true,
    },
  });

  return (
    <Container>
      Search results
      <Typography variant="h3">{decodeURIComponent(params.query)}</Typography>
      <Grid container wrap="nowrap" sx={{ overflow: "scroll" }}>
        {(data?.videos ? data?.videos : Array.from(new Array(5))).map(
          (item: Video, idx) => (
            <VideoCard key={idx} data={item} />
          )
        )}
      </Grid>
    </Container>
  );
};

export default QueryResults;
