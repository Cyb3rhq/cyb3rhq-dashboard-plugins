
var storeCyb3rhq = stores.open('storeCyb3rhq');
var callRestart = storeCyb3rhq.load('callRestart');

storeCyb3rhq.save('callRestart', true);

if (context.request.queryParams.nodes_list !== undefined) {
  var resp = {
    "data": {
      "affected_items":
        [
          context.request.queryParams.nodes_list
        ],
      "total_affected_items": 1,
      "total_failed_items": 0,
      "failed_items": []
    },
    "message": "All selected nodes information was returned",
    "error": 0
  }

  respond()
    .withStatusCode(200)
    .withData(JSON.stringify(resp))
} else {
  respond()
    .withStatusCode(200)
    .withFile('cluster/cluster_restart.json')
}
