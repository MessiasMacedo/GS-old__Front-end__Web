/**
 * Utilitários da FASE FICTÍCIA. Simulam a latência de uma API de verdade
 * para a interface já nascer tratando "carregando" e erros.
 * Quando o Supabase entrar, este arquivo deixa de ser usado.
 */
export const esperar = (ms = 350) => new Promise((r) => setTimeout(r, ms));
export const novoId = () =>
  (globalThis.crypto?.randomUUID?.() ?? String(Date.now() + Math.random()));
