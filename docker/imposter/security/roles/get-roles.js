var storeCyb3rhq = stores.open('storeCyb3rhq');
var deleteRole = storeCyb3rhq.load('deleteRole');

switch (deleteRole) {
  case false:
    respond().withStatusCode(200).withFile('security/roles/get-roles.json');
    break;
  case true:
    storeCyb3rhq.save('deleteRole', false);
    respond()
      .withStatusCode(200)
      .withFile('security/roles/get-roles-after-delete.json');
    break;
  default:
    respond().withStatusCode(200).withFile('security/roles/get-roles.json');
    break;
}
