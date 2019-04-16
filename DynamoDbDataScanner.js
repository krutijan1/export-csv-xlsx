const AWS = require('aws-sdk');
const region = 'eu-west-2';
const documentClient = new AWS.DynamoDB.DocumentClient({ region });

exports.scanTable = async function (tableName) {
  const params = {
    TableName: tableName
  };

  let scanResults = [];
  let items;
  
  do {
    items = await documentClient.scan(params).promise();
    items.Items.forEach(item => scanResults.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey != 'undefined');

  return scanResults;
}
