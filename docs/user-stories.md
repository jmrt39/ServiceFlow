# ServiceFlow User Stories

## Document Information

| Field | Value |
|---|---|
| Product | ServiceFlow |
| Version | MVP 1.0 |
| Document Owner | Justin Martin  --- Product Owner, Developer |
| Status | Draft |
| Last Updated | August 2026 |

---

# Epic 1: User Authentication & Account Management

## Overview

Users need secure access to ServiceFlow while ensuring each company has isolated data and appropriate permissions.

---

# US-001: Create Business Account

## User Story

**As a business owner,  
I want to create a ServiceFlow account,  
so that I can manage my service business operations digitally.**

---

## Acceptance Criteria

### Scenario 1: Successful Registration

Given I am a new business owner

When I provide:

- Company name
- First name
- Last name
- Email
- Password

Then:

- A company account is created
- My user account is created
- I become the company administrator
- I am redirected to the dashboard

---

### Scenario 2: Duplicate Email

Given an account already exists

When I register with the same email

Then:

- Registration fails
- I receive an error message

Example:

"An account with this email already exists."

---

## Priority

High

## Technical Notes

Requires:

- User table
- Company table
- Password hashing
- Email validation

---

# US-002: Login to Application

## User Story

**As a user,  
I want to securely login,  
so that I can access my business information.**

---

## Acceptance Criteria

Given I have an account

When I enter valid credentials

Then:

- I am authenticated
- A session/token is created
- I see my dashboard

---

## Error Cases

Invalid password:

Display:

"Email or password is incorrect."

---

## Priority

High

---

# US-003: Reset Forgotten Password

## User Story

**As a user,  
I want to reset my password,  
so that I can regain access if I forget my credentials.**

---

## Acceptance Criteria

Given I forgot my password

When I request a reset

Then:

- I receive an email
- A secure reset link is generated
- I can create a new password

---

# Epic 2: User Roles & Permissions

---

# US-010: Manage User Roles

## User Story

**As a business owner,  
I want to assign roles to employees,  
so that users only access information needed for their job.**

---

## Acceptance Criteria

Given I am an administrator

When I create an employee

I can assign:

- Dispatcher
- Technician
- Accountant

---

## Permissions

| Role | Access |
|-|-|
| Admin | Everything |
| Dispatcher | Customers + Jobs |
| Technician | Assigned Jobs |
| Accountant | Invoices + Payments |

---

# Epic 3: Customer Management

---

# US-020: Create Customer Profile

## User Story

**As a dispatcher,  
I want to create customer records,  
so that I can schedule and track service history.**

---

## Customer Information

Required:

- First name
- Last name
- Phone number
- Address


Optional:

- Email
- Notes
- Preferred contact method

---

## Acceptance Criteria

Given I am logged in

When I enter customer information

Then:

- Customer is saved
- Customer appears in customer list
- Customer receives a unique ID

---

# US-021: Search Customers

## User Story

**As a dispatcher,  
I want to search customers quickly,  
so that I can find customer information during calls.**

---

## Search By:

- Name
- Phone
- Email
- Address

---

## Acceptance Criteria

Given I have 500 customers

When I search "Smith"

Then:

Only matching customers appear.

---

# US-022: View Customer History

## User Story

**As a business owner,  
I want to view customer history,  
so that I understand previous service performed.**

---

## Display:

- Previous jobs
- Invoices
- Payments
- Notes
- Photos

---

# Epic 4: Job Management

---

# US-030: Create Service Job

## User Story

**As a dispatcher,  
I want to create a service job,  
so that technicians know what work needs completed.**

---

## Job Information

Required:

- Customer
- Service type
- Description
- Appointment date

Optional:

- Priority
- Estimated duration
- Notes

---

## Acceptance Criteria

Given a customer exists

When I create a job

Then:

- The job is created
- The job appears on the calendar
- The assigned technician receives notification

---

# US-031: Assign Technician

## User Story

**As a dispatcher,  
I want to assign technicians to jobs,  
so that work is distributed effectively.**

---

## Acceptance Criteria

Given multiple technicians exist

When I assign a technician

Then:

- The technician sees the job
- The calendar updates
- The assignment is recorded

---

# US-032: Update Job Status

## User Story

**As a technician,  
I want to update job status,  
so that dispatchers know my progress.**

---

## Job Status Options
