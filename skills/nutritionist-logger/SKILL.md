---
name: nutritionist-logger
description: Best practices and architecture guide for Fit Tracker - food logging, Gemini LLM parsing, Supabase DB operations, and GitHub Pages deployment.
---

# Nutritionist Logger Skill

This skill documents the architecture and best practices for developing and maintaining the Fit Tracker application.

## 1. GitHub Project V2 Workflow
- **Project Board**: `@phmmyadmin's tasks` (`PVT_kwHOAkgXus4BfhjX`).
- **Status Field**: `PVTSSF_lAHOAkgXus4BfhjXzhZz28U`.
- **Status Options**:
  - `Todo`: `f75ad846`
  - `In Progress`: `47fc9ee4`
  - `Done`: `98236657`
- **Rule**: Do NOT create repository issues. Create Draft Items directly in Project V2 and transition their Status field via GraphQL API.

## 2. Gemini 1.5/2.0/3.6 Flash IA Parsing
- **Model Fallbacks**: Try `gemini-flash-latest`, `gemini-3.6-flash`, `gemini-flash-lite-latest`.
- **Generic Total Macro Prompt Directive**: Always instruct Gemini LLM to calculate **TOTAL accumulated macros for the entire requested quantity** across all foods in the world (never per-unit, never per-100g).

## 3. Serverless Supabase Data Layer
- **Static Hosting Support (GitHub Pages)**: Always use direct client-side Supabase mutations (`saveIntakesToSupabase`, `deleteIntakeFromSupabase`, `updateIntakeInSupabase`, `saveWeightToSupabase`) so static hosting works without a local node backend server.
- **UUID Row Targeting**: Always map `id: i.id` onto loaded intake items so deletion and updates target the exact database row (`eq('id', targetId)`).
