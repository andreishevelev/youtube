let mongodb = function () {

  let insertMongo = async function (email, dob) {

    const uri = "mongodb+srv://admin:admin@cluster0.euhw8sz.mongodb.net/?retryWrites=true&w=majority";
    var Request = require("request");

    let doc = {
      "email": email,
      "dob": dob,
    };

    doc = JSON.stringify(doc);
    doc = JSON.parse(doc);

    try {
      Request.post({
        "headers": { "content-type": "application/json", "api-key": "MmnLh854oUnSY1q3Ky1lsePwA6a3h3kuxzrSWbPXJGOCXQAIsH8M2MfwYrsAinTZ" },
        "url": "https://data.mongodb-api.com/app/data-dxwug/endpoint/data/v1/action/insertOne",
        "body": JSON.stringify({
          "dataSource": "Cluster0",
          "database": "google",
          "collection": "accounts",
          "document": doc
        })
      }, (error, response, body) => {
        if (!error) {
          var resp = JSON.parse(response['body']);
          console.log(resp);
        } else {
          console.log(error);
          insertMongo();
        }
      });
    } catch (error) {
      console.log(`ReporterFs.sendData: `, error);
    }
  }

  // async function run() {
  //   let i = 0;
  //   while (i < 1000) {
  //     await insertMongo();
  //     i++
  //   }
  // }

  // insertMongo()

}
export default mongodb;