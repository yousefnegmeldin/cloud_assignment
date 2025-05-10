import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const ddb = new DynamoDBClient({ region: "eu-central-1" });

export const handler = async (event) => {
  try {
    for (const record of event.Records) {
      const outerBody = JSON.parse(record.body);
      const snsMessage = JSON.parse(outerBody.Message); // Get the actual order object

      console.log("Received order:", snsMessage);

      const putCommand = new PutItemCommand({
        TableName: "Orders",
        Item: {
          orderId: { S: snsMessage.orderId },
          userId: { S: snsMessage.userId },
          itemName: { S: snsMessage.itemName },
          quantity: { N: snsMessage.quantity.toString() },
          status: { S: snsMessage.status },
          timestamp: { S: snsMessage.timestamp },
        },
      });

      await ddb.send(putCommand);

      console.log(`Order ${snsMessage.orderId} inserted into DynamoDB.`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify("Orders processed successfully."),
    };
  } catch (error) {
    console.error("Error processing orders:", error);
    throw error;
  }
};
