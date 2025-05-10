
# Event-Driven Order Notification System – AWS Assignment

## Overview

This project sets up a serverless, event-driven backend for an e-commerce platform using core AWS services. It handles order submission, persistent storage, event broadcasting, queuing, and message processing using Lambda functions.

---

---

## Components Used

| Service      | Role                                                                 |
|--------------|----------------------------------------------------------------------|
| **DynamoDB** | Stores order records in a table named `Orders`                      |
| **SNS**      | Topic `OrderTopic` publishes new order events                       |
| **SQS**      | Queue `OrderQueue` receives SNS messages                            |
| **Lambda**   | Processes messages from SQS and inserts into DynamoDB               |
| **DLQ**      | Captures failed messages from `OrderQueue` after 3 failed attempts  |

---

## Setup Instructions

### 1. DynamoDB Table – `Orders`
- **Partition key**: `orderId` (String)
- **Other attributes**: `userId`, `itemName`, `quantity`, `status`, `timestamp`

### 2. SNS – `OrderTopic`
- Create an SNS Topic named `OrderTopic`.

### 3. SQS – `OrderQueue` and `OrderDLQ`
- Create a **Standard SQS Queue** named `OrderQueue`.
- Create a **Dead Letter Queue (DLQ)** named `OrderDLQ`.
- Attach DLQ to `OrderQueue` with `maxReceiveCount = 3`.

### 4. Subscribe Queue to SNS Topic
- Subscribe `OrderQueue` to `OrderTopic`.
- Ensure `OrderQueue` policy allows SNS to send messages.

