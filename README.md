# What is it?
- It's a simple real-time chat
- Requires Github account for login
- It works with websockets

### Preview:

https://github.com/circles-00/real-time-chat/assets/42126548/fda8e547-5cff-419b-9fc3-01e7a8358e39

### TODO:
- Needs more work, it's far from production-ready, this is just a simple app to demonstrate basic fullstack principles, obviously some of the code needs refactoring & restructuring

### ⚠️ Before Starting

Requirements
 - Node version >=18.12.1
 - Yarn >=1.22.15

Before starting the project
 - Copy `apps/web/.env.example` to `apps/web/.env.local`
 - Make sure you have the correct datasource config in `apps/api/datasources/db.datasource.ts`

Install project dependencies
```bash
yarn
```

### Structure

```
├── 📁 apps
  ├── 📁 api
  ├── 📁 web
  ├── ...
├── 📁 packages
├── package.json
```

## Running the project 🏃‍

```bash
 yarn dev
```
