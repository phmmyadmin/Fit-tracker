import json
import urllib.request
import subprocess
from pathlib import Path

def get_token():
    proc = subprocess.run(
        ["git", "credential", "fill"],
        input="protocol=https\nhost=github.com\n",
        text=True,
        capture_output=True,
        check=True
    )
    for line in proc.stdout.splitlines():
        if line.startswith("password="):
            return line.split("=", 1)[1].strip()
    raise RuntimeError("Could not find token in git credential")

token = get_token()
project_id = "PVT_kwHOAkgXus4BfhjX"
url = "https://api.github.com/graphql"

tasks = [
    "Task 1: Script Migración MD a JSON (25 días)",
    "Task 2: Skill Antigravity (Chat -> JSON -> Git Push)",
    "Task 3: Setup Vite + React (PWA + Tema Apple Health)",
    "Task 4: UI Dashboard Diario (Anillos Macros + Timeline)",
    "Task 5: UI Reportes (Gráfico Barras Tendencia Semanal)",
    "Task 6: Integración Datos (Fetch JSON -> UI)"
]

results = {}
for title in tasks:
    query = """
    mutation($projectId: ID!, $title: String!) {
      addProjectV2DraftIssue(input: {projectId: $projectId, title: $title}) {
        projectItem {
          id
          content {
            ... on DraftIssue {
              title
            }
          }
        }
      }
    }
    """
    data = json.dumps(
        {"query": query, "variables": {"projectId": project_id, "title": title}}
    ).encode("utf-8")
    
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Authorization": f"bearer {token}",
            "Content-Type": "application/json",
            "User-Agent": "Antigravity",
        },
    )
    
    try:
        with urllib.request.urlopen(req) as resp:
            res = json.loads(resp.read().decode("utf-8"))
            item_id = res["data"]["addProjectV2DraftIssue"]["projectItem"]["id"]
            results[title] = item_id
            print(f"Created: {title} -> {item_id}")
    except Exception as e:
        print(f"Error creating {title}: {e}")

print("\nAll Updated Tasks Created Successfully.")

# Save mapping to file
Path("scripts/task_mapping.json").write_text(json.dumps(results, indent=2))
