---
sidebar_position: 1
---

# Overview

The ICS Automation backend is a robust, scalable, and secure system built using **Laravel**, designed to handle automation logic, manage data, and deliver emails and SMS messages reliably. It ensures that all automation workflows created in the frontend are executed efficiently and in real-time.

---

## Technology Stack

The backend leverages Laravel and its ecosystem to provide a maintainable and high-performance architecture.

### Laravel

Laravel serves as the core backend framework, offering:

- MVC architecture for organized code
- Eloquent ORM for database management
- Middleware for request handling and security
- Artisan commands for automation tasks
- Support for queues and scheduled jobs

### SendGrid

SendGrid is used for sending transactional and marketing emails:

- High deliverability rates
- Template-based email sending
- Tracking email opens and clicks

### Sendmode

Sendmode handles SMS messaging:

- Fast and reliable SMS delivery
- Template-based SMS messages
- Integration with Laravel for queued sending
- Supports international SMS

### Laravel Queues

To process automation workflows efficiently, the backend uses Laravel queues:

- Queue workers process email and SMS sending asynchronously
- Delayed and scheduled jobs supported
- Prevents blocking the main application flow
- Ensures reliable execution even under heavy load

---

## Major Backend Modules

### Automation Engine

The automation engine executes workflows created in the frontend:

- Triggers workflows based on user actions or schedules
- Sends emails and SMS via queued jobs
- Handles conditions, delays, and branching logic
- Tracks workflow progress and logs actions

### Email & SMS Services

- **Email Service:** Sends emails through SendGrid using Laravel jobs
- **SMS Service:** Sends SMS messages via Sendmode using queued jobs
- Handles retries and failure logging

### User and Contact Management

- Manages user accounts, permissions, and roles
- Stores contact information and segments
- Provides APIs for frontend to fetch and update data

### API Endpoints

- REST API endpoints for all frontend interactions
- Token-based authentication for secure access
- Real-time updates and notifications

### Logging and Monitoring

- Tracks job execution and failures
- Logs email and SMS delivery status
- Provides insights for debugging and performance monitoring

---

## Architecture Highlights

- Modular and service-oriented structure
- Queued job system for asynchronous processing
- Type-safe request validation
- Secure token-based authentication
- Scalable design to handle increasing automation volume
- Clean separation of services, controllers, and models

---

## Summary

The ICS Automation backend is designed to be:

- Reliable and scalable
- Secure and maintainable
- Developer-friendly with clear structure
- Efficient in processing automation workflows
- Fully integrated with email and SMS services

This backend architecture ensures seamless execution of automation workflows while providing a strong foundation for future growth.
