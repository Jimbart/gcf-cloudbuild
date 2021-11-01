const {google} = require("googleapis");
const cloudresourcemanager = google.cloudresourcemanager("v1");

// This module gets the list of users associated with the project that is passed
const getUsers = async (projectId, authClient) => {
    const requestIAM = {
      resource_: projectId, 
      auth: authClient,
    };
  
    let responseIAMarray;
// Array of users, to be returned by the function
    let projectMembers = [];
  
// Call Resource Manager API using the getIAM method (list users of the project)  
    try {
      const responseIAM = (await cloudresourcemanager.projects.getIamPolicy(requestIAM)).data;
      if ("bindings" in responseIAM) {
        responseIAMarray = responseIAM.bindings;
      } else {
        responseIAMarray = [];
      }
    } catch (err) {
      console.log("Get project users error: ",err);
    }
  
// Iterate through the response payload
    for (let x = 0; x < responseIAMarray.length; x++) {
      for (let y = 0; y < responseIAMarray[x].members.length; y++) {
        if (responseIAMarray[x].members[y].substring(0,4) == "user" ) {
          projectMembers.push(responseIAMarray[x].members[y].substring(5,responseIAMarray[x].members[y].length));
        }
      }
    }
// Return an Array using set object to eliminate duplicate emails.
    return Array.from(new Set(projectMembers));
  }

module.exports.getUsers = getUsers;
