// Google Pub sub
const PubSub = require('@google-cloud/pubsub');
const pubSubClient = new PubSub();

const publishMessage = async (arrayPayload, topicFullPath) => {

// send-email topic message payload format
// const objectPayload = {
//   subject: 'ECP Email demo',
//   project_id: 'Quickstart21234',
//   bodyContent: 'Greetings, <br></br><br></br>This is the test email from cloud function accessing private endpoint of communication message API through serverless vpc connector',
//   receiverEmail: ['James.ching@telus.com']
// }
    
  const topic = pubSubClient.topic(topicFullPath);
  const publisher = topic.publisher();

// Check if data passed is an array
  if (Array.isArray(arrayPayload)) {
// Process array parameter and send emails for each object in the array
    for (let i = 0; i < arrayPayload.length; i++) {
      const data = JSON.stringify(arrayPayload[i]);  
      const dataBuffer = Buffer.from(data);
      try {
        const messageId = await publisher.publish(dataBuffer);
        console.log(`Pub/sub Id: ${messageId} sent for Project: ${arrayPayload[i].project_id} Users: ${arrayPayload[i].receiverEmail}`);   
      } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        process.exitCode = 1;
      }
    }
  }
  else {
    console.error('Must pass an array of objects to pub/sub function.');
  }
}

module.exports.publishMessage = publishMessage;