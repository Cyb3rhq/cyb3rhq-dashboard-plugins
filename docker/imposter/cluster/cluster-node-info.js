
var selectedNode = context.request.queryParams.select

switch (selectedNode) {
  case 'name':
    respond()
      .withStatusCode(200)
      .withFile('cluster/node/select-name.json');
    break;
  default:
    respond()
      .withStatusCode(200)
      .withFile('cluster/node/response-with-everything.json');
    break;
}

// Commented code is used to test the restart only
//
// var storeCyb3rhq = stores.open('storeCyb3rhq');
// var attemptRestart = storeCyb3rhq.load('attempt');
// var callRestart = storeCyb3rhq.load('callRestart');
// if (callRestart) {
//   if (attemptRestart < 10) {
//     storeCyb3rhq.save('attempt', attemptRestart + 1);
//     respond()
//       .withStatusCode(200)
//       .withFile('cluster/cluster-node-info-no-restart.json')
//   } else {
//     storeCyb3rhq.save('attempt', 0);
//     storeCyb3rhq.save('callRestart', false);
//     respond()
//       .withStatusCode(200)
//       .withFile('cluster/cluster-node-info.json')
//   }
// } else {
//   respond()
//     .withStatusCode(200)
//     .withFile('cluster/cluster-node-info.json')
// }
