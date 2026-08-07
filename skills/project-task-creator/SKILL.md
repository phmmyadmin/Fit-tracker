---
name: project-task-creator
description: Automatically creates tasks in GitHub Projects V2 (@phmmyadmin's tasks - Project #1) using GraphQL API without creating repository issues.
---

# Project Task Creator Skill (Phase 2)

This skill converts atomic tasks defined in Phase 1 into tracked Draft Items in the user's GitHub Project board (`@phmmyadmin's tasks`).

> [!IMPORTANT]
> **RULE**: Do NOT create standalone GitHub repository issues (`issue_write`). Always interact directly with GitHub Project V2 (`PVT_kwHOAkgXus4BfhjX`) by inserting Draft Items so tasks stay organized inside the user's project board.

## GitHub Project Details
- **Owner**: `phmmyadmin`
- **Project Number**: `1`
- **Project Title**: `@phmmyadmin's tasks`
- **Project V2 GraphQL ID**: `PVT_kwHOAkgXus4BfhjX`
- **Status Field ID**: `PVTSSF_lAHOAkgXus4BfhjXzhZz28U`
- **Option IDs**:
  - `Todo`: `f75ad846`
  - `In Progress`: `47fc9ee4`
  - `Done`: `98236657`

## Workflow

### 1. Read Task Breakdown
Read the approved atomic tasks list generated in Phase 1 (`feature-planner`).

### 2. Create Draft Items in GitHub Project V2
Execute GraphQL mutation to insert each task into Project V2:

```python
import json
import os
import urllib.request

token = os.environ.get("GITHUB_PERSONAL_ACCESS_TOKEN", "")
project_id = "PVT_kwHOAkgXus4BfhjX"
url = "https://api.github.com/graphql"

tasks = [
    "Task 1: Add new state variable",
    "Task 2: Build UI component",
]

created_items = []
for title in tasks:
  mutation = f"""mutation {{
    addProjectV2DraftIssue(input: {{projectId: "{project_id}", title: "{title}"}}) {{
      projectItem {{
        id
        content {{
          ... on DraftIssue {{
            title
          }}
        }}
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
    item = res["data"]["addProjectV2DraftIssue"]["projectItem"]
    created_items.append({"title": title, "id": item["id"]})
    print(f"Created task '{title}' with Item ID: {item['id']}")
```

### 3. Record Task IDs
Keep a mapping of:
- Task Title -> GitHub Project Item ID (`PVTI_...`)

### 4. Transition to Execution (Phase 3)
Confirm created tasks with the user and move to `feature-executor` (Phase 3).
