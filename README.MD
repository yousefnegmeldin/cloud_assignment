
# Event-Driven Order Notification System – AWS Assignment

## Overview

This project demonstrates a serverless, event-driven backend architecture tailored for a basic e-commerce platform. Using core AWS services, it efficiently manages order intake, data persistence, event notification, message queuing, and background processing via Lambda.

---

## Components Overview

| AWS Service  | Functionality                                                         |
|--------------|------------------------------------------------------------------------|
| **DynamoDB** | Acts as the primary data store for order records in the `Orders` table |
| **SNS**      | `OrderTopic` publishes events each time a new order is placed         |
| **SQS**      | `OrderQueue` buffers messages published by the SNS topic              |
| **Lambda**   | Consumes messages from SQS and writes order details to DynamoDB       |
| **DLQ**      | Collects messages that fail processing after three retries            |

---

## Setup Guide

### 1. DynamoDB Table – `Orders`
- Create a table named `Orders`.
- Use `orderId` (String) as the **partition key**.
- Add additional fields: `userId`, `itemName`, `quantity`, `status`, and `timestamp`.

### 2. SNS Topic – `OrderTopic`
- Set up an SNS topic called `OrderTopic` to publish incoming order notifications.

### 3. SQS Queues – `OrderQueue` and `OrderDLQ`
- Create a **Standard SQS queue** named `OrderQueue`.
- Create a **Dead-Letter Queue** called `OrderDLQ`.
- Link `OrderDLQ` to `OrderQueue` with a `maxReceiveCount` threshold of 3.

### 4. SNS Subscription
- Subscribe `OrderQueue` to the `OrderTopic`.
- Update the queue’s access policy to allow message publishing from SNS.
