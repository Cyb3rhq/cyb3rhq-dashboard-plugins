
var storeCyb3rhq = stores.open('storeCyb3rhq');
var attemptRestart = storeCyb3rhq.load('attempt');


if(attemptRestart < 5){
    storeCyb3rhq.save('attempt', attemptRestart + 1);
    respond()
        .withStatusCode(200)
        .withFile('cluster/cluster_sync_no_sync.json')
} else {
    storeCyb3rhq.save('attempt', 0);
    respond()
        .withStatusCode(200)
        .withFile('cluster/cluster_sync.json')
}
