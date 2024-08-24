#/bin/sh

# X-Pack environment utility which:
#   - creates the "cyb3rhq_app" user
#   - creates the "cyb3rhq_indices" role
#   - maps the "cyb3rhq_indices" role to the "cyb3rhq_app" user

# Elasticsearch host
elasticsearch_admin="elastic"
elasticsearch_admin_password="SecretPassword"
elasticsearch_host="https://${1-localhost}:9200"

# User, roles and role mapping definition
cyb3rhq_indices_role="cyb3rhq_indices"
cyb3rhq_indices_pattern="cyb3rhq-*"
cyb3rhq_user_username="cyb3rhq_app"
cyb3rhq_user_password="cyb3rhq_app"
kibana_system_role="kibana_system"

exit_with_message(){
  echo $1;
  exit 1;
}

# Create "cyb3rhq_indices" role
echo " Creating '$cyb3rhq_indices_role' role..."
curl \
  -X POST \
  -H 'Content-Type: application/json' \
  -k -u $elasticsearch_admin:$elasticsearch_admin_password \
  $elasticsearch_host/_security/role/$cyb3rhq_indices_role -d@- << EOF || exit_with_message "Error creating $cyb3rhq_indices_role role"
{
  "cluster": [ "all" ],
  "indices": [
    {
      "names" : [ "$cyb3rhq_indices_pattern" ],
      "privileges": [ "all" ]
    }
  ]
}
EOF
echo ""

# Create "cyb3rhq_user" user
echo "Creating "$cyb3rhq_user_username" user..."
curl \
  -X POST \
  -H 'Content-Type: application/json' \
  -k -u $elasticsearch_admin:$elasticsearch_admin_password \
  $elasticsearch_host/_security/user/$cyb3rhq_user_username -d@- << EOF || exit_with_message "Error creating $cyb3rhq_user_username user"
{
  "username" : "$cyb3rhq_user_username",
  "password" : "$cyb3rhq_user_password",
  "roles" : [ "$kibana_system_role", "$cyb3rhq_indices_role" ],
  "full_name" : "",
  "email" : ""
}
EOF
echo ""
