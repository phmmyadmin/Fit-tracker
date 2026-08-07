---
name: feature-workflow
description: End-to-end 4-stage feature workflow (1. Plan & Interview -> 2. GitHub Project Tasks -> 3. Branch/Code/Commit/PR -> 4. Review & QA). Trigger whenever the user wants to plan, build, and deliver a new feature.
---

# Master Feature Workflow Suite

This master skill orchestrates the end-to-end feature creation lifecycle across 4 distinct phases:

```mermaid
flowchart LR
    A["1. Feature Planner\n(Interview & Plan)"] --> B["2. Task Creator\n(GitHub Projects V2)"]
    B --> C["3. Feature Executor\n(Branch, Code, PR)"]
    C --> D["4. Feature Reviewer\n(Audit & PR Review)"]
```

## Phase Breakdown & Skills Triggered

| Phase | Skill | Primary Goal | Key Deliverable |
|---|---|---|---|
| **1. Plan** | `feature-planner` | Interactive Q&A interview with user until requirements are fully clear | Detailed Feature Specification + Atomic Task Breakdown |
| **2. Tasks** | `project-task-creator` | Create tracked items in `@phmmyadmin's tasks` (#1) via GraphQL | GitHub Project V2 Draft Items (`PVTI_...`) |
| **3. Execute** | `feature-executor` | Create git feature branch, set status `In Progress`, implement code, build check, commit, push & PR | Git Branch + Commits + GitHub PR + Status `In Progress` |
| **4. Review** | `feature-reviewer` | Code diff audit, visual check, build test, PR merge, set status `Done` | QA Audit Report + GitHub PR Approval/Merge + Status `Done` |

---

## Core Guidelines & Architectural Directives

> [!IMPORTANT]
> 1. **No Standalone Repository Issues**: Do NOT use `issue_write` to create issues on the repository. Always interact directly with GitHub Project V2 (`PVT_kwHOAkgXus4BfhjX`).
> 2. **Generic Architectural Solutions**: Never write hardcoded hacks or specific fixes for single items (e.g. specific foods). Solve issues generically at the system/prompt/database level.
> 3. **LLM Total Macro Rule**: Always instruct Gemini LLM to return **TOTAL accumulated macros for the entire requested quantity** across all foods in the world.
> 4. **Serverless Supabase First**: Always write direct Supabase client mutations (`saveIntakesToSupabase`, `deleteIntakeFromSupabase`, `updateIntakeInSupabase`, `saveWeightToSupabase`) so static hosting on GitHub Pages works seamlessly without a local node backend.
