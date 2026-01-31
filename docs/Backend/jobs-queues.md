---
sidebar_position: 8
---




# Jobs & Queues (Automation Engine)

We use **Laravel jobs and queues** to execute automation flows asynchronously. This design ensures reliable delivery of **emails and SMS messages**, improves performance, and prevents long-running requests by processing all automation tasks in the background.

Each automation runs as a **series of queued jobs**, executed node by node.



## Automation Flow Overview

An automation flow is composed of multiple connected nodes, such as:

- **Trigger**
- **Email**
- **SMS**
- **Delay**
- **Condition**

Each node represents a single action or decision point.

When a node is executed, its execution state is stored in the database table:

```
ics_automation_flow_executions
```

This allows the system to track progress, resume execution, and handle failures safely.



## How an Automation Starts

An automation is triggered by an API call from the CRM system:

```jsx
{
    contact_id:121211,
    start_at:"31-01-2026",
    flow_id:2
}

```

### What Happens Next

1. The request is received by the automation backend
2. `CmsController.php` initializes the automation execution
3. A new execution record is created in `ics_automation_flow_executions`
4. The first queued job (`FlowExecutor`) is dispatched



## FlowExecutor Job – Core Execution Engine

`FlowExecutor` is the main queued job responsible for executing the automation **one node at a time**.

Each node execution runs in its **own queue job**, making the system scalable, fault-tolerant, and easy to debug.



## Purpose of FlowExecutor

- Executes automation flows asynchronously using Laravel queues
- Processes exactly **one node per job**
- Dispatches the next node as a new job
- Tracks execution progress in the database
- Stops execution if:
    - The contact unsubscribes
    - The flow reaches its end



## Job Initialization

When a `FlowExecutor` job is dispatched, it receives:

- **flowId** – The automation flow ID
- **contactId** – The contact for whom the flow is running
- **currentNodeId** – The node currently being executed (default: `trigger`)
- **executionId** – The automation execution record ID

This structure allows the automation to **resume from any node** at any time.



## Execution Flow (`handle()` Method)

### 1. Execution Validation

Before processing anything, the job:

- Confirms that an `executionId` exists
- Verifies the execution record is valid
- Stops execution if the contact has unsubscribed

This prevents invalid or unwanted processing.



### 2. Load Flow Data

The job then:

- Fetches the flow definition from the database
- Decodes the flow JSON
- Extracts:
    - **Nodes** (actions/conditions)
    - **Edges** (connections between nodes)
- Identifies the current node using `currentNodeId`



### 3. Determine Node Type

Each node has a type that determines how it is handled.

Supported node types include:

- `triggerNode`
- `emailNode`
- `smsNode`
- `delayNode`
- `conditionNode`

Each type has its own dedicated handler.



## Node Handlers

### Trigger Node

- Acts as the entry point of the flow
- Immediately dispatches the next connected node



### Email Node

- Sends an email using `SendEmailAction`
- Logs execution details
- Dispatches the next node



### SMS Node

- Sends an SMS using `SendSmsAction`
- Logs execution details
- Dispatches the next node



### Delay Node

- Reads the delay amount and time unit (minutes, hours, days, etc.)
- Dispatches the next node **with a queue delay**
- Stores delay-related statistics for tracking

This enables time-based automation steps.



### Condition Node

- Evaluates conditions using `FlowConditionEvaluator`
- Records condition execution for tracking
- Routes execution based on the result:
    - **Yes** → one branch
    - **No** → another branch

This enables branching logic within the automation flow.



## Dispatching the Next Node

After a node is executed:

- The system looks for the next connected edge
- If no edge exists:
    - The flow execution is marked as **completed**
- If an edge exists:
    - A new `FlowExecutor` job is dispatched for the next node

Each node is processed in a **separate queued job**, ensuring reliability and scalability.



## Tracking, Logging & Monitoring

- Automation progress is stored in `ics_automation_flow_executions`
- Node-level activity is recorded in the `statistics` table
- Application logs provide visibility for debugging and monitoring