"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Rating,
  CircularProgress,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getMovieDetails } from "@/services/api-tmdb";
import { moneyBR, moneyUS } from "@/utils/format";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [id]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 10,
          bgcolor: "#000",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (!movie)
    return (
      <Typography sx={{ p: 4, color: "white" }}>
        Registro não localizado.
      </Typography>
    );

  return (
    <Box
      sx={{
        bgcolor: "#000",
        minHeight: "100vh",
        color: "#fff",
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="xl">
        <Button
          onClick={() => router.back()}
          startIcon={<ArrowBackIcon fontSize="small" />}
          sx={{
            mb: 4,
            color: "#666",
            textTransform: "none",
            "&:hover": { color: "#fff" },
          }}
        >
          Voltar à listagem
        </Button>

        <Box
          sx={{
            display: "grid",
            // Em mobile 1 coluna, em md 320px para poster e o resto para texto
            gridTemplateColumns: { xs: "1fr", md: "320px 1fr" },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box>
            <Box
              component="img"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              sx={{
                width: "100%",
                maxWidth: { xs: "350px", md: "100%" },
                margin: { xs: "0 auto", md: "0" },
                display: "block",
                borderRadius: "4px",
                border: "1px solid #333",
                mb: 3,
              }}
            />

            <Box
              sx={{
                p: 2,
                bgcolor: "#fff",
                color: "#000",
                borderRadius: "1px",
                maxWidth: { xs: "350px", md: "100%" },
                margin: { xs: "0 auto", md: "0" },
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  fontWeight: "bold",
                  borderBottom: "1px solid #ddd",
                  display: "block",
                  mb: 1,
                }}
              >
                Detalhes
              </Typography>
              <Typography variant="body2" sx={{ color: "#444" }}>
                <strong>Lançamento:</strong>{" "}
                {new Date(movie.release_date).toLocaleDateString("pt-BR")}
              </Typography>
              <Typography variant="body2" sx={{ color: "#444" }}>
                <strong>Duração:</strong> {movie.runtime} min
              </Typography>
              <Typography variant="body2" sx={{ color: "#444" }}>
                <strong>Status:</strong> {movie.status}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                mb: 1,
                fontSize: { xs: "2rem", md: "3rem" },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {movie.title}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                mb: 2,
                flexWrap: "wrap",
                justifyContent: { xs: "center", md: "flex-start" },
                gap: 1,
              }}
            >
              {movie.genres.map((g: any) => (
                <Chip
                  key={g.id}
                  label={g.name}
                  size="small"
                  sx={{
                    borderRadius: "4px",
                    bgcolor: "#1a237e",
                    color: "#fff",
                    m: "0 !important", // Ajuste por causa do gap
                  }}
                />
              ))}
            </Stack>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Rating
                value={movie.vote_average / 2}
                readOnly
                precision={0.5}
                size="small"
                sx={{ color: "#ffc107" }}
              />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {movie.vote_average.toFixed(1)}
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                ({movie.vote_count} votos)
              </Typography>
            </Box>

            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                mb: 1,
                textTransform: "uppercase",
                letterSpacing: 1,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Sinopse
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#aaa",
                mb: 6,
                lineHeight: 1.6,
                maxWidth: "800px",
                textAlign: { xs: "justify", md: "left" },
              }}
            >
              {movie.overview || "Descrição não fornecida."}
            </Typography>

            <Box
              sx={{
                display: "grid",
                // Em mobile fica 1 coluna para não espremer os valores de moeda needed
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 200px)" },
                gap: 4,
                justifyContent: { xs: "center", sm: "start" },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  // 1 coluna no mobile, 2 colunas no desktop
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 200px)" },
                  gap: 4,
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                    gap: 4,
                    mt: 4,
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#666",
                        display: "block",
                        mb: 0.5,
                        textTransform: "uppercase",
                      }}
                    >
                      Orçamento Estim.
                    </Typography>

                    <Stack spacing={0.5}>
                      {/* Valor original em USD */}
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: "bold",
                          color: "#fff",
                          fontSize: { xs: "1.3rem", md: "1.5rem" }, // Ajuste para não quebrar em telas pequenas
                        }}
                      >
                        {moneyUS(movie.budget)}
                      </Typography>

                      {/* Valor Convertido para BRL */}
                      <Typography
                        variant="body2"
                        sx={{ color: "#4caf50", fontWeight: "medium" }}
                      >
                        {moneyBR(movie.budget * 5.5)}
                      </Typography>
                    </Stack>
                  </Box>

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#666",
                        display: "block",
                        mb: 0.5,
                        textTransform: "uppercase",
                      }}
                    >
                      Receita Gerada
                    </Typography>

                    <Stack spacing={0.5}>
                      {/* Valor original em USD */}
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: "bold",
                          color: "#fff",
                          fontSize: { xs: "1.3rem", md: "1.5rem" },
                        }}
                      >
                        {moneyUS(movie.revenue)}
                      </Typography>

                      {/* Valor Convertido para BRL */}
                      <Typography
                        variant="body2"
                        sx={{ color: "#4caf50", fontWeight: "medium" }}
                      >
                        {moneyBR(movie.revenue * 5.5)}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
