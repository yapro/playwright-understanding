#!/bin/sh -e

# чтобы печатались выполняемые команды:
set -o xtrace

# т.к. в командах используются относительные пути, то данный скрипт должен запускаться из корня репозитория
CURRENT_DIR=$(pwd)
PATH_TO_REPOSITORY=$(readlink -f "$(dirname "$0")")

cd $PATH_TO_REPOSITORY

# if [ "$CURRENT_DIR" != "$PATH_TO_REPOSITORY" ]; then
#   echo "$0 must be running in: '$PATH_TO_REPOSITORY' BUT you are trying in: '$CURRENT_DIR'";
#   exit 1;
# fi

# PWDEBUG=console $PATH_TO_REPOSITORY/node_modules/.bin/npx playwright test my-test.spec.ts
#DEBUG=pw:api $PATH_TO_REPOSITORY/node_modules/.bin/npx playwright test my-test.spec.ts
$PATH_TO_REPOSITORY/node_modules/.bin/npx playwright test my-test.spec.ts

cd -
