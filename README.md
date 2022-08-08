# UI тесты

Основано на Playwrite: https://playwright.dev/docs/intro

## Запуск в Docker
1. Заходим в контейнер
```shell
docker run -it --rm --net=host --ipc=host --user=$(id -u):$(id -g) -v ${PWD}/tests:/tests -w /tests mcr.microsoft.com/playwright:v1.22.0-focal /bin/bash
```
2. Запускаем (собираем node_modules)
```shell
npm install -D @playwright/test
```
4. Запускаем тест
```shell
URL=https://site.ru npx playwright test my-test.spec.ts -x
```
Глобально установка проходит, но npx не находится:
```shell
npm i -g npx --force
npm i -D @playwright/test
npm install -g @playwright/test
```
Поэтому создал репозиторий и в нем установил:
```shell
npm i npx
npx playwright install
```
