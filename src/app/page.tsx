import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import ProTip from '@/components/ProTip';
import Copyright from '@/components/Copyright';
import Search from "@/components/Search";
import { useRouter } from "next/navigation";

export default function Home() {
  // const { id } = useParams() as { id: string };
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
         "Home"
        </Typography>

        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
