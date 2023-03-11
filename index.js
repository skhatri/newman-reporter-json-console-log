let newman = require('newman');

let createItemisedStats = function(data, options) {
    let out = {};
    let items = [];
    let collectionName = data.collection.name;
    let description = data.collection.description && data.collection.description.type === 'text/plain' ? data.collection.description.content : "not set";
    let envName = data.environment.name;
    let start_time = data.run.timings.started;
    let end_time = data.run.timings.completed;
    let total = end_time - start_time;

    let execCount = 0;
    let assertionCount = 0;
    let skipCount = 0;
    let failCount = 0;

    data.run.executions.forEach(execution => {
        execCount++;
        let name = execution.item.name;
        let id = execution.item.id;
        let url = execution.request.url.toString();
        if (execution.assertions !== undefined) {
            execution.assertions.forEach(assertion => {
                assertionCount++;
                let assertionItem = {
                    collectionName: collectionName,
                    executionName: name,
                    id: id,
                    envName: envName,
                    url: url,
                    assertion: assertion.assertion,
                    skipped: assertion.skipped,
                    failed: assertion.error !== undefined,
                    message: assertion.error ? assertion.error.message : undefined
                };
                if (assertion.skipped) skipCount++;
                if (assertion.error) failCount++;
                items.push(assertionItem);
            });
        } else {
            let execItem = {
                collectionName: collectionName,
                executionName: name,
                id: id,
                envName: envName,
                url: url,
                assertion: "none",
            };
            items.push(execItem);
        }
    });
    let tsVisitor = new TimestampVisitor();

    out["summary"] = {
        collectionName: collectionName,
        description: description,
        envName: envName,
        startTime: start_time,
        endTime: end_time,
        duration: total,
        stats: {
            executions: execCount,
            failed: failCount,
            assertions: assertionCount,
            skipped: skipCount
        }
    };
    tsVisitor.accept(out["summary"]);
    items.forEach(item => tsVisitor.accept(item));
    out["items"] = items;
    return out;
};

class TimestampVisitor {
    accept(obj) {
        obj["timestamp"] = new Date().toISOString();
    }
}


module.exports = function(newman, options) {
    newman.on('beforeDone', function(err, data) {
        if (err) { return; }
        let out = createItemisedStats(data.summary, options);

        console.log(JSON.stringify(out.summary));
        out.items.forEach(item => console.log(JSON.stringify(item)));

        newman.exports.push({
            name: 'newman-reporter-json-console-log',
            default: 'json-console.json',
            path:  options.consoleLogExport,
            content: JSON.stringify(out)
        });
    });
};

