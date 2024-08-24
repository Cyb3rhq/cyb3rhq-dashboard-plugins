# Plugin configuration

The Cyb3rhq Core plugin has the following settings to configure through the platform configuration
file (`opensearch_dashboards.yml`):

| setting                                   | type   | default value          | description                                         |
| ----------------------------------------- | ------ | ---------------------- | --------------------------------------------------- |
| `cyb3rhq_core.configuration.encryption_key` | string | `secretencryptionkey!` | Define a key used encrypt some configuration values |
| `cyb3rhq_core.instance`                     | string | `cyb3rhq-dashboard`      | Define the instance of the configuration            |

> :warning: Changing the `cyb3rhq_core.configuration.encryption_key` in an environment with API host entries
> configured previously, it will cause a problem.

# Configuration of the Cyb3rhq scoped plugins

The Cyb3rhq Core plugin exposes a instance of a service that allows other plugins can register
settings.

This service is the way to manage the Cyb3rhq scoped plugins configuration.

These settings can be configured through the `Server Management` > `App Settings` application.

This configuration is stored in a saved object in the backend side. Some sensitive data such as the
related to the API host entries is encrypted using `cyb3rhq_core.configuration.encryption_key`.

## Configure

The configuration can be done through the `Server Management` > `App Settings` application.

### Advanced user - platform API endpoints

It is possible manage the configuration through the platform API endpoints:

- `GET /utils/configuration`: get the configuration (not included the API hosts)
- `PUT /utils/configuration`: update the configuration
- `PUT /utils/configuration/files/{key}`: update the configuration related to files
  (store file and update the setting)
- `DELETE /utils/configuration/files/{key}`: delete the configuration related to files
  (delete file and clear the setting)

### Advanced user - saved object

As the configuration is stored in a saved object, it is possible using the Cyb3rhq indexer API or
saved object API of Cyb3rhq dashboard to manage this data.

:warning: Some fields are encrypted, so updating these fields without the expected encrypted value
can cause problems. It is not recommended to updating the encrypted settings using this method.

#### Get the saved object

The configuration is stored in a saved object of the type: `cyb3rhq-dashboard-plugins-config`.

To retrieve or backup the data, you can get the configuration doing a request to Cyb3rhq indexer using
cURL or Dev Tools plugin:

```
GET .kibana*/_search
{
  "query": {
    "match": {
      "type": "cyb3rhq-dashboard-plugins-config"
    }
  }
}
```

#### Create the saved object

TODO

#### Update the saved object

TODO

#### Remove the saved object

If you want to remove or reset the configuration, you can remove the saved object doing a request to
Cyb3rhq indexer using cURL or Dev Tools plugin:

```
POST .kibana*/_delete_by_query
{
  "query": {
    "match": {
      "type": "cyb3rhq-config"
    }
  }
}
```

# Configuration of the API host entries

The API host entries data is stored in the same saved object where is located all the Cyb3rhq scoped
plugins configuration. This data is encrypted using the `cyb3rhq_core.configuration.encryption_key` plugin
setting defined in the platform configuration.

## Configure

The API host entries can be managed through the `Server APIs` application:

- Create
- Update
- Remove

These actions require a privileged user which has the role `all_access`.

The UI display this requirement and disable the related buttons.

Moreover, the platform API endpoints are protected with the same requirement.

The edition of the API host data support partial changes, this means only the changed data is
updated in the configuration. The password fields are empty by security reasons when editing.

## Advanced users - platform API endpoints

It is possible manage the API host configuration through the platform API endpoints:

- `GET /hosts/apis`: get the API hosts entries
- `PUT /hosts/apis/{id}`: create/update the API host configuration
- `DELETE /hosts/apis/{id}`: delete the API host configuration

These endpoints communicates with the saved object decrypt and encrypt the data.

# Multiple instances of Cyb3rhq dashboard

If you want to run multiple instances of Cyb3rhq dashboard with different or shared configuration, it is
possible through using a different configuration. This can be done through the
`cyb3rhq_core.instance` setting.

## Different configuration for each instance

Define an unique value for `cyb3rhq_core.instance` setting.

```yml
# opensearch_dashboards.yml of Cyb3rhq dashboard instance 1
cyb3rhq_core.instance: cyb3rhq-dashboard1
```

```yml
# opensearch_dashboards.yml of Cyb3rhq dashboard instance 1
cyb3rhq_core.instance: cyb3rhq-dashboard2
```

This causes the instances have the configuration independant of the another instance.

## Shared configuraion

Define an the same value in the instance you want to share the configuration.

```yml
# opensearch_dashboards.yml of Cyb3rhq dashboard instance 1
cyb3rhq_core.instance: cyb3rhq-dashboard
```

```yml
# opensearch_dashboards.yml of Cyb3rhq dashboard instance 1
cyb3rhq_core.instance: cyb3rhq-dashboard
```

> Consider some settings requires to restart the server, so if you change some setting that needs
> to restart the server, then you should restart each instance that is sharing the configuration if
> you want to take effect. WARNING: some setting that needs the restart are related to the jobs,
> if these are enabled in multiple instances could cause duplication of information.
