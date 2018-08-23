import ipfsAPI from "ipfs-api"
const ipfs = ipfsAPI({ host: "localhost", port: "5001", protocol: "http" });


export function saveImageOnIpfs(reader) {
  return new Promise(function(resolve, reject) {
    const buffer = Buffer.from(reader.result);
    ipfs
    .add(buffer)
    .then(response => {
      resolve(response[0].hash);
    })
    .catch(err => {
      console.error(err);
      reject(err);
    });
  });
}

export function saveTextBlolbOnIpfs(blob) {
  return new Promise(function(resolve, reject) {
    const descriptionBuffer = Buffer.from(blob, "utf-8");
    ipfs
    .add(descriptionBuffer)
    .then(response => {
      resolve(response[0].hash);
    })
    .catch(err => {
      console.error(err);
      reject(err);
    });
  });
}
