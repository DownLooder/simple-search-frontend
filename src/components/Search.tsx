"use client";

import { Format, InfoResponse, VideoItem } from "@/lib/types";
import { requestInfo } from "@/lib/actions";

import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import Snackbar from "./Snackbar";
import Videos from "./VideoCard";
import VideoCard from "./VideoCard";
import Image from "next/image";
import { Block } from "@mui/icons-material";

interface SearchProps {
  params?: { id: string };
}

type HandleChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

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

  function handleKeyUp(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  function handleFormat(event: SelectChangeEvent<string>) {
    setFormat(event.target.value as Format);
  }

  return (
    <>
      <FormControl fullWidth>
        <TextField
          sx={{ my: 2 }}
          value={query}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          label="Search"
          variant="standard"
        />
        <Select
          value={format}
          onChange={handleFormat}
          defaultValue="mp4"
          label="Format"
          variant="standard"
        >
          <MenuItem value="mp4">MP4</MenuItem>
          <MenuItem value="m4a">M4A</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="h2">{data?.query}</Typography>
      <Grid container wrap="nowrap">
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
    </>
  );
};

export default Search;
