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
- `pm2 restart ecosystem.config.js`


## Pasos seguidos para configurar el servidor

Configuración inicial del server
https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04

Configuración del firewall
https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands

mongodb instalacion para ubuntu 18
https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04

Nginx para ubuntu 18
https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04-quickstart

como deployar una app node en nginx
https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04

configurar DNS con digitalocean
https://www.digitalocean.com/docs/networking/dns/

setup node server 
https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04


