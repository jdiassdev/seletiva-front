"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import {
  getCases,
  getCategories,
  toggleActivate,
} from "@/services/api-laravel";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { getFirstDayOfMonth, getLastDayOfMonth } from "@/utils/format";

export default function DashboardPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    period_start: getFirstDayOfMonth(),
    period_end: getLastDayOfMonth(),
    status: "",
    category_id: "",
    active: "T",
  });

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [casesRes, catsRes] = await Promise.all([
        getCases(filters),
        getCategories(),
      ]);
      setCases(casesRes.data || []);
      setCategories(catsRes.data || []);
      setError(null);
    } catch (err) {
      setError("Não foi possível carregar os dados do servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleFilter = async () => {
    try {
      setLoading(true);
      const result = await getCases(filters);
      setCases(result.data || []);
    } catch (err) {
      setError("Erro ao aplicar filtros.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleToggleActive = async (id: string) => {
    try {
      await toggleActivate(id);
      setCases((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                is_active: item.is_active === "Ativo" ? "Inativo" : "Ativo",
              }
            : item,
        ),
      );
    } catch (err) {
      alert("Erro ao alterar status.");
    }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.75rem", md: "2.125rem" },
          }}
        >
          Ocorrências
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          href="/dashboard/nova"
          sx={{ backgroundColor: "#1a237e" }}
        >
          Nova Ocorrência
        </Button>
      </Box>

      {/* FILTROS COM LAYOUT ORIGINAL RESTRUTURADO */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              label="Início"
              type="date"
              name="period_start"
              value={filters.period_start}
              onChange={handleFilterChange}
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              label="Fim"
              type="date"
              name="period_end"
              value={filters.period_end}
              onChange={handleFilterChange}
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              select
              label="Status"
              name="status"
              value={filters.status ?? ""}
              onChange={handleFilterChange}
              size="small"
              fullWidth
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="aberto">Aberto</MenuItem>
              <MenuItem value="em_andamento">Em Andamento</MenuItem>
              <MenuItem value="concluido">Concluído</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              select
              label="Categoria"
              name="category_id"
              value={filters.category_id ?? ""}
              onChange={handleFilterChange}
              size="small"
              fullWidth
            >
              <MenuItem value="">Todas</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              select
              label="Exibir"
              name="active"
              value={filters.active}
              onChange={handleFilterChange}
              size="small"
              fullWidth
            >
              <MenuItem value="T">Somente Ativos</MenuItem>
              <MenuItem value="F">Somente Inativos</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleFilter}
              fullWidth
              sx={{ height: "40px" }}
            >
              Filtrar
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* TABELA COM COLUNAS CONDICIONAIS PARA MOBILE */}
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ overflowX: "auto" }}
      >
        <Table sx={{ minWidth: { xs: "100%", md: 800 } }}>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              {/* Oculto no Mobile */}
              <TableCell
                sx={{
                  fontWeight: "bold",
                  display: { xs: "none", md: "table-cell" },
                }}
              >
                Título
              </TableCell>

              {/* Sempre visível */}
              <TableCell sx={{ fontWeight: "bold" }}>Descrição</TableCell>

              {/* Oculto no Mobile */}
              <TableCell
                sx={{
                  fontWeight: "bold",
                  display: { xs: "none", md: "table-cell" },
                }}
              >
                Categoria
              </TableCell>

              {/* Sempre visível */}
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>

              {/* Oculto no Mobile */}
              <TableCell
                sx={{
                  fontWeight: "bold",
                  display: { xs: "none", md: "table-cell" },
                }}
              >
                Ativo
              </TableCell>

              {/* Sempre visível */}
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : (
              cases.map((item: any) => (
                <TableRow key={item.id} hover>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      display: { xs: "none", md: "table-cell" },
                    }}
                  >
                    {item.title}
                  </TableCell>

                  <TableCell sx={{ minWidth: { xs: 120, md: 200 } }}>
                    <ExpandableCell text={item.description} />
                  </TableCell>

                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    {item.category}
                  </TableCell>

                  <TableCell>{item.status}</TableCell>

                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    {item.is_active}
                  </TableCell>

                  <TableCell align="right">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                      }}
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        component={Link}
                        href={`/dashboard/editar/${item.id}`}
                      >
                        Editar
                      </Button>

                      {/* Oculta o botão de toggle textual no mobile para economizar espaço */}
                      <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        <Button
                          size="small"
                          variant="text"
                          color={
                            item.is_active === "Ativo" ? "success" : "warning"
                          }
                          onClick={() => handleToggleActive(item.id)}
                        >
                          {item.is_active}
                        </Button>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
            {!loading && cases.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

const ExpandableCell = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);
  const isLongText = text?.length > 80;

  return (
    <Box>
      <Typography
        variant="body2"
        sx={{
          display: !expanded ? "-webkit-box" : "block",
          WebkitLineClamp: !expanded ? 2 : "none",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: { xs: 140, md: 300 },
        }}
      >
        {text}
      </Typography>
      {isLongText && (
        <Button
          size="small"
          onClick={() => setExpanded(!expanded)}
          sx={{ fontSize: "0.7rem", p: 0, mt: 0.5, textTransform: "none" }}
        >
          {expanded ? "Ver menos" : "Ver mais"}
        </Button>
      )}
    </Box>
  );
};
