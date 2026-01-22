"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  Pagination, // Novo import
  Paper,
  Grid,
} from "@mui/material";
import MovieCard from "@/components/MovieCard";
import { getPopularMovies, searchMovies } from "@/services/api-tmdb";
import { Search } from "@mui/icons-material";

export default function FilmesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadMovies = async (query = "", pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);

      let data;
      if (query) {
        data = await searchMovies(query, pageNum);
      } else {
        data = await getPopularMovies(pageNum);
      }

      setMovies(data.results);
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
    } catch (err) {
      setError("Falha na varredura de dados da API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      loadMovies(searchTerm, 1);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Efeito para troca de página direto
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    loadMovies(searchTerm, value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            fontFamily: "monospace",
            borderLeft: "5px solid #d32f2f",
            pl: 2,
          }}
        >
          CineFiles: {searchTerm ? searchTerm : "Filmes Populares"}
        </Typography>

        <TextField
          placeholder="Pesquisar filme..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: { xs: "100%", md: "300px" }, backgroundColor: "#fff" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 8, mb: 4 }}>
            <CircularProgress color="secondary" />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {!loading && movies.length === 0 && (
          <Alert severity="info" sx={{ mb: 4 }}>
            Nenhum registro encontrado para: "{searchTerm}"
          </Alert>
        )}

        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Paper
        elevation={3}
        sx={{
          position: "sticky",
          bottom: 16,
          mt: 4,
          py: 2,
          display: "flex",
          justifyContent: "center",
          borderRadius: 2,
          zIndex: 10,
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          siblingCount={1}
          boundaryCount={1}
          disabled={loading}
          showFirstButton
          showLastButton
        />
      </Paper>
    </Container>
  );
}
