---
sidebar_position: 6
---

# API Documentation

This document describes all available API endpoints used by the **Automation & Messaging System**.
The APIs support authentication, flow management, templates, clients, automation execution, statistics tracking, and external webhook handling.



## Authentication
### Login

Authenticate a user and receive an access token.

**POST** `/login`

**Controller:** `AuthController@login`

---

## Automation Flows

Manage automation flows (create, update, delete, view).

**Base Path:** `/flows`

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/flows` | Get all flows |
| POST | `/flows` | Create a new flow |
| GET | `/flows/{flow}` | Get flow details |
| PUT | `/flows/{flow}` | Update a flow |
| DELETE | `/flows/{flow}` | Delete a flow |

**Controller:** `FlowController`

---

## Email Templates

Manage email templates used inside automation flows.

**Base Path:** `/templates`

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/templates` | Get all email templates |
| POST | `/templates` | Create a new template |
| GET | `/templates/{template}` | Get template details |
| PUT | `/templates/{template}` | Update a template |
| DELETE | `/templates/{template}` | Delete a template |

**Controller:** `TemplateController`

---

## SMS Templates

Manage SMS templates used in automation flows.

**Base Path:** `/sms-templates`

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/sms-templates` | Get all SMS templates |
| POST | `/sms-templates` | Create a new SMS template |
| GET | `/sms-templates/{template}` | Get SMS template details |
| PUT | `/sms-templates/{template}` | Update SMS template |
| DELETE | `/sms-templates/{template}` | Delete SMS template |

**Controller:** `SmsTemplateController`

---

## Clients

Manage individual clients/contacts.

**Base Path:** `/clients`

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/clients` | Get all clients |
| POST | `/clients` | Create a client |
| GET | `/clients/{client}` | Get client details |
| PUT | `/clients/{client}` | Update client |
| DELETE | `/clients/{client}` | Delete client |

**Controller:** `ClientController`

---

## Client Segments (Lists)

Manage segmented client lists.

**Base Path:** `/segment-list`

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/segment-list` | Get all segments |
| POST | `/segment-list` | Create a segment |
| GET | `/segment-list/{clientList}` | Get segment details |
| PUT | `/segment-list/{clientList}` | Update segment |
| DELETE | `/segment-list/{clientList}` | Delete segment |

**Controller:** `ClientListController`

---

## Client Import (CMS)

Import members from the CMS system.

**Base Path:** `/import`

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/import/cms-members` | Preview CMS members |
| POST | `/import/cms-members` | Import CMS members |

**Controller:** `MemberImportController`

---

## CRM Automation Trigger

Used by the CRM to start automation flows.

**POST** `/cms-handler`

**Controller:** `CmsController@import`

This endpoint:

- Creates a flow execution
- Dispatches the `FlowExecutor` job
- Starts automation asynchronously

---

## Job Testing (Internal)

**POST** `/job-test`

**Controller:** `CmsController@testJob`

Used for testing queue/job execution.

---

## Flow Execution Management

Manage and inspect running automation executions.

**Base Path:** `/flow-execution`

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/flow-execution/cancel` | Cancel a running flow |
| GET | `/flow-execution/active/{contactId}` | Get active flows for a contact |
| GET | `/flow-execution` | List all flow executions |
| GET | `/flow-execution/step` | Get execution step details |

**Controller:** `FlowExecutionController`

---

## Unsubscribe / Subscribe

Handle flow-level unsubscribe and resubscribe actions.

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/unsubscribe` | Unsubscribe from automation |
| GET | `/subscribe` | Re-subscribe to automation |

**Controller:** `UnsubscribeController`

---

## Webhooks & Delivery Reports

### SendGrid Webhook

Handles email delivery and event tracking.

**POST** `/sendgrid/events`

**Controller:** `StatisticsController@update`

---

### SendMode Delivery Report

Handles SMS delivery callbacks.

**GET** `/sendmode/dlr`

**Controller:** `StatisticsController@sendModeDeliveryCallback`

---

## Statistics & Tracking

Statistics are automatically recorded for:

- Email sends
- SMS sends
- Delay nodes
- Condition nodes

Stored internally and updated via webhook callbacks.

---

## Credit & Billing APIs

### Required Credit Calculation

**Base Path:** `/required-credit`

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/required-credit` | Get required credit info |
| GET | `/required-credit/{id}` | Get credit details |

**Controller:** `SendModeCreditCalculator`

---

### Remaining SendMode Credits

**GET** `/credits/sendmode`

**Controller:** `CreditController@getSendmodeCredits`

---

## Summary

This API layer powers the entire automation system by:

- Managing flows, templates, and clients
- Triggering automation from CRM
- Executing flows asynchronously via queues
- Tracking delivery and statistics
- Handling unsubscribe and credit logic