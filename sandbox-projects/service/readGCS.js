// Google Cloud Storage client library
const {Storage} = require('@google-cloud/storage');
// Create Cloud Storage client
const storage = new Storage();

// Function to read file from Google Cloud Storage
// Uses Node Stream and returns a promise.
function readGCSFile (bucketName,fileName) {
  const bucket = storage.bucket(bucketName);
  const remoteFile = bucket.file(fileName);
  let readStream = remoteFile.createReadStream();
  let readBuffer = '';

  return new Promise((resolve,reject) => {
    readStream.on('data', function(dataChunk) {
      readBuffer += dataChunk;})
        .on('end', function() {resolve(readBuffer)})
          .on('error', error => reject(error));
  });
}

module.exports.readGCSFile = readGCSFile;