FROM ubuntu:18.04

ARG CYB3RHQ_VERSION
ARG FILEBEAT_VERSION
ARG FILEBEAT_CYB3RHQ_TEMPLATE_URL
ARG FILEBEAT_CYB3RHQ_MODULE_URL

COPY --chown=root:root preloaded-vars.conf supervisord.conf /tmp/
COPY --chown=root:root entrypoint.sh /scripts/entrypoint.sh

RUN apt-get update -y \
    && apt-get -y install supervisor python git gnupg2 gcc make vim wget build-essential \
        libc6-dev libc6-dev-mips64-cross curl policycoreutils automake autoconf libtool apt-transport-https lsb-release python-cryptography \
    && wget -O - https://apt.kitware.com/keys/kitware-archive-latest.asc 2>/dev/null | gpg --dearmor - | tee /etc/apt/trusted.gpg.d/kitware.gpg >/dev/null \
    && echo "deb https://apt.kitware.com/ubuntu/ bionic main" | tee -a /etc/apt/sources.list.d/cmake.list \
    && apt-get update -y \
    && apt-get install cmake -y \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p /var/log/supervisor \
    && mv /tmp/supervisord.conf /etc/supervisor/conf.d/ \
    && curl -Ls https://github.com/cyb3rhq/cyb3rhq/archive/$CYB3RHQ_VERSION.tar.gz | tar zx \
    && CYB3RHQ_TMP_INSTALLER_DIRECTORY="/$(ls | grep cyb3rhq)" \
    && cp /tmp/preloaded-vars.conf $CYB3RHQ_TMP_INSTALLER_DIRECTORY/etc/ \
    && $CYB3RHQ_TMP_INSTALLER_DIRECTORY/install.sh \
    && rm -rf $CYB3RHQ_TMP_INSTALLER_DIRECTORY \
    && curl -so /tmp/filebeat-installer.deb https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-oss-$FILEBEAT_VERSION-amd64.deb \
    && dpkg -i /tmp/filebeat-installer.deb \
    && curl -so /etc/filebeat/cyb3rhq-template.json $FILEBEAT_CYB3RHQ_TEMPLATE_URL \
    && curl -s $FILEBEAT_CYB3RHQ_MODULE_URL | tar -xvz -C /usr/share/filebeat/module

ENTRYPOINT /scripts/entrypoint.sh

WORKDIR /var/ossec

EXPOSE 514
EXPOSE 1514
EXPOSE 1515
EXPOSE 1516
EXPOSE 55000

### Variables ###

## Arguments
# CYB3RHQ_VERSION - Define the Cyb3rhq branch/tag to install. [CYB3RHQ_VERSION=4.1.0]
# FILEBEAT_VERSION - Filebeat Version
# FILEBEAT_CYB3RHQ_TEMPLATE_URL - Link with the Cyb3rhq template. [FILEBEAT_CYB3RHQ_TEMPLATE_URL=https://raw.githubusercontent.com/cyb3rhq/cyb3rhq/4.0/extensions/elasticsearch/7.x/cyb3rhq-template.json]
# FILEBEAT_CYB3RHQ_MODULE_URL - Link with the Cyb3rhq Filebeat module. [FILEBEAT_CYB3RHQ_MODULE_URL=https://packages.wazuh.com/4.x/filebeat/cyb3rhq-filebeat-0.4.tar.gz]
