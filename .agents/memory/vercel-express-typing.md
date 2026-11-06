---
name: Vercel Express typing
description: Vercel's TypeScript check can resolve an imported Express 5 app as non-callable in a root serverless function.
---

In this workspace, deriving the Vercel handler request and response types from an imported Express app caused the provider's TypeScript check to infer `never`; invoking the app or its `.handle` member also failed in the root function context, even though the API package typecheck passed. Express remains callable at runtime, so keep a narrow cast at the Node HTTP boundary.

**Why:** The root Vercel function is typechecked separately from the API package and can see a different Express type surface.

**How to apply:** When a Vercel build reports `Express` is not callable, use `IncomingMessage` and `ServerResponse` for the function signature, then cast only the imported app to that Node handler shape.
