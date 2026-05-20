---
sidebar_position: 6
---

# API Reference

This document provides a complete reference for every API endpoint in the ICS Automation backend. All endpoints are prefixed with `/api` and return JSON responses.

**Base URL:** `https://automation.icslegal.com/api`

---

## Authentication

### Login

Authenticates a user and returns their profile information.

```
POST /login
```

**Request Body:**

```json
{
  "username": "user@example.com",
  "password": "password123"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `username` | string | Yes | The user's username (email address). |
| `password` | string | Yes | The user's password. |

**Response (200 OK):**

```json
{
  "status": "success",
  "user": {
    "id": 1,
    "username": "user@example.com",
    "name": "John Doe"
  }
}
```

**Response (401 Unauthorized):**

```json
{
  "status": "error",
  "message": "Invalid credentials"
}
```

**Response (422 Validation Error):**

```json
{
  "message": "The username field is required.",
  "errors": {
    "username": ["The username field is required."]
  }
}
```

**Notes:**
- Authentication is performed against the external `case_users` table, not the `users` table
- No token is returned — the frontend stores `username` and `userid` in `localStorage`
- All API routes are currently **unprotected** (no authentication middleware applied)

---

## Automation Flows

### List All Flows

Returns a list of all automation flows with their credit requirements.

```
GET /flows
```

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `search` | string | No | — | Filter flows by name (partial match). |

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Welcome Series",
      "flow": {
        "nodes": [...],
        "edges": [...]
      },
      "required_credit": 5,
      "created_at": "2026-01-15T10:30:00.000000Z",
      "updated_at": "2026-01-20T14:00:00.000000Z"
    }
  ]
}
```

---

### Create a Flow

Creates a new automation flow and automatically generates a corresponding client list.

```
POST /flows
```

**Request Body:**

```json
{
  "name": "Welcome Series",
  "flow": {
    "nodes": [
      {
        "id": "trigger-node-1",
        "type": "triggerNode",
        "position": { "x": 250, "y": 50 },
        "data": {
          "triggerType": "add-to-list",
          "listId": null
        }
      }
    ],
    "edges": []
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Flow display name. Maximum 255 characters. |
| `flow` | object | Yes | Flow graph definition with `nodes` and `edges` arrays. |

**Response (201 Created):**

```json
{
  "message": "Flow created successfully",
  "data": {
    "id": 2,
    "name": "Welcome Series",
    "flow": {
      "nodes": [...],
      "edges": [...]
    },
    "created_at": "2026-01-15T10:30:00.000000Z"
  }
}
```

**Side Effects:**
- A new client list is automatically created with the same name as the flow
- The trigger node's `listId` is updated to reference the newly created list

---

### Get a Single Flow

Returns the details of a specific flow.

```
GET /flows/{id}
```

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | The flow ID. |

**Response (200 OK):**

```json
{
  "data": {
    "id": 2,
    "name": "Welcome Series",
    "flow": {
      "nodes": [...],
      "edges": [...]
    },
    "created_at": "2026-01-15T10:30:00.000000Z",
    "updated_at": "2026-01-20T14:00:00.000000Z"
  }
}
```

**Response (404 Not Found):**

```json
{
  "message": "Flow not found"
}
```

---

### Update a Flow

Updates an existing flow's name or flow definition.

```
PUT /flows/{id}
```

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | The flow ID. |

**Request Body:**

```json
{
  "name": "Updated Welcome Series",
  "flow": {
    "nodes": [...],
    "edges": [...]
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | New flow name. |
| `flow` | object | No | Updated flow graph definition. |

**Response (200 OK):**

```json
{
  "message": "Flow updated successfully",
  "data": {
    "id": 2,
    "name": "Updated Welcome Series",
    "flow": {
      "nodes": [...],
      "edges": [...]
    },
    "updated_at": "2026-01-20T14:00:00.000000Z"
  }
}
```

---

### Delete a Flow

Deletes a flow and all its associated executions.

```
DELETE /flows/{id}
```

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | The flow ID. |

**Response (200 OK):**

```json
{
  "message": "Flow deleted successfully"
}
```

**Cascade Behavior:**
- All `flow_executions` for this flow are deleted (foreign key cascade)
- All `statistics` records for those executions are deleted
- The associated client list is **not** deleted

---

## Email Templates

### List All Email Templates

```
GET /templates
```

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `search` | string | No | — | Filter templates by name. |
| `page` | integer | No | 1 | Page number for pagination. |
| `perPage` | integer | No | 10 | Items per page. |

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Welcome Email",
      "design": { "blocks": [...] },
      "html": "<html>...</html>",
      "preview_image": "/images/template-1.png",
      "created_at": "2026-01-10T09:00:00.000000Z"
    }
  ],
  "current_page": 1,
  "last_page": 3,
  "per_page": 10,
  "total": 25
}
```

---

### Create an Email Template

```
POST /templates
```

**Request Body:**

```json
{
  "name": "Welcome Email",
  "design": { "blocks": [...] },
  "html": "<html><body>Hello {CLIENT_FIRST_NAME}</body></html>"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Template name. Maximum 255 characters. |
| `design` | object | No | Unlayer editor design JSON. |
| `html` | string | Yes | Email HTML content. Supports placeholders. |

**Response (201 Created):**

```json
{
  "message": "Template created successfully",
  "data": {
    "id": 3,
    "name": "Welcome Email",
    "html": "<html>...</html>",
    "created_at": "2026-01-10T09:00:00.000000Z"
  }
}
```

---

### Get, Update, Delete Email Template

```
GET    /templates/{id}
PUT    /templates/{id}
DELETE /templates/{id}
```

Same patterns as Flow endpoints. See Flow section for response formats.

---

## SMS Templates

### List All SMS Templates

```
GET /sms-templates
```

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Appointment Reminder",
      "content": "Hi {CLIENT_FIRST_NAME}, your appointment is tomorrow at 10 AM.",
      "created_at": "2026-01-10T09:00:00.000000Z"
    }
  ]
}
```

---

### Create an SMS Template

```
POST /sms-templates
```

**Request Body:**

```json
{
  "name": "Appointment Reminder",
  "content": "Hi {CLIENT_FIRST_NAME}, your appointment is tomorrow at 10 AM."
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Template name. Maximum 255 characters. |
| `content` | string | Yes | SMS text content. Supports placeholders. |

**Response (201 Created):**

```json
{
  "message": "SMS template created successfully",
  "data": {
    "id": 2,
    "name": "Appointment Reminder",
    "content": "Hi {CLIENT_FIRST_NAME}, your appointment is tomorrow at 10 AM.",
    "created_at": "2026-01-10T09:00:00.000000Z"
  }
}
```

---

### Get, Update, Delete SMS Template

```
GET    /sms-templates/{id}
PUT    /sms-templates/{id}
DELETE /sms-templates/{id}
```

Same patterns as Email Template endpoints.

---

## Clients (Contacts)

### List Clients

Returns a paginated list of clients, optionally filtered by list.

```
GET /clients
```

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `list_id` | integer | No | — | Filter by client list ID. |
| `page` | integer | No | 1 | Page number. |
| `perPage` | integer | No | 10 | Items per page. |

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": 1,
      "client_list_id": 5,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com",
      "mobile": "447123456789",
      "created_at": "2026-01-10T09:00:00.000000Z"
    }
  ],
  "current_page": 1,
  "last_page": 5,
  "per_page": 10,
  "total": 50,
  "has_more": true
}
```

---

### Create a Client

```
POST /clients
```

**Request Body:**

```json
{
  "client_list_id": 5,
  "member_id": 121211
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `client_list_id` | integer | Yes | Must exist in `client_lists` table. |
| `member_id` | integer | Yes | ID of the member in the CMS `members` table. Contact details are copied from the members table. |

**Response (201 Created):**

```json
{
  "message": "Client created successfully",
  "data": {
    "id": 10,
    "client_list_id": 5,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "mobile": "447123456789"
  }
}
```

---

### Get, Update, Delete Client

```
GET    /clients/{id}
PUT    /clients/{id}
DELETE /clients/{id}
```

---

## Client Lists (Segments)

### List All Client Lists

```
GET /segment-list
```

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": 5,
      "name": "New Clients Q1",
      "type": "list",
      "description": "Clients added in Q1 2026",
      "client_count": 150,
      "created_at": "2026-01-10T09:00:00.000000Z"
    }
  ]
}
```

---

### Create a Client List

```
POST /segment-list
```

**Request Body:**

```json
{
  "name": "New Clients Q1",
  "type": "list",
  "description": "Clients added in Q1 2026"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | List name. Maximum 255 characters. |
| `type` | string | Yes | Must be `list` or `segment`. |
| `description` | string | Yes | List description. 5–1000 characters. |

**Response (201 Created):**

```json
{
  "message": "Client list created successfully",
  "data": {
    "id": 6,
    "name": "New Clients Q1",
    "type": "list",
    "description": "Clients added in Q1 2026"
  }
}
```

---

### Get, Update, Delete Client List

```
GET    /segment-list/{id}
PUT    /segment-list/{id}
DELETE /segment-list/{id}
```

---

## Contact Import

### Preview CMS Members

Returns a paginated list of members from the CMS `members` table for preview before import.

```
GET /import/cms-members
```

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Page number. |
| `per_page` | integer | No | 10 | Items per page. |
| `search` | string | No | — | Search by name or email. |
| `engagement` | string | No | — | Filter by engagement: `30`, `60`, `90`, `never`. |
| `source` | string | No | — | Filter by source. |
| `matter_type` | string | No | — | Filter by matter type. |

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": 121211,
      "fname": "John",
      "lname": "Doe",
      "email": "john@example.com",
      "mobile": "447123456789"
    }
  ],
  "current_page": 1,
  "last_page": 10,
  "per_page": 10,
  "total": 100
}
```

---

### Import CMS Members

Imports members from the CMS into a client list.

```
POST /import/cms-members
```

**Request Body (Selected Members):**

```json
{
  "list_id": 5,
  "members": [121211, 121212, 121213]
}
```

**Request Body (Select All):**

```json
{
  "list_id": 5,
  "select_all": true,
  "search": "",
  "engagement": "30",
  "source": "",
  "matter_type": ""
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `list_id` | integer | Yes | Target client list ID. |
| `members` | array | Conditional | Array of member IDs to import. Required if `select_all` is false. |
| `select_all` | boolean | No | If true, imports all members matching the filter criteria. |
| `search` | string | No | Search filter for select-all mode. |
| `engagement` | string | No | Engagement filter for select-all mode. |
| `source` | string | No | Source filter for select-all mode. |
| `matter_type` | string | No | Matter type filter for select-all mode. |

**Response (200 OK):**

```json
{
  "message": "Members imported successfully",
  "imported_count": 3
}
```

**Import Behavior:**
- Uses `Client::updateOrCreate()` keyed by `client_list_id + email`
- Duplicate emails are updated rather than creating new records
- Contact details (name, email, mobile) are copied from the `members` table

---

## CRM Automation Trigger

### Trigger Flow Execution

Called by the external CRM system to start an automation flow for a contact.

```
POST /cms-handler
```

**Request Body:**

```json
{
  "flow_id": 2,
  "contact_id": 121211,
  "start_at": "31-01-2026"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `flow_id` | integer | Yes | ID of the flow to execute. Must exist in `flows` table. |
| `contact_id` | integer | Yes | ID of the contact in the CMS `members` table. |
| `start_at` | string | No | Scheduled start date in `DD-MM-YYYY` format. If omitted, the flow starts immediately. |

**Response (200 OK):**

```json
{
  "message": "Flow execution started",
  "execution_id": 45
}
```

**What Happens:**
1. A new `FlowExecution` record is created with status `active`
2. A unique `hash` is generated for unsubscribe links
3. A `FlowExecutor` job is dispatched (with delay if `start_at` is provided)
4. The execution ID is returned for tracking

---

## Flow Execution Management

### List All Executions

```
GET /flow-execution
```

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": 45,
      "flow_id": 2,
      "contact_id": 121211,
      "status": "active",
      "current_node_id": "email-node-2",
      "started_at": "2026-01-15T10:30:00.000000Z",
      "hash": "aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890",
      "created_at": "2026-01-15T10:30:00.000000Z"
    }
  ]
}
```

---

### Get Execution Step Details

Returns the current step information for a specific execution.

```
GET /flow-execution/step?exe_id=45
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `exe_id` | integer | Yes | The execution ID. |

**Response (200 OK):**

```json
{
  "data": {
    "execution_id": 45,
    "flow_id": 2,
    "contact_id": 121211,
    "status": "active",
    "current_node_id": "email-node-2",
    "statistics": [
      {
        "node_id": "trigger-node-1",
        "channel": "email",
        "send_at": "2026-01-15T10:30:00.000000Z",
        "delivered_at": "2026-01-15T10:30:05.000000Z"
      }
    ]
  }
}
```

---

### Get Active Flows for a Contact

```
GET /flow-execution/active/{contactId}
```

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `contactId` | integer | Yes | The contact ID. |

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": 45,
      "flow_id": 2,
      "status": "active",
      "current_node_id": "email-node-2"
    }
  ]
}
```

---

### Cancel Flow Execution

Cancels one or all active executions for a contact.

```
POST /flow-execution/cancel
```

**Request Body (Cancel specific flow):**

```json
{
  "contact_id": 121211,
  "flow_id": 2
}
```

**Request Body (Cancel all flows for contact):**

```json
{
  "contact_id": 121211
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contact_id` | integer | Yes | Must exist in `clients` table. |
| `flow_id` | integer | No | If provided, only cancels executions for this flow. If omitted, cancels all active executions for the contact. |

**Response (200 OK):**

```json
{
  "message": "Flow execution cancelled successfully",
  "cancelled_count": 1
}
```

---

## Unsubscribe / Subscribe

### Unsubscribe

Handles email unsubscribe links.

```
GET /unsubscribe?hash=aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `hash` | string | Yes | The unique execution hash. |

**Response (200 OK):**

Redirects to the frontend unsubscribe confirmation page:

```
https://automation.icslegal.com/unsubscribe
```

**Side Effects:**
- Sets `unsubscribed_at` on the `FlowExecution` record
- Sets `status` to `unsubscribed`

---

### Subscribe (Re-subscribe)

Handles re-subscribe links.

```
GET /subscribe?hash=aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890
```

**Response (200 OK):**

Redirects to the frontend subscribe confirmation page:

```
https://automation.icslegal.com/subscribed
```

**Side Effects:**
- Clears `unsubscribed_at` on the `FlowExecution` record
- Sets `status` back to `active`

---

## Webhooks

### SendGrid Event Webhook

Receives email event notifications from SendGrid.

```
POST /sendgrid/events
```

**Request Body (from SendGrid):**

```json
[
  {
    "email": "john@example.com",
    "event": "delivered",
    "sg_message_id": "filter001.p3las1-12345-ABCDEF-1-12345678-1",
    "timestamp": 1705312200,
    "sg_event_id": "ZXZlbnQtMTIzNDU2Nzg5",
    "custom_args": {
      "smart_automation_exe_id": "45",
      "node_id": "email-node-2"
    }
  }
]
```

**Response (200 OK):**

```json
{
  "message": "Events processed successfully"
}
```

**Event Mapping:**

| SendGrid Event | Statistics Column Updated |
|----------------|--------------------------|
| `processed` | `send_at` |
| `delivered` | `delivered_at` |
| `open` | `opened_at` |
| `click` | `clicked_at` |
| `bounce` | `bounced_at` |
| `dropped` | `dropped_at` |
| `unsubscribe` | `unsubscribed_at` |
| `spamreport` | `bounced_at` |

---

### Sendmode Delivery Receipt Webhook

Receives SMS delivery receipts from Sendmode.

```
GET /sendmode/dlr?EventID=123&Phonenumber=447123456789&Status=DELIVRD&CustomerID=45-email-node-2
```

**Query Parameters (from Sendmode):**

| Parameter | Description |
|-----------|-------------|
| `EventID` | Unique event identifier from Sendmode. |
| `Phonenumber` | Recipient's mobile number. |
| `Status` | Delivery status (e.g., `DELIVRD`, `FAILED`). |
| `CustomerID` | Format: `{executionId}-{nodeId}`. Used to find the correct statistics record. |

**Response (200 OK):**

```
OK
```

**Status Mapping:**

| Sendmode Status | Statistics Column Updated |
|-----------------|--------------------------|
| `DELIVRD` | `delivered_at` |
| `EXPIRED` | `bounced_at` |
| `UNDELIV` | `bounced_at` |
| `REJECTD` | `bounced_at` |
| `FAILED` | `bounced_at` |
| `OPTED OUT - BLOCKED` | `unsubscribed_at` |

---

## Credits

### Get Required Credits for All Flows

Returns the total SMS credits required for all flows based on their SMS node content and contact list sizes.

```
GET /required-credit
```

**Response (200 OK):**

```json
{
  "data": [
    {
      "flow_id": 2,
      "flow_name": "Welcome Series",
      "required_credit": 5,
      "contact_count": 150
    }
  ],
  "total_required": 5
}
```

---

### Get Required Credits for a Single Flow

```
GET /required-credit/{flowId}
```

**Response (200 OK):**

```json
{
  "data": {
    "flow_id": 2,
    "flow_name": "Welcome Series",
    "required_credit": 5,
    "contact_count": 150
  }
}
```

---

### Get Sendmode Remaining Credits

Fetches the current remaining SMS credit balance from Sendmode.

```
GET /credits/sendmode
```

**Response (200 OK):**

```json
{
  "data": {
    "remaining_credits": 1500,
    "status": "success"
  }
}
```

**Response (Error):**

```json
{
  "message": "Failed to fetch credits from Sendmode",
  "error": "Invalid API key"
}
```

---

## Error Response Format

All error responses follow a consistent format:

### Validation Error (422)

```json
{
  "message": "The name field is required.",
  "errors": {
    "name": ["The name field is required."]
  }
}
```

### Not Found (404)

```json
{
  "message": "Flow not found"
}
```

### Server Error (500)

```json
{
  "message": "Server Error"
}
```

---

## Next Steps

| Document | What You'll Learn |
|----------|------------------|
| [Automation Engine](./jobs-queues) | How the queue job system processes flows |
| [Flow Execution Algorithm](./flow-execution-algorithm) | Step-by-step execution logic |
| [Database](./database) | Complete database schema |
