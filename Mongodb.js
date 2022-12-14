import {expect} from 'chai';
import Request from 'request'
import supertest from 'supertest';

const token = `MmnLh854oUnSY1q3Ky1lsePwA6a3h3kuxzrSWbPXJGOCXQAIsH8M2MfwYrsAinTZ`
const baseUrl = `https://data.mongodb-api.com/app/data-dxwug/endpoint/data/v1/action`
const headers = `content-type": "application/json", "api-key": "MmnLh854oUnSY1q3Ky1lsePwA6a3h3kuxzrSWbPXJGOCXQAIsH8M2MfwYrsAinTZ`

export function insertOne(database, collection, data) {
  data = JSON.stringify(data);
  data = JSON.parse(data);

  try {
    Request.post({
      "headers": { headers },
      "url": `${baseUrl}/insertOne`,
      "body": JSON.stringify({
        "dataSource": "Cluster0",
        "database": database,
        "collection": collection,
        "document": data
      })
    }, (error, response, body) => {
      if (!error) {
        var resp = JSON.parse(response['body']);
        console.log(resp);
      } else {
        console.log(error);
        insertOne();
      }
    });
  } catch (error) {
    console.log(`ReporterFs.sendData: `, error);
  }
}

export async function insertArray(database, collection, data) {

  data = JSON.stringify(data);
  data = JSON.parse(data);

  try {
    Request.post({
      "headers": { "content-type": "application/json", "api-key": "MmnLh854oUnSY1q3Ky1lsePwA6a3h3kuxzrSWbPXJGOCXQAIsH8M2MfwYrsAinTZ" },
      "url": "https://data.mongodb-api.com/app/data-dxwug/endpoint/data/v1/action/updateOne",
      "body": JSON.stringify({
        "dataSource": "Cluster0",
        "database": database,
        "collection": collection,
        "filter": { "channelName": "veselovka" },
        "update": {
          "$push": {
            "videos":
            {
              "$each": [
                data
              ]
            }
          }
        }
      })
    }, (error, response, body) => {
      if (!error) {
        var resp = JSON.parse(response['body']);
        console.log(resp);
      } else {
        console.log(error);
        insertArray();
      }
    });

  } catch (error) {
    console.log(`ReporterFs.sendData: `, error);
  }
}

export async function findOne(database, collection) {



  // data = JSON.stringify(data);
  // data = JSON.parse(data);

  try {
    Request.post({
      "headers": { "content-type": "application/json", "api-key": "MmnLh854oUnSY1q3Ky1lsePwA6a3h3kuxzrSWbPXJGOCXQAIsH8M2MfwYrsAinTZ" },
      "url": "https://data.mongodb-api.com/app/data-dxwug/endpoint/data/v1/action/findOne",
      "body": JSON.stringify({
        "dataSource": "Cluster0",
        "database": database,
        "collection": collection,
        "filter": { "channelName": "veselovka" }
      })
    }, (error, response, body) => {
      if (!error) {
        var resp = JSON.parse(response['body']);
        console.log(`RESP**********`, resp);
        return resp;
      } else {
        console.log(error);
        findOne();
      }
    });

  } catch (error) {
    console.log(`ReporterFs.sendData: `, error);
  }
}

export async function findOneST(database, collection) {

  const payload = {
    "dataSource": "Cluster0",
    "database": database,
    "collection": collection,
    "filter": { "channelName": "veselovka" }
  }

  const request = supertest('https://data.mongodb-api.com/app/data-dxwug/endpoint/data/v1/action/');

  try {
    const res = await request
      .post(`findOne`)
      .set('content-type', 'application/json')
      .set('api-key', token)
      .send(payload);
    // expect(res.status).to.be.eq(200);
    return res.body;

  } catch (error) {
    console.log(`ReporterFs.sendData: `, error);
  }
}