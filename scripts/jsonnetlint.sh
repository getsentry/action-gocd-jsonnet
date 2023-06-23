#!/bin/bash

set -eou pipefail

for i in $(find $1 -type f \( -name '*.libsonnet' -o -name '*.jsonnet' \)); do
  echo -e "\n🔬 Linting: $i\n";
  jsonnet-lint -J $1/vendor $i
done
