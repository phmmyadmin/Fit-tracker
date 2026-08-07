---
name: feature-executor
description: Implements tasks on isolated Git feature branches, moves GitHub Project task status to "In Progress", commits changes, pushes to origin, and opens Pull Requests.
---

# Feature Executor Skill (Phase 3)

This skill handles the actual coding, Git branch orchestration, commit hygiene, PR creation, and project status progression in GitHub Projects V2.

## GitHub Project Details
- **Owner**: `phmmyadmin`
- **Project ID**: `PVT_kwHOAkgXus4BfhjX`
- **Status Field ID**: `PVTSSF_lAHOAkgXus4BfhjXzhZz28U`
- **Option IDs**:
  - `Todo`: `f75ad846`
  - `In Progress`: `47fc9ee4`
  - `Done`: `98236657`

## Workflow

### 1. Move Task Status to "In Progress" in GitHub Project
Execute GraphQL mutation to set item status to `In Progress` (`47fc9ee4`):

```python
import json
import os
import urllib.request

token = os.environ.get("GITHUB_PERSONAL_ACCESS_TOKEN", "")
url = "https://api.github.com/graphql"
project_id = "PVT_kwHOAkgXus4BfhjX"
status_field_id = "PVTSSF_lAHOAkgXus4BfhjXzhZz28U"
in_progress_option_id = "47fc9ee4"
item_id = "<item_id>"

mutation = f"""mutation {{
  updateProjectV2ItemFieldValue(
    input: {{
      projectId: "{project_id}"
      itemId: "{item_id}"
      fieldId: "{status_field_id}"
      value: {{
        singleSelectOptionId: "{in_progress_option_id}"
      }}
    }}
  ) {{
    projectV2Item {{
      id
    }}
  }}
}}"""

req = urllib.request.Request(
    url,
    data=json.dumps({"query": mutation}).encode("utf-8"),
    headers={
        "Authorization": f"bearer {token}",
        "Content-Type": "application/json",
        "User-Agent": "Antigravity",
    },
)
with urllib.request.urlopen(req) as resp:
  res = json.loads(resp.read().decode("utf-8"))
  print(res)
```

### 2. Branch Management
- Check current git status: `git status`.
- Ensure workspace is clean and on `main` branch.
- Pull latest changes: `git pull origin main`.
- Create a new feature branch:
  ```bash
  git checkout -b feature/<feature-name>
  ```

### 3. Code Implementation & Verification
- Modify code according to specification.
- Adhere strictly to project styling (Light glassmorphism, clean typography, responsive layout, zero broken imports).
- For Gemini LLM prompts: Always instruct Gemini to calculate **TOTAL accumulated macros for the entire requested quantity** across all foods in the world.
- For Supabase & GitHub Pages: Always implement direct client-side Supabase operations (`saveIntakesToSupabase`, `deleteIntakeFromSupabase`, `updateIntakeInSupabase`, `saveWeightToSupabase`) so static hosting works without a local node backend server.
- Verify changes by running build:
  ```bash
  npm run build
  ```
  Ensure 0 build errors before proceeding.

### 4. Git Commits & Push
- Stage specific changed files: `git add <files>`.
- Commit with conventional commit format:
  ```bash
  git commit -m "feat(scope): detailed description of work done"
  ```
- Push feature branch to GitHub remote:
  ```bash
  git push origin feature/<feature-name>
  ```

### 5. Create Pull Request
Create a PR against `main` using GitHub MCP (`create_pull_request`).
