var storeCyb3rhq = stores.open('storeCyb3rhq');
var deletePolicies = storeCyb3rhq.load('deletePolicies');

switch (deletePolicies) {
  case false:
    respond()
      .withStatusCode(200)
      .withFile('security/policies/get-policies.json');
    break;
  case true:
    storeCyb3rhq.save('deletePolicies', false);
    respond()
      .withStatusCode(200)
      .withFile('security/policies/get-policies-after-delete.json');
    break;
  default:
    respond()
      .withStatusCode(200)
      .withFile('security/policies/get-policies.json');
    break;
}
