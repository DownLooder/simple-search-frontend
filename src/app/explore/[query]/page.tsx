import VideoCard from "@/components/VideoCard";
import { Container, Typography, Grid, Box, Skeleton } from "@mui/material";
import prisma from "@/lib/prisma";
import React, { Suspense } from "react";
import { Video } from "@prisma/client";
import { decode } from "@/lib/utils";
import Placeholder from "@/components/VideoPlaceholder";

interface Props {
  params: { query: string };
}

const QueryResults: React.FC<Props> = async ({ params }) => {
  const data = await prisma.info.findFirst({
    where: {
      query: decode(params.query),
    },
    include: {
      videos: true,
    },
  });

  return (
    <Container>
      Search results
      <Typography variant="h3">{decode(params.query)}</Typography>
      <Suspense
        fallback={
          <Grid container wrap="nowrap" sx={{ overflow: "scroll" }}>
            {Array.from(new Array(5)).map((_, idx) => (
              <Placeholder key={idx} />
            ))}
          </Grid>
        }
      >
        <Grid container wrap="nowrap" sx={{ overflow: "scroll" }}>
          {(data?.videos ? data?.videos : Array.from(new Array(5))).map(
            (item: Video, idx) => (
              <VideoCard key={idx} data={item} />
            )
          )}
        </Grid>
      </Suspense>
    </Container>
  );
};

export default QueryResults;
