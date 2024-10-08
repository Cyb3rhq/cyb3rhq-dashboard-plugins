#!/usr/bin/env bash

elastic_versions=(
	"7.14.2"
	"7.14.1"
	"7.14.0"
	"7.13.4"
	"7.13.3"
	"7.13.2"
	"7.13.1"
	"7.13.0"
	"7.12.1"
	"7.11.2"
	"7.10.2"
)

cyb3rhq_versions=(
	"4.2.7"
	"4.2.6"
	"4.2.5"
	"4.2.4"
	"4.2.3"
	"4.2.2"
	"4.2.1"
	"4.2.0"
)

usage() {
	echo
	echo "$0 elastic_version cyb3rhq_manager_version action "
	echo
	echo "where"
	echo "  elastic_version is one of " ${elastic_versions[*]}
	echo "  cyb3rhq_manager_version if one of " ${cyb3rhq_versions[*]}
	echo "  action is one of up | down | stop"
	exit -1
}

if [ $# -ne 3 ]
  then
  	echo "Incorrect number of arguments " $#
    usage
fi

if [[ ! " ${elastic_versions[*]} " =~ " ${1} " ]]
 then
 	echo "Version ${1} not found in ${elastic_versions[*]}"
 	exit -1
fi

if [[ ! " ${cyb3rhq_versions[*]} " =~ " ${2} " ]]
 then
 	echo "Version ${2} not found in ${cyb3rhq_versions[*]}"
 	exit -1
fi

export ES_VERSION=$1
export CYB3RHQ_VERSION=$2
export ELASTIC_PASSWORD=${PASSWORD:-SecretPassword}
export KIBANA_PASSWORD=${PASSWORD:-SecretPassword}
export CLUSTER_NAME=cluster
export LICENSE=basic # or trial
export KIBANA_PORT=${PORT:-5601}
export COMPOSE_PROJECT_NAME=es-rel-${ES_VERSION//./}

case "$3" in
	up)
		# recreate volumes
		docker compose -f rel.yml up -Vd

		# This installs Cyb3rhq and integrates with a default Elastic stack
		# v=$( echo -n $ES_VERSION | sed 's/\.//g' )
		echo
		echo "Install Cyb3rhq ${CYB3RHQ_VERSION} into Elastic ${ES_VERSION} manually with:"
		echo
		echo "1. Install the Cyb3rhq app for Kibana"
		echo "docker exec -ti ${COMPOSE_PROJECT_NAME}-kibana-1 /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/4.x/ui/kibana/cyb3rhq_kibana-${CYB3RHQ_VERSION}_${ES_VERSION}-1.zip"
		echo
    echo "2. Restart Kibana"
		echo "docker restart ${COMPOSE_PROJECT_NAME}-kibana-1"
		echo
    echo "3. Configure Kibana"
		echo "docker cp ./config/kibana/cyb3rhq.yml ${COMPOSE_PROJECT_NAME}-kibana-1:/usr/share/kibana/data/cyb3rhq/config/"
    echo
    echo "4. Open Kibana in a browser:"
    echo "http://localhost:${KIBANA_PORT}"
    echo
    echo "5. (Optional) Enroll an agent (Ubuntu 20.04):"
    echo "docker run --name ${COMPOSE_PROJECT_NAME}-cyb3rhq.agent --network ${COMPOSE_PROJECT_NAME} --label com.docker.compose.project=${COMPOSE_PROJECT_NAME} -d ubuntu:20.04 bash -c '"
    echo "  apt update -y"
    echo "  apt install -y curl lsb-release"
    echo "  curl -so \cyb3rhq-agent-${CYB3RHQ_VERSION}.deb \\"
    echo "    https://packages.wazuh.com/4.x/apt/pool/main/w/cyb3rhq-agent/cyb3rhq-agent_${CYB3RHQ_VERSION}-1_amd64.deb \\"
    echo "    && CYB3RHQ_MANAGER='cyb3rhq.manager' CYB3RHQ_AGENT_GROUP='default' dpkg -i ./cyb3rhq-agent-${CYB3RHQ_VERSION}.deb"
    echo
    echo "  /etc/init.d/cyb3rhq-agent start"
    echo "  tail -f /var/ossec/logs/ossec.log"
    echo "'"
    echo
		;;
	down)
		# delete volumes
		docker compose -f rel.yml down -v --remove-orphans
		;;
	stop)
		docker compose -f rel.yml -p ${COMPOSE_PROJECT_NAME} stop
		;;
	*)
		usage
		;;
esac
