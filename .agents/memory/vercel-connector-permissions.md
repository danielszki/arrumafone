---
name: Vercel connector permissions
description: A connected Vercel integration may not be authorized to create or list projects and teams.
---

A Vercel integration showing as connected does not guarantee project-management permissions. If project creation or team access returns 403 and reconnection is unavailable, the user may need to import the existing repository in Vercel or grant the account suitable access.

**Why:** The ArrumaFone Vercel connection was ready but rejected project creation and team listing with 403.

**How to apply:** Before claiming a Vercel deployment is ready, verify that the connected account can access the project and that a production deployment reaches Ready.
