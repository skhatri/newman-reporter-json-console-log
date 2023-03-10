### JSON console log
newman-reporter-json-console-log logs each execution or assertion in a single JSON object

#### How to
This plugin also prints the data to console in addition to exporting file into a path specified by the option --reporter-console-log-export

```
npm install newman-reporter-json-console-log

newman run collections/sample-collection.json --reporters=cli,json-console-log \
--reporter-console-log-export output/console.json
``` 

#### Sample Output
```json
{"collectionName":"Sample Postman Collection","description":"A sample collection to demonstrate collections as a set of related requests","startTime":1678451280827,"endTime":1678451287176,"duration":6349,"stats":{"executions":3,"failed":0,"assertions":2,"skipped":0},"timestamp":"2023-03-10T12:28:07.176Z"}
{"collectionName":"Sample Postman Collection","executionName":"A simple GET request","id":"8884f92a-c454-4526-9a44-e64272a530ea","url":"https://postman-echo.com/get?source=newman-sample-github-collection","assertion":"expect response be 200","skipped":false,"failed":false,"timestamp":"2023-03-10T12:28:07.176Z"}
{"collectionName":"Sample Postman Collection","executionName":"A simple GET request","id":"8884f92a-c454-4526-9a44-e64272a530ea","url":"https://postman-echo.com/get?source=newman-sample-github-collection","assertion":"expect response json contain args","skipped":false,"failed":false,"timestamp":"2023-03-10T12:28:07.176Z"}
{"collectionName":"Sample Postman Collection","executionName":"A simple POST request","id":"dc6bd206-abe3-43f4-aafa-1ab0842bab80","url":"https://postman-echo.com/post","assertion":"none","timestamp":"2023-03-10T12:28:07.176Z"}

```

