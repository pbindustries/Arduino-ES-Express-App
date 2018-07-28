!/usr/bin/env bash

# Hold Kibana till Elasticsearch container starts
while true; do
    nc -q 1 elasticsearch 9200 2>/dev/null && break
done

echo "Starting Kibana"
exec kibana
