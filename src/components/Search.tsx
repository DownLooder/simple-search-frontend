"use client";

import { Format, InfoResponse, VideoItem } from "@/lib/types";
import { requestInfo } from "@/lib/actions";

import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, KeyboardEvent } from "react";
import Image from "next/image";

interface SearchProps {
  params?: { id: string };
}

type HandleChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type HandleKeyboardEvent = KeyboardEvent<HTMLInputElement>;

const Search: React.FC<SearchProps> = ({ params }) => {
  const [query, setQuery] = React.useState("");
  const [format, setFormat] = React.useState<Format>("mp4");
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<InfoResponse>();

  async function handleSubmit() {
    if (query == "") return;

    setLoading(true);
    const response = await requestInfo({ query, format });
    if (!response.error) {
      setData(response as InfoResponse);
    }
    setLoading(false);
  }

  function handleChange(event: HandleChangeEvent) {
    setQuery(event.target.value as Format);
  }

  function handleKeyUp(event: HandleKeyboardEvent) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  function handleFormat() {
    setFormat(format === "m4a" ? "mp4" : "m4a");
  }

  return (
    <Container>
      <Typography variant="h3">"{data?.query}"</Typography>
      <Grid container wrap="nowrap" sx={{ overflow: "scroll" }}>
        {(data?.results ? data.results : Array.from(new Array(5))).map(
          (item: VideoItem, idx) => (
            <Box key={idx} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
              {item ? (
                <Image
                  alt={item.title}
                  src={item.thumbnail}
                  width={210}
                  height={118}
                />
              ) : (
                <Skeleton variant="rectangular" width={210} height={118} />
              )}

              {item ? (
                <Box sx={{ pr: 2 }}>
                  <Typography gutterBottom variant="body2">
                    {item.title}
                  </Typography>
                  <Typography
                    display="block"
                    variant="caption"
                    color="text.secondary"
                  >
                    {item.createdAt}
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              )}
            </Box>
          )
        )}
      </Grid>
    </Container>
  );
};

export default Search;
