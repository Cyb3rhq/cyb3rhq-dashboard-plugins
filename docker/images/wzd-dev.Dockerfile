# Usage: docker build --build-arg NODE_VERSION=16.20.0 --build-arg CYB3RHQ_DASHBOARD_VERSION=4.6.0 -t quay.io/cyb3rhq/osd-dev:4.6.0 -f wzd-dev.Dockerfile .

ARG NODE_VERSION
FROM node:${NODE_VERSION} AS base
ARG CYB3RHQ_DASHBOARD_VERSION
USER node
RUN git clone --depth 1 --branch ${CYB3RHQ_DASHBOARD_VERSION} https://github.com/cyb3rhq/cyb3rhq-dashboard.git /home/node/kbn
RUN chown node.node /home/node/kbn

WORKDIR /home/node/kbn
RUN yarn osd bootstrap --production


WORKDIR /home/node/kbn/plugins
RUN git clone --depth 1 --branch ${CYB3RHQ_DASHBOARD_VERSION} https://github.com/cyb3rhq/cyb3rhq-security-dashboards-plugin.git
WORKDIR /home/node/kbn/plugins/cyb3rhq-security-dashboards-plugin
RUN yarn install

RUN mkdir -p /home/node/kbn/data/cyb3rhq/config

FROM node:${NODE_VERSION}
USER node
COPY --chown=node:node --from=base /home/node/kbn /home/node/kbn
WORKDIR /home/node/kbn
