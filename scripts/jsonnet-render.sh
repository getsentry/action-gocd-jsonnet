#!/bin/bash

set -eou pipefail

for i in $(find $1 -type f \( -name '*.jsonnet' \)); do
  echo -e "\n🖨️ Rendering: $i\n";
  jsonnet -J $1/vendor -m $2 $i;
done
