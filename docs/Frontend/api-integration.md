---
sidebar_position: 7
---

# API Integration

The frontend communicates with a Laravel REST API backend. HTTP requests are handled through a configured Axios instance, with async operations managed by Redux Toolkit thunks.

## Axios Instance

**Location:** `src/api/axiosInstance.ts`

A centralized Axios instance is configured with default settings for all API requests:

```typescript
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
```

### Configuration

| Setting | Value | Purpose |
|---------|-------|---------|
| `baseURL` | `VITE_BASE_URL` env variable | API base URL |
| `withCredentials` | `true` | Send cookies with requests |
| `headers.Content-Type` | `application/json` | Default request format |
| `timeout` | `10000` (10s) | Request timeout |

### Interceptors (Commented Out)

The instance includes scaffolded interceptors for authentication and error handling:

**Request Interceptor:**
```typescript
// Adds Bearer token from localStorage to Authorization header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**Response Interceptor:**
```typescript
// Handles 401 Unauthorized responses globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  }
);
```

These are currently disabled because authentication uses cookie-based sessions (`withCredentials: true`) rather than token-based auth.

## API Usage Pattern

### Redux Async Thunks

API calls are wrapped in Redux Toolkit's `createAsyncThunk`:

```typescript
export const loadFlow = createAsyncThunk(
  "createFlow/loadFlow",
  async (flowId: string) => {
    const response = await axiosInstance.get(`/flows/${flowId}`);
    return response.data.data;
  }
);
```

### Standard Pattern

```typescript
export const actionName = createAsyncThunk(
  "sliceName/actionName",
  async (payload: PayloadType, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.<method>(endpoint, payload);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Operation failed"
      );
    }
  }
);
```

## API Endpoints

### Flows

| Method | Endpoint | Thunk | Description |
|--------|----------|-------|-------------|
| GET | `/flows` | `loadFlows` | List all flows |
| GET | `/flows/:id` | `loadFlow` | Get a single flow |
| POST | `/flows` | `saveFlow` | Create a new flow |
| PUT | `/flows/:id` | `updateFlow` | Update a flow |

### Flow Execution

| Method | Endpoint | Thunk | Description |
|--------|----------|-------|-------------|
| GET | `/flow-execution/step?exe_id=` | `loadExeNode` | Get execution step data |

### Templates

| Method | Endpoint | Thunk | Description |
|--------|----------|-------|-------------|
| GET | `/templates` | `loadTemplates` | List all templates |
| GET | `/templates/:id` | `loadPreview` | Get template details |

### Segments & Lists

| Method | Endpoint | Thunk | Description |
|--------|----------|-------|-------------|
| GET | `/segment-list` | `fetchLists` | List all segments/lists |
| GET | `/segment-list/:id` | `fetchListById` | Get a single list |
| POST | `/segment-list` | `createList` | Create a new list |
| PUT | `/segment-list/:id` | `updateList` | Update a list |
| DELETE | `/segment-list/:id` | `deleteList` | Delete a list |

### Credits

| Method | Endpoint | Thunk | Description |
|--------|----------|-------|-------------|
| GET | `/required-credit` | `loadRequiredCredits` | Get credit requirements |
| GET | `/credits/sendmode` | `loadRemainingCredits` | Get Sendmode balance |

## Response Format

The backend follows a consistent response envelope:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

Thunks typically extract `response.data.data` as the payload.

## RTK Query (Reserved)

**Location:** `src/app/api.ts`

An RTK Query `createApi` instance is configured but currently unused:

```typescript
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: () => ({}),
});
```

This is available for future migration from thunk-based API calls to RTK Query's caching and invalidation system.
