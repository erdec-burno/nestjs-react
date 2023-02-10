## Installation fot NestJS

```bash
# change current path
$ cd api

# install dependences
$ npm install
```

## Running the app in Docker

```bash
$ docker-compose up
```

# generate migration
```bash
$ npm run typeorm migration:generate -- -d data-source.ts path/migrationName
```

```bash
$ npm run typeorm migration:run -- -d data-source.ts
```
