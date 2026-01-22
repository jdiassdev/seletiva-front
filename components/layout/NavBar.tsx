"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MovieIcon from "@mui/icons-material/Movie";

export default function Navbar() {
  // Estado para controlar o menu mobile
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const menuItems = [
    { label: "Ocorrências", href: "/dashboard", icon: <DashboardIcon /> },
    { label: "Filmes", href: "/filmes", icon: <MovieIcon /> },
  ];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1a237e" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* LOGO */}
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Courier New, Courier, monospace",
                fontWeight: "bold",
                letterSpacing: "3px",
                color: "#eceff1",
                textTransform: "uppercase",
                fontSize: { xs: "1.5rem", md: "2.125rem" }, // Menor em mobile
              }}
            >
              B O <span style={{ color: "#d32f2f" }}>7</span> E N
            </Typography>
          </Link>

          {/* MENU MOBILE (Hambúrguer) */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu de navegação"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={item.href}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    {item.icon}
                    <Typography textAlign="center">{item.label}</Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* MENU DESKTOP (Botões horizontais) */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                href={item.href}
                color="inherit"
                startIcon={item.icon}
                sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
