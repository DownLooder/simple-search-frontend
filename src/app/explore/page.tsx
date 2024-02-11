import { InfoResponse, VideoItem } from "@/lib/types";
import { Container, Typography, Grid, Box, Skeleton } from "@mui/material";
import Image from "next/image";
import React from "react";

interface ExploreProps {
  params: { id: string };
}

const Explore: React.FC<ExploreProps> = ({ params }) => {
  return <>Explore main</>;
};

export default Explore;
