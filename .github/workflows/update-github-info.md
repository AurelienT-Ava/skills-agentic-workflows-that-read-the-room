---
name: update-github-info
description: Keep Mona's GitHub Info content current using official GitHub sources.
on:
  schedule:
    - cron: "17 9 * * *"
  workflow_dispatch:
permissions:
  contents: read
  pull-requests: read
engine: copilot
network:
  allowed:
    - defaults
    - github.blog
    - github.com
    - awesome-copilot.github.com
tools:
  github:
    toolsets: [repos]
  bash: [curl]
  edit:
safe-outputs:
  create-pull-request:
    draft: true
    title-prefix: "[mona] "
    allowed-files:
      - site/content/github-info.md
---

# Update Mona's GitHub Info

Keep the site's update feed current and reviewable.

1. Read `notes/mona-notes.md` and follow its editorial guidance.
2. Use GitHub repository API tools to read repository guidance or reference files when needed. Do not use terminal, CLI, or sandboxed commands for that repository guidance.
3. Use the bash tool with `curl` to fetch and read `https://github.blog/latest/`.
4. Use the bash tool with `curl` to fetch and read `https://github.blog/changelog/`.
5. Use the bash tool with `curl` to fetch and read `https://awesome-copilot.github.com/workflows/`.
6. Identify the most useful recent Blog, Changelog, and Awesome Copilot workflow items for developers. Keep summaries short and practical, include the source for every item, and avoid duplicating existing entries unless the source has materially changed.
7. Update only `site/content/github-info.md` with the curated GitHub information. Preserve its existing editorial sections and Markdown style.
8. When there is a meaningful update, use the `create_pull_request` safe output to propose the change in a pull request for Mona to review. Do not write directly to `main`.
9. If no meaningful update is available, leave the file unchanged and do not open a pull request.