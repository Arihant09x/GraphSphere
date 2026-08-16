````md
# GraphSphere

<div align="center">

### Explore the connections behind developers, projects, and technologies.

GraphSphere is a modern knowledge-graph explorer for discovering, searching, and visualizing relationships between developers, projects, technologies, repositories, skills, and other graph entities.

[![Next.js](https://img.shields.io/badge/Next.js-14%2B-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Flow](https://img.shields.io/badge/React%20Flow-11%2B-FF0072?logo=react)](https://reactflow.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3%2B-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5%2B-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![License](https://img.shields.io/badge/License-MIT-22C55E)](LICENSE)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Repository Structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Application Routes](#application-routes)
- [API Integration](#api-integration)
- [Graph Experience](#graph-experience)
- [Authentication](#authentication)
- [Search](#search)
- [State Management](#state-management)
- [UI and Accessibility](#ui-and-accessibility)
- [Troubleshooting](#troubleshooting)
- [Production Deployment](#production-deployment)
- [Security](#security)
- [Performance](#performance)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## Overview

GraphSphere is a developer-intelligence platform built around a graph data model.

Instead of displaying developers, projects, and technologies as isolated records, GraphSphere helps users understand how those entities are connected. Users can search the graph, inspect individual nodes, view relationships, discover recommendations, and find paths between entities.

The platform is designed for use cases such as:

- Discovering developers with specific skills.
- Exploring project contributors and technology stacks.
- Understanding relationships between graph entities.
- Finding connections between two developers or projects.
- Identifying related technologies and recommendations.
- Navigating large graph datasets through an interactive interface.

The backend uses CognoDB as the graph-data source, while the frontend provides the interactive exploration experience.

---

## Features

### Interactive Graph Explorer

- Visualize graph nodes and relationships with React Flow.
- Zoom, pan, and navigate through the graph.
- View graph controls and a minimap.
- Highlight the selected entity.
- Open entity details from graph nodes.
- Deep-link selected nodes through URL query parameters.

### Global Search

- Search developers, projects, and technologies.
- Search results are displayed in a unified dropdown.
- Search input uses debouncing to reduce unnecessary API requests.
- Results display entity names and types.
- Selecting a result opens the entity in the graph explorer.
- Supports loading, error, and empty-result states.

### Entity Lists

Dedicated list views are available for:

- Developers.
- Projects.
- Technologies.

Each list includes:

- Responsive cards.
- Loading skeletons.
- Error states.
- Empty states.
- Entity selection.
- Navigation to the selected entity's graph view.

### Relationship Discovery

- Developer network visualization.
- Shortest-path discovery between two graph nodes.
- Relationship labels on graph edges.
- Recommendations for related graph entities.
- Recommendation reasons and scores when available.

### Authentication

- Login page.
- Registration page.
- Protected explorer route.
- Authenticated user information.
- Logout functionality.
- Redirects for unauthenticated users.

### Responsive Interface

- Desktop sidebar navigation.
- Mobile slide-out navigation.
- Responsive graph and entity cards.
- Touch-friendly graph interactions.
- Light and dark theme support.

---

## Screenshots

Add project screenshots to the `docs/screenshots/` directory and update the paths below.

### Login

![GraphSphere login page](docs/screenshots/login.png)

### Explorer

![GraphSphere explorer](docs/screenshots/explorer.png)

### Graph Canvas

![GraphSphere graph canvas](docs/screenshots/graph-canvas.png)

### Developer List

![GraphSphere developer list](docs/screenshots/developers.png)

### Project List

![GraphSphere project list](docs/screenshots/projects.png)

### Technology List

![GraphSphere technology list](docs/screenshots/technologies.png)

### Recommendations

![GraphSphere recommendations panel](docs/screenshots/recommendations.png)

---

## Technology Stack

### Frontend

| Category            | Technology              |
| ------------------- | ----------------------- |
| Framework           | Next.js App Router      |
| UI library          | React                   |
| Language            | TypeScript              |
| Styling             | Tailwind CSS            |
| Animation           | Framer Motion           |
| Graph visualization | React Flow              |
| Data fetching       | TanStack React Query    |
| HTTP client         | Axios                   |
| Icons               | Lucide React            |
| Notifications       | Sonner                  |
| Theme management    | next-themes             |
| UI primitives       | Radix UI components     |
| Validation          | React Hook Form and Zod |

### Backend

| Category       | Technology          |
| -------------- | ------------------- |
| Runtime        | Node.js             |
| API framework  | Express             |
| Language       | TypeScript          |
| Graph database | CognoDB             |
| Query language | openCypher          |
| Authentication | JWT                 |
| Transport      | HTTP/HTTPS REST API |

> Backend implementation details may vary depending on the backend repository and deployment environment.

---

## Architecture

GraphSphere follows a modular frontend architecture.

```text
┌──────────────────────────────┐
│       Next.js Frontend       │
│                              │
│  Pages, UI, Graph, Search    │
│  Lists, Auth, Theme, Layout  │
└───────────────┬──────────────┘
                │
                ▼
┌──────────────────────────────┐
│       Axios API Layer        │
│                              │
│ Developer, Project, Graph,   │
│ Technology, Search, Auth API │
└───────────────┬──────────────┘
                │
                ▼
┌──────────────────────────────┐
│     React Query Hooks        │
│                              │
│ Cache, loading, errors,      │
│ refetching, query state      │
└───────────────┬──────────────┘
                │
                ▼
┌──────────────────────────────┐
│       Backend API            │
│                              │
│ Auth, search, entities,      │
│ relationships, recommendations│
└───────────────┬──────────────┘
                │
                ▼
┌──────────────────────────────┐
│          CognoDB             │
│                              │
│ Nodes, relationships, paths  │
│ and graph traversal          │
└──────────────────────────────┘
```
````

### Main responsibilities

1. **Next.js frontend**

   Handles routing, page rendering, user interaction, responsive layout, and client-side state.

2. **Axios API layer**

   Provides feature-specific API modules for authentication, developers, projects, technologies, search, paths, and recommendations.

3. **TanStack React Query**

   Manages server state, caching, loading states, errors, refetching, and query synchronization.

4. **React Flow**

   Converts graph nodes and relationships into an interactive visual graph.

5. **Backend API**

   Handles authentication, graph queries, entity retrieval, recommendations, and shortest-path operations.

6. **CognoDB**

   Stores graph entities and relationships and supports graph traversal.

---

## Repository Structure

```text
frontend/
├── src/
│   ├── api/
│   │   ├── auth.api.ts
│   │   ├── axios.ts
│   │   ├── developer.api.ts
│   │   ├── graph.api.ts
│   │   ├── project.api.ts
│   │   ├── search.api.ts
│   │   └── technology.api.ts
│   │
│   ├── app/
│   │   ├── explorer/
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── auth/
│   │   ├── developer/
│   │   ├── graph/
│   │   ├── layout/
│   │   ├── project/
│   │   ├── search/
│   │   ├── technology/
│   │   ├── ui/
│   │   └── Explorer.tsx
│   │
│   ├── hooks/
│   │   ├── unwrap.ts
│   │   ├── useAuth.tsx
│   │   ├── useDeveloper.ts
│   │   ├── useDevelopers.ts
│   │   ├── useGraph.ts
│   │   ├── useGraphDeveloper.ts
│   │   ├── useGraphPath.ts
│   │   ├── useProjects.ts
│   │   ├── useRecommendations.ts
│   │   ├── useSearch.ts
│   │   ├── useTechnologies.ts
│   │   └── useTechnology.ts
│   │
│   ├── lib/
│   │   ├── formatters.ts
│   │   ├── queryKeys.ts
│   │   └── utils.ts
│   │
│   ├── providers/
│   │   ├── AppProviders.tsx
│   │   ├── QueryProvider.tsx
│   │   └── ThemeProvider.tsx
│   │
│   └── types/
│       ├── api.ts
│       ├── auth.ts
│       ├── developer.ts
│       ├── graph.ts
│       ├── project.ts
│       └── technology.ts
│
├── .env.example
├── package.json
├── README.md
└── LICENSE
```

---

## Prerequisites

Before running GraphSphere locally, install the following:

- Node.js 18 or later.
- npm, pnpm, or yarn.
- A running GraphSphere backend API.
- A configured CognoDB instance.
- Access to the required authentication and graph endpoints.

Verify your Node.js installation:

```bash
node --version
npm --version
```

---

## Installation

### 1. Clone the repository

```bash
git clone <FRONTEND_REPOSITORY_URL>
cd graphsphere-frontend
```

Replace `<FRONTEND_REPOSITORY_URL>` with the actual repository URL.

### 2. Install dependencies

If the project uses npm:

```bash
npm install
```

If the repository contains a `pnpm-lock.yaml` or `yarn.lock` file, use the matching package manager instead:

```bash
pnpm install
```

or:

```bash
yarn install
```

### 3. Configure environment variables

Create a local environment file:

```bash
cp .env.example .env.local
```

Then update the values in `.env.local`.

### 4. Start the development server

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### Variable reference

| Variable              | Required | Description                             |
| --------------------- | -------: | --------------------------------------- |
| `NEXT_PUBLIC_API_URL` |      Yes | Base URL of the GraphSphere backend API |

The exact variable name must match the configuration used by `src/api/axios.ts`.

### Security warning

Variables beginning with `NEXT_PUBLIC_` are exposed to the browser. Do not store passwords, private keys, database credentials, or JWT secrets in public environment variables.

Never commit `.env.local` to version control.

---

## Running the Application

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Start the production server

```bash
npm run start
```

### Linting

```bash
npm run lint
```

> Confirm the available scripts in `package.json` before using these commands.

---

## Application Routes

| Route                                      | Access    | Description             |
| ------------------------------------------ | --------- | ----------------------- |
| `/`                                        | Public    | Application entry route |
| `/login`                                   | Public    | User login              |
| `/register`                                | Public    | User registration       |
| `/explorer`                                | Protected | Main graph explorer     |
| `/explorer?tab=developers`                 | Protected | Developer list          |
| `/explorer?tab=projects`                   | Protected | Project list            |
| `/explorer?tab=technologies`               | Protected | Technology list         |
| `/explorer?nodeType=developer&nodeId=<id>` | Protected | Selected graph node     |

The explorer also uses query parameters to preserve selected entities and list tabs.

---

## API Integration

GraphSphere uses Axios for communication with the backend. API calls are organized by feature inside `src/api/`.

### API module responsibilities

- `auth.api.ts` handles login, registration, and authenticated-user requests.
- `developer.api.ts` handles developer lists, details, and networks.
- `project.api.ts` handles project lists and details.
- `technology.api.ts` handles technology lists and details.
- `search.api.ts` handles graph search.
- `graph.api.ts` handles paths and recommendations.
- `axios.ts` provides the shared Axios instance and base configuration.

### API route table

| Feature            | Frontend method                | HTTP method | Endpoint                     |
| ------------------ | ------------------------------ | ----------: | ---------------------------- |
| Developers         | `developerApi.list()`          |       `GET` | `/developers`                |
| Developer details  | `developerApi.get(id)`         |       `GET` | `/developers/:id`            |
| Developer network  | `developerApi.network(id)`     |       `GET` | `/developers/:id/network`    |
| Projects           | `projectApi.list()`            |       `GET` | `/projects`                  |
| Project details    | `projectApi.get(id)`           |       `GET` | `/projects/:id`              |
| Technologies       | `technologyApi.list()`         |       `GET` | `/technologies`              |
| Technology details | `technologyApi.get(id)`        |       `GET` | `/technologies/:id`          |
| Search             | `searchApi.search(query)`      |       `GET` | `/search?q=<query>`          |
| Shortest path      | `graphApi.path(fromId, toId)`  |       `GET` | `/graph/path?fromId=&toId=`  |
| Recommendations    | `graphApi.recommendations(id)` |       `GET` | `/graph/recommendations/:id` |
| Login              | `authApi.login(credentials)`   |      `POST` | `/auth/login`                |
| Register           | `authApi.register(data)`       |      `POST` | `/auth/register`             |
| Current user       | `authApi.me()`                 |       `GET` | `/auth/me`                   |

If the backend is mounted under `/api/v1`, the complete endpoint may look like:

```text
http://localhost:5000/api/v1/developers
```

---

## Graph Experience

The graph explorer is powered by React Flow.

### Nodes

Nodes represent graph entities such as:

- Developers.
- Projects.
- Technologies.
- Companies.
- Skills.
- Repositories.
- Topics.

Nodes are styled according to their entity type.

### Edges

Edges represent relationships between nodes, such as:

- `WORKS_ON`
- `HAS_SKILL`
- `USES_TECHNOLOGY`
- `COLLABORATES_WITH`
- `CONTRIBUTES_TO`

The exact relationship names depend on the backend graph model.

### Selecting a node

When a node is selected:

1. The selected entity is stored in frontend state.
2. The URL is updated with `nodeType` and `nodeId`.
3. Entity details are fetched.
4. Network data is fetched where supported.
5. Recommendations are loaded.
6. The graph is updated around the selected entity.

### Shortest path

The path finder accepts two node IDs:

```text
From node ID
To node ID
```

The frontend sends those IDs to the backend and displays the returned path distance and relationship sequence.

---

## Authentication

GraphSphere uses an authenticated application flow.

### Login

The login form sends credentials through:

```ts
authApi.login(credentials);
```

After successful authentication, the user is redirected to the explorer.

### Registration

The registration form sends new-user data through:

```ts
authApi.register(data);
```

### Protected explorer

The explorer verifies authentication before displaying protected graph data. Unauthenticated users are redirected to:

```text
/login
```

### Session restoration

When the application starts, the authentication layer attempts to restore the current session and retrieve the authenticated user.

### Logout

Logout clears the authenticated session and redirects the user to the login page.

> The exact token-storage mechanism should be verified in `useAuth.tsx` and `auth.api.ts`.

---

## Search

The search experience is designed to search across graph entities.

### Search flow

1. The user enters a query.
2. The query is debounced before sending a request.
3. The frontend calls the search API.
4. The response is normalized into graph entities.
5. Matching results are displayed in a dropdown.
6. Selecting a result opens the entity in the graph.

### Searchable entities

- Developers.
- Projects.
- Technologies.

### Local technology search

If the backend search endpoint does not return technologies while the technology list endpoint does, the frontend can search loaded technology data locally.

This helps ensure that technology names such as the following are searchable:

```text
React
TypeScript
JavaScript
Python
Node.js
```

The search UI should provide:

- Searching state.
- Error state.
- Empty-result state.
- Entity type labels.
- Clickable results.
- Keyboard-accessible controls.

---

## State Management

GraphSphere uses TanStack React Query for server state.

React Query manages:

- API requests.
- Loading states.
- Error states.
- Cached responses.
- Background refetching.
- Query invalidation.
- Request deduplication.

### Query hooks

Examples include:

```ts
useDevelopers();
useProjects();
useTechnologies();
useEntity(type, id);
useNetwork(id);
useRecommendations(id);
useSearch(query);
```

### Query keys

Query keys are centralized in:

```text
src/lib/queryKeys.ts
```

Centralized query keys help prevent inconsistent cache entries and make invalidation easier.

### Response normalization

API responses may be returned in different shapes, including:

```ts
{
  data: {
    items: [...]
  }
}
```

or:

```ts
{
  data: [...]
}
```

The frontend normalizes these responses before rendering them.

---

## UI and Accessibility

GraphSphere provides a responsive interface for desktop and mobile devices.

### Responsive layout

- Desktop sidebar navigation.
- Mobile slide-out navigation.
- Responsive entity cards.
- Flexible graph canvas.
- Touch-friendly graph controls.

### Theme support

The application supports:

- Light mode.
- Dark mode.
- Theme switching through `next-themes`.

### Accessibility

The UI should include:

- Semantic buttons and links.
- Accessible search labels.
- Keyboard-focusable controls.
- Visible focus states.
- Descriptive loading messages.
- Clear error messages.
- Empty-state guidance.
- Proper close controls for mobile navigation.

### Motion

Framer Motion is used for subtle transitions such as:

- Search result appearance.
- Node detail transitions.
- Mobile navigation animation.
- Panel state changes.

---

## Troubleshooting

### API URL is incorrect

Check `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Confirm that:

- The backend is running.
- The port is correct.
- The API prefix is correct.
- The environment variable matches `src/api/axios.ts`.

Restart the frontend after changing environment variables:

```bash
npm run dev
```

### CORS errors

Confirm that the backend allows the frontend origin:

```text
http://localhost:3000
```

For production, allow the deployed frontend domain instead of using a wildcard origin.

### Search returns no results

Check the following:

- The query has at least two characters.
- The backend search endpoint is reachable.
- The request contains the expected `q` parameter.
- The response contains the expected data field.
- The response-normalization helper supports the backend response shape.

### Technologies appear in the technology tab but not search

The technology list and search feature may use different API endpoints.

Verify:

1. `/technologies` returns technology records.
2. `/search?q=React` returns technology records.
3. The frontend normalization helper handles technology results.
4. Local technology search is enabled if the backend search endpoint excludes technologies.

### Graph does not render

Check the following:

- The React Flow container has a fixed or minimum height.
- Nodes include valid `id` values.
- Edges reference existing node IDs.
- React Flow CSS is imported.
- The browser console contains no React Flow errors.
- The selected entity has valid graph data.

### Authentication redirects unexpectedly

Check:

- The login request succeeds.
- The session token or cookie is present.
- `/auth/me` returns the authenticated user.
- The backend accepts the frontend origin.
- The Axios instance sends credentials or authorization headers as required.

### Recommendations are empty

Recommendations may be empty when:

- The selected node has no related entities.
- The backend returns an empty recommendation array.
- The selected node ID is invalid.
- The response wrapper is not normalized correctly.

### API response shape is different

Inspect the browser Network tab and compare the response with the expected shape.

For example, the frontend may expect:

```json
{
  "data": {
    "items": []
  }
}
```

while the backend returns:

```json
{
  "items": []
}
```

Update the relevant API method or normalization helper accordingly.

### Environment variables are not loaded

After changing `.env.local`:

1. Stop the development server.
2. Start it again.
3. Confirm the variable name matches the code.
4. Do not add unnecessary quotes or spaces.

---

## Production Deployment

### Frontend

The Next.js frontend can be deployed to a platform that supports Next.js, such as:

- Vercel.
- Netlify.
- AWS.
- A self-hosted Node.js server.

The deployment platform must provide:

- Node.js support.
- Environment variable configuration.
- HTTPS.
- Build and start commands.
- Log access.

### Production commands

```bash
npm run build
npm run start
```

### Production environment variable

```env
NEXT_PUBLIC_API_URL=https://api.example.com/api/v1
```

Replace the example URL with the real backend URL.

### Backend requirements

The backend should:

- Be reachable from the production frontend.
- Allow the production frontend origin.
- Use HTTPS.
- Expose required API routes.
- Connect to CognoDB.
- Provide authentication endpoints.
- Provide health monitoring.
- Log errors without exposing secrets.

### CORS

Configure the backend to allow only trusted frontend origins.

Example:

```text
Development: http://localhost:3000
Production: https://your-frontend-domain.com
```

Avoid using unrestricted CORS in production.

---

## Security

Follow these security practices:

- Never commit `.env.local`.
- Never expose database credentials in frontend variables.
- Never place JWT secrets in `NEXT_PUBLIC_*` variables.
- Use HTTPS in production.
- Restrict CORS to trusted origins.
- Validate authentication input on the backend.
- Validate graph IDs and query parameters.
- Protect private API routes.
- Avoid exposing sensitive user data in public responses.
- Use secure token or cookie handling.
- Log security failures without logging credentials or tokens.
- Keep dependencies updated.

If JWTs are stored in browser-accessible storage, evaluate whether secure HTTP-only cookies are more appropriate for the production security model.

---

## Performance

Graph applications can become expensive as the number of nodes and edges increases.

Recommended practices include:

- Use TanStack Query caching.
- Debounce search requests.
- Avoid refetching unchanged data.
- Paginate large entity lists.
- Limit the number of graph nodes displayed at once.
- Render only the required network context.
- Use stable React keys.
- Memoize expensive graph transformations.
- Lazy-load large feature components where appropriate.
- Avoid sending unnecessary properties in API responses.
- Add backend indexes for commonly searched fields.
- Monitor graph query execution time.

---

## Future Improvements

Potential improvements include:

- Pagination controls for entity lists.
- Advanced graph filters.
- Filtering by technology category.
- Filtering by years of experience.
- Improved search ranking.
- Search suggestions.
- Multiple graph layout algorithms.
- Saved graph views.
- Graph image export in PNG or SVG.
- Shareable graph sessions.
- Real-time collaboration.
- User-created graph annotations.
- More comprehensive automated tests.
- Performance monitoring.
- Analytics and observability.
- Offline-friendly cached views.

---

## Contributing

Contributions are welcome.

### Development workflow

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature-name
```

3. Install dependencies.

```bash
npm install
```

4. Configure `.env.local`.
5. Start the development server.

```bash
npm run dev
```

6. Make and test your changes.
7. Run linting.

```bash
npm run lint
```

8. Commit your changes.

```bash
git add .
git commit -m "feat: describe your change"
```

9. Push your branch.

```bash
git push origin feature/your-feature-name
```

10. Open a pull request.

### Contribution guidelines

- Keep components focused and reusable.
- Use TypeScript types instead of unnecessary casts.
- Handle loading, error, and empty states.
- Keep API logic inside API modules.
- Keep server state inside React Query hooks.
- Avoid committing secrets.
- Update documentation when behavior changes.
- Use clear commit messages.

---

## License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for details.

---

## Support

For questions, bug reports, or feature requests:

- Open an issue in the repository.
- Include clear reproduction steps.
- Include relevant browser-console or server logs.
- Remove passwords, tokens, and private credentials before sharing logs.
- Contact the maintainers at `<MAINTAINER_EMAIL>`.

---

<div align="center">

Built for exploring the relationships behind your developer ecosystem.

**Happy exploring! 🚀**

</div>
```
