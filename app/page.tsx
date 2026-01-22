"use client";

import { Box, Typography, Paper, Button, Stack, Grid } from "@mui/material";

import Link from "next/link";
import MovieIcon from "@mui/icons-material/Movie";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Info } from "@mui/icons-material";

export default function Home() {
  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 1200, mx: "auto" }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          fontFamily: "Courier New, Courier, monospace",
          letterSpacing: { xs: "4px", md: "10px" }, // Menos espaçamento no mobile
          fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" }, // Fonte escala com a tela
          color: "#eceff1",
          textTransform: "uppercase",
          mb: 4,
        }}
      >
        BO<span style={{ color: "#d32f2f" }}>7</span>EN
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              borderTop: "5px solid #1a237e",
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <DashboardIcon color="primary" fontSize="large" />
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Gestão B.O
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, flexGrow: 1 }}
            >
              Módulo de gerenciamento de dados persistidos em{" "}
              <strong>PostgreSQL</strong>. CRUD completo integrado a uma{" "}
              <strong>API REST em Laravel</strong>.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              href="/dashboard"
              fullWidth
              sx={{ backgroundColor: "#1a237e" }}
            >
              Acessar Ocorrências
            </Button>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              borderTop: "5px solid #9c27b0",
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <MovieIcon color="secondary" fontSize="large" />
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                CineFiles
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, flexGrow: 1 }}
            >
              Módulo de exploração de dados externos via API TMDB, com foco em
              performance e exibição dinâmica catalogada de filmes.
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              component={Link}
              href="/filmes"
              fullWidth
              sx={{ borderWidth: 2 }}
            >
              Explorar Filmes
            </Button>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 12, lg: 4 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              borderTop: "5px solid #455a64",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Info sx={{ color: "#455a64" }} fontSize="large" />
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Sobre o Projeto
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, flexGrow: 1 }}
            >
              <strong>BO7EN</strong> é um projeto Fullstack desenvolvido para a
              seletiva da <strong>DIC/PCPA</strong>, integrando Laravel e a API
              TMDB.
            </Typography>
            <Button
              variant="text"
              color="inherit"
              component="a"
              href="https://github.com/jdiassdev?tab=repositories"
              target="_blank"
              fullWidth
            >
              Ver Repositório
            </Button>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              mt: 2,
              backgroundColor: "#1a1a1a",
              color: "#fff",
              borderRadius: 2,
              borderLeft: { xs: "none", sm: "8px solid #d32f2f" },
              borderTop: { xs: "8px solid #d32f2f", sm: "none" },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontFamily: "monospace",
                fontSize: { xs: "1.1rem", sm: "1.5rem" },
              }}
            >
              Curiosidade: Por que BO7EN?
            </Typography>

            <Stack spacing={2}>
              <Typography
                variant="body1"
                sx={{ opacity: 0.9, lineHeight: 1.7 }}
              >
                O nome é um trocadilho técnico. <strong>BO</strong> refere-se
                aos
                <em> Boletins de Ocorrência</em>, enquanto o
                <strong> 7EN</strong> é uma referência ao filme{" "}
                <strong>Se7en</strong>.
              </Typography>

              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  <strong>O Conceito:</strong> Assim como os detetives seguem
                  registros, este sistema organiza "evidências" (dados) de forma
                  estruturada.
                </Typography>
              </Box>

              <Typography
                variant="caption"
                sx={{
                  mt: 2,
                  display: "block",
                  color: "#d32f2f",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                "What's in the box?"
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
