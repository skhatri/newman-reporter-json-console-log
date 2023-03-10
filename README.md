### JSON console log
newman-reporter-json-console-log logs each execution or assertion in a single JSON object

#### How to
This plugin also prints the data to console in addition to exporting file into a path specified by the option --reporter-console-log-export

```
npm install newman-reporter-json-console-log

newman run collections/sample-collection.json --reporters=cli,json-console-log \
--reporter-console-log-export output/console.json
``` 


