import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Chip,
} from "@mui/material";
import Link from "next/link";

export default function MovieCard({ movie }: { movie: any }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/poster_notfound_gen.png";

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        border: "1px solid #ddd",
        "&:hover": { boxShadow: 6 },
      }}
    >
      <Link
        href={`/filmes/${movie.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia
          component="img"
          height="450"
          image={posterUrl}
          alt={movie.title}
          sx={{ objectFit: "cover" }}
        />

        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
            {movie.title || "Título Indisponível"}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            Lançamento:{" "}
            {movie.release_date
              ? new Date(movie.release_date).toLocaleDateString("pt-BR")
              : "N/A"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Rating
                value={(movie.vote_average || 0) / 2}
                precision={0.5}
                readOnly
                size="small"
                sx={{ color: "#faaf00" }}
              />
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {Number(movie.vote_average || 0).toFixed(1)}
              </Typography>
            </Box>

            <Chip
              label={`Popularidade: ${Math.round(movie.popularity || 0)}`}
              variant="outlined"
              size="small"
              color="primary"
              sx={{ fontSize: "0.75rem", height: "20px" }}
            />
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.4,
            }}
          >
            {movie.overview || "Nenhuma descrição disponível no arquivo."}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}
