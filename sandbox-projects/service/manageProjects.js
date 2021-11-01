const {google} = require("googleapis");
const cloudresourcemanager = google.cloudresourcemanager("v1");
const cloudbilling = google.cloudbilling("v1");

// This function deletes the project that is passed
const deleteProject = async (project_Id, authClient) => {
    const requestDeleteProject = {
      projectId: project_Id, 
      auth: authClient,
    };
  
  // Call Resource Manager API using the delete method (delete project)  
    try {
      await cloudresourcemanager.projects.delete(requestDeleteProject);
      console.log(`Project deleted: ${project_Id}`);
    } catch (err) {
      console.log(`Project deletion error: ${err}`);
    }
  }

// This function suspends the billing of the project that is passed
const suspendProjectBilling = async (project_Id, authClient) => {
  const requestSuspendProject = {
    name: 'projects/' + project_Id,  
    resource: {
      "billingAccountName": ""
    },
    auth: authClient,
  };

// Call Billing API using the updateBillingInfo method 
  try {
    await cloudbilling.projects.updateBillingInfo(requestSuspendProject);
    console.log(`Billing suspension for project: ${project_Id} was successfully performed.`);
  } catch (err) {
    console.log(`Billing suspension error: ${err}`);
  }
}

// This function moves projects to the Sandbox Folder
const moveProjectToSandboxFolder = async (project_Id, authClient) => {
  const requestMove = {
    projectId: project_Id,
    resource: {
      "parent": {
        "id": "97028179999",
        "type": "folder"
      }
    },
    auth: authClient,
  };

// Call Resource Manager api update projects
  try {
    const response = (await cloudresourcemanager.projects.update(requestMove)).data;
    console.log(`Successfully moved project: ${project_Id} to Sandbox folder.`);
  } catch (err) {
    console.error(`Error: ${err} when moving project: ${project_Id} to Sandbox folder.`);
  }
}

module.exports.deleteProject = deleteProject;
module.exports.suspendProjectBilling = suspendProjectBilling;
module.exports.moveProjectToSandboxFolder = moveProjectToSandboxFolder;