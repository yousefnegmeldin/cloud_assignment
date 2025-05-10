
# Visibility Timeout and Dead-Letter Queue (DLQ) – Explanation

In a serverless event-driven system using AWS Lambda and Amazon SQS, **visibility timeout** and **Dead-Letter Queues (DLQs)** play a key role in handling message failures and ensuring reliable processing.

## 1. Visibility Timeout  
When a message is picked up from the SQS queue by a Lambda function, it becomes invisible to other consumers for a period called the *visibility timeout*. This prevents multiple instances from processing the same message at the same time.

If the function completes the task successfully, the message gets removed from the queue. But if it fails (due to errors or timeout), the message reappears once the timeout expires, allowing it to be retried automatically. This mechanism is helpful when dealing with temporary issues like API errors or throttling in services like DynamoDB.

## 2. Dead-Letter Queue (DLQ)  
To avoid retrying the same failing message over and over, we use a Dead-Letter Queue. In this setup, if a message fails a certain number of times (e.g., 3 attempts), it gets moved to the DLQ.

This is beneficial because it:
- Helps isolate and investigate faulty messages
- Avoids overwhelming the system with repeated retries
- Keeps the main queue flowing smoothly

## How They Work Together  
While visibility timeout gives the system a chance to retry messages that fail temporarily, the DLQ ensures that persistent failures don’t clog the pipeline. Used together, they offer a reliable and fault-tolerant way to process events in AWS-based architectures.
