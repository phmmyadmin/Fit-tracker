import json
import urllib.request
import subprocess

# Get token from git credential
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
    "Task 1 (Data): Migración de Histórico (Python script to generate data/food_log.json)",
    "Task 2 (Skill): Creación de skill nutritionist-logger para Antigravity",
    "Task 3 (Setup): Proyecto web Vite + React (UI premium con glassmorphism)",
    "Task 4 (UI): Dashboard Diario (Anillos de progreso y lista)",
    "Task 5 (UI): Reportes Semanales y Planificador",
    "Task 6 (Integración): Conectar componentes UI estáticos al JSON"
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

print("\nAll Tasks Created Successfully:")
print(json.dumps(results, indent=2))
