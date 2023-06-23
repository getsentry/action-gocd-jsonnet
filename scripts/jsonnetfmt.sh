#!/bin/bash

set -eou pipefail

for i in $(find $1 -type f \( -name '*.libsonnet' -o -name '*.jsonnet' \)); do
  echo -e "\n📋 Checking format of: $i\n";
  jsonnetfmt --test $i
done
