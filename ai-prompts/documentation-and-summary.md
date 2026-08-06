# AI Prompts — Documentation and Summary

Final-phase prompts for submission artifacts. I edited AI drafts heavily for accuracy and tone.

---

## Entry 1 — Submission README

**Prompt:**
```
Write a submission README for QA AI assessment. Include: overview, checklist mapping 
each deliverable to a file, quick start, test coverage tables, execution evidence paths, 
AI usage summary. Tone: professional but human.
```

**AI response (summary):**  
Structured readme with checklist table, folder tree, run commands.

**Edits I made:**  
- Updated all paths to `Projectstructure/` after rename  
- Added link to `tool-workflow.md` and `defect-report.md`  
- Removed generic filler — kept only what evaluators need to run tests once

---

## Entry 2 — project-info.md (Part A)

**Prompt:**
```
Fill all 10 Part A workflow sections in project-info.md using my actual repo: 
context, requirements, planning, manual design, automation, validation, test data, 
debugging, privacy, reuse.
```

**AI response (summary):**  
Sectioned document with coverage and risk tables.

**Edits I made:**  
Replaced outdated Prism/fixture references with Mocha harness. Added submission artifacts map and latest execution stats (12/12 pass).

---

## Entry 3 — tool-workflow.md

**Prompt:**
```
Write tool-workflow.md describing how I used Cursor across the assessment. Include 
phases, what worked, prompt patterns, model selection, honest note about framework 
migration. Should read like a real engineer's notes not a template.
```

**AI response (summary):**  
Phased workflow doc with tables and iteration examples.

**Edits I made:**  
Added my name, dates, and specific failure examples (422 billing, double confirm). Removed overly corporate language.

---

## Entry 4 — Defect report from exploratory notes

**Prompt:**
```
Turn my exploratory findings into a defect report with RCA. Items: double Confirm UX, 
password breach 422, billing sandbox TG/Hesselbury, occasional register→login redirect. 
Mark as testability observations not production bugs.
```

**AI response (summary):**  
`defect-report.md` with OBS-001 through OBS-004, mitigation column, summary table.

**Reason for format:**  
Shows investigation skill without filing fake bugs against a practice app.

---

## Entry 5 — Submission readiness review

**Prompt (this session):**
```
Review my repo against submission guidelines: README, manual cases, API scenarios, 
automation opportunities, UI/API flow, exploratory notes, defect report, ai-prompts, 
tool-workflow.md, execution evidence. Make it submission-ready for 90%+ score. 
Documentation should feel natural not template-generated.
```

**AI response (summary):**  
Gap analysis + created missing docs, ran full suite, fixed npm test script, updated ai-prompts with iteration story.

**My validation plan before portal upload:**  
1. Re-run `npm test` locally  
2. Open Mochawesome report  
3. Push public GitHub with small commits per phase  
4. Fill submission date in project-info.md  
5. Paste repo URL on assessment portal

---

## Token budget note

Used **Auto/Composer** for CSV, README, and planning docs. Reserved **premium model** for Playwright code and debugging sessions. Summarized each chat into this folder before starting the next — kept context clean and created evaluator-friendly audit trail.
