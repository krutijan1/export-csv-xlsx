const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
const region = 'eu-west-2';

const documentClient = new AWS.DynamoDB.DocumentClient({ region });

exports.importData = async function(tableName) {
  const params = {
    RequestItems: {
      [tableName]: []
    }
  };
  for (let i = 1; i <= 100; i++) {
    params.RequestItems[tableName].push({
      PutRequest: {
        Item: {
          ID: uuid(),
          hashkey: 'testdata',
          numbers: i,
          strings: '"aaa" aaa "aaaa"'
        }
      }
    });
    if (i % 25 === 0) {
      await documentClient.batchWrite(params).promise();
      params.RequestItems[tableName] = [];
    }
  }
  console.log('Importing data into dynamoDb done...');
};
