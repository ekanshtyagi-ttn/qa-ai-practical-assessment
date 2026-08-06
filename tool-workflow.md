# AI Tool Workflow

**Candidate:** Ekansh Tyagi  
**Primary tool:** [Cursor](https://cursor.com/)

This file satisfies the assessment **tool-workflow.md** deliverable. Full workflow documentation (rules, phases, model selection, prompt library mapping, and assessor summary) is maintained in:

→ **[cursor-tool.md](./cursor-tool.md)**

## Quick reference

| Phase | What I did | Artifact |
|-------|------------|----------|
| Understand | Extracted Part A/B deliverables and AC1/AC2 from the brief | `ai-prompts/requirements-and-planning.md` |
| Design | Manual CSV first, then UI/API scenario design | `FunctionalTestcase.csv`, `ai-prompts/test-design*.md` |
| Automate | Playwright POM + API clients + Mocha specs | `Playwright Framework + Report/` |
| Debug | Headed UI runs, API 422 probes, prompt iteration | `ai-prompts/automation-and-debugging.md` |
| Document & evidence | project-info, reports, screenshots | `project-info.md`, `execution-reports/` |

**Prompt iteration example:** First checkout test-design prompt used a single Confirm click. After exploratory testing, I refined prompts and automation to handle **double Confirm** for invoice generation.
