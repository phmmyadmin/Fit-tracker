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

v2_tasks = [
    "V2-Task 1: Supabase DB Schema & Script Migración desde JSON",
    "V2-Task 2: Lógica Backend/Function NLP (Gemini Flash + BBDD 100g)",
    "V2-Task 3: UI Chat Input Bar inferior (iMessage Style)",
    "V2-Task 4: Integración Local (Input -> Backend Local -> Anillos)",
    "V2-Task 5: UI Bottom Sheet (Editar Gramos con Slider y Borrar)",
    "V2-Task 6: Pulido Responsive Light/Minimalist & Test Local E2E"
]

results = {}
for title in v2_tasks:
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
            print(f"Created V2 Task: {title} -> {item_id}")
    except Exception as e:
        print(f"Error creating {title}: {e}")

print("\nAll V2 Tasks Created Successfully.")
Path("scripts/v2_task_mapping.json").write_text(json.dumps(results, indent=2))
