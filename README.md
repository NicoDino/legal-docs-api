# legal-docs-api

### Ejecución

- Reemplazar `.env.example` con el `.env` requerido
- `npm i`
- `npm run build`
- `npm run dev`
- La consola debería mostrar algo parecido a:
    ```
    [nodemon] 2.0.4
    [nodemon] to restart at any time, enter rs
    [nodemon] watching path(s): *.*
    [nodemon] watching extensions: ts,json
    [nodemon] starting ts-node ./src/index.ts
    Server is listening on 3000
    The Conection is Ok
    ```


## Deploy

- Accedemos via ssh al servidor (user legalaid)
- `cd legal-aid-api`
- Nos movemos la branch correspondiente y hacemos `git pull` + `npm i` si es necesario
- Si es necesario, actualizamos el archivo config.private.ts dentro de ../legal-aid-api/src
- `npm run build`
