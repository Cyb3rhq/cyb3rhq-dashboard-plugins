var storeCyb3rhq = stores.open('storeCyb3rhq');
var deleteRolesMapping = storeCyb3rhq.load('deleteRolesMapping');

switch (deleteRolesMapping) {
  case false:
    respond()
      .withStatusCode(200)
      .withFile('security/roles-mapping/get-rules.json');
    break;
  case true:
    storeCyb3rhq.save('deleteRolesMapping', false);
    respond()
      .withStatusCode(200)
      .withFile('security/roles-mapping/get-rules-after-delete.json');
    break;
  default:
    respond()
      .withStatusCode(200)
      .withFile('security/roles-mapping/get-rules.json');
    break;
}
