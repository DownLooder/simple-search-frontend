"use client";

import { Format } from "@/lib/types";
import { requestInfo } from "@/lib/actions";

import {
  Button,
  Container,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import Snackbar from "./Snackbar";

interface SearchProps {
  params?: { id: string };
}

const Search: React.FC<SearchProps> = ({ params }) => {
  const [query, setQuery] = React.useState("");
  const [format, setFormat] = React.useState<Format>("mp4");

  async function handleSubmit() {
    if (query == "") return;

    const response = await requestInfo({ query, format });
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setQuery(event.target.value as Format);
  }

  function handleKeyUp(event: KeyboardEvent<HTMLDivElement>): void {
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
      <Container></Container>
    </>
  );
};

export default Search;
