const {google} = require("googleapis");

// Function to authorize the API requests
// Uses Google Application Default Credentials (so for serverless apps it is the credentials of the service account)
const authorize = async () => {
    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/cloud-platform"]
    });
    return await auth.getClient();
  }

module.exports.authorize = authorize;