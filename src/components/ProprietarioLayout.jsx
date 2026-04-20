import React from "react";
import { Box, Typography } from "@mui/material";
import NavbarProprietario from "./NavbarProprietario";
import NavbarProprietarioDesktop from "./NavbarProprietarioDesktop";

export default function ProprietarioLayout({ children, title, subtitle }) {
  return (
    <>
      <NavbarProprietarioDesktop />
      <NavbarProprietario />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f5f7f9",
          pb: { xs: "90px", md: 6 },
          pt: { xs: 2, md: 0 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1280px",
            mx: "auto",
            pt: { xs: 2, md: 4 },
            px: { xs: 2, sm: 3, md: 4, lg: 6 },
          }}
        >
          {(title || subtitle) && (
            <Box sx={{ mb: 4 }}>
              {title && (
                <Typography
                  component="h1"
                  sx={{
                    m: 0,
                    fontSize: { xs: "1.5rem", md: "2rem" },
                    fontWeight: 800,
                    color: "#111827",
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography
                  sx={{
                    mt: 0.75,
                    color: "#6b7280",
                    fontSize: { xs: "0.9rem", md: "0.975rem" },
                  }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
          )}

          {children}
        </Box>
      </Box>
    </>
  );
}