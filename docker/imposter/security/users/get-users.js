var storeCyb3rhq = stores.open('storeCyb3rhq');
var deleteUser = storeCyb3rhq.load('deleteUser');

switch (deleteUser) {
  case false:
    respond().withStatusCode(200).withFile('security/users/get-users.json');
    break;
  case true:
    storeCyb3rhq.save('deleteUser', false);
    respond()
      .withStatusCode(200)
      .withFile('security/users/get-users-after-delete.json');
    break;
  default:
    respond().withStatusCode(200).withFile('security/users/get-users.json');
    break;
}
