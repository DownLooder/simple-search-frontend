"use client";

import { Format, VideoItem } from "@/lib/types";
import { requestInfo } from "@/lib/actions";

import {
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

type HandleChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type HandleKeyboardEvent = KeyboardEvent<HTMLInputElement>;

const SearchBar = () => {
  const [query, setQuery] = React.useState("");
  const [format, setFormat] = React.useState<Format>("mp4");
  const router = useRouter();

  async function handleSubmit() {
    if (query == "") return;

    const response = await requestInfo({ query, format });
    if (!response.error) {
      router.push(`/explore/${encodeURIComponent(response.query)}`);
    }
    setQuery("");
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
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="search-input">Search</InputLabel>
        <OutlinedInput
          sx={{ my: 2 }}
          value={query}
          id="search-input"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title={`Toggle format [mp4 | m4a]`}>
                <Button onClick={handleFormat}>
                  <Typography>{format}</Typography>
                </Button>
              </Tooltip>
            </InputAdornment>
          }
        />
      </FormControl>
    </Container>
  );
};

export default SearchBar;
