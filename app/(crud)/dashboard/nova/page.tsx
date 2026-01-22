"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Stack,
  CircularProgress,
} from "@mui/material";
import {
  postNewCase,
  updateCaseById,
  getCategories,
  getCaseId,
} from "@/services/api-laravel";
import { useRouter, useParams } from "next/navigation";

export default function CaseFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id; // Captura o ID da URL se existir
  const isEdit = Boolean(id);

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit); // Loading inicial para busca
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    status: "aberto",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Carrega categorias sempre
        const cats = await getCategories();
        setCategories(cats.data || []);

        // 2. Se for edição, busca os dados do caso específico
        if (isEdit && id) {
          const res = await getCaseId(id as string);
          // Mapeie os campos conforme o retorno da sua API
          setFormData({
            title: res.data.title || "",
            description: res.data.description || "",
            category_id: res.data.category_id || "",
            status: res.data.status || "aberto",
          });
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setFetching(false);
      }
    };
    loadData();
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit && id) {
        await updateCaseById(id as string, formData);
      } else {
        await postNewCase(formData);
      }
      router.push("/dashboard");
      router.refresh(); // Garante que a lista seja atualizada
    } catch (err) {
      alert("Erro ao salvar ocorrência. Verifique os campos.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, maxWidth: 500, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 4 }} elevation={3}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "bold", color: "#1a237e" }}
        >
          {isEdit ? "Editar Ocorrência" : "Nova Ocorrência"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Título"
              fullWidth
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <TextField
              label="Descrição"
              fullWidth
              multiline
              rows={4}
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <TextField
              select
              label="Categoria"
              fullWidth
              required
              value={formData.category_id}
              onChange={(e) =>
                setFormData({ ...formData, category_id: e.target.value })
              }
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Status"
              fullWidth
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <MenuItem value="aberto">Aberto</MenuItem>
              <MenuItem value="em_andamento">Em Andamento</MenuItem>
              <MenuItem value="concluido">Concluído</MenuItem>
            </TextField>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Button onClick={() => router.back()} color="inherit">
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ backgroundColor: "#1a237e" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ backgroundColor: "#1a237e" }}
                >
                  {loading
                    ? "Processando..."
                    : isEdit
                      ? "Salvar Alterações"
                      : "Cadastrar Ocorrência"}
                </Button>
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
