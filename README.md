# Agentic IAM: Command Center (Frontend)

React + TypeScript + Vite + Tailwind dashboard for the Agentic IAM Gateway.

## Run

    npm install
    npm run dev

Opens at http://localhost:5173

## Status

The UI currently runs on demo data from `src/data/mockData.ts`.
Connecting it to the Rust gateway (see backend `docs/openapi.yaml`)
is in progress.

## Pages

- Overview
- Review queue
- Agents and trust
- Audit ledger
- Policies and chaos

## Config

Copy `.env.example` to `.env` and adjust values.