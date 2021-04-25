# chat-websocket

Create a simple web app chat with  **Chat websocket**.


## Features

1. Clients can send message asking for support

![help_client](https://user-images.githubusercontent.com/48420402/116005769-c87ead80-a5de-11eb-9a88-d81f2087b1a7.PNG)

2. Admin can help the clients

![help_admin](https://user-images.githubusercontent.com/48420402/116005820-ffed5a00-a5de-11eb-8a8b-d072f3562971.PNG)

## Install dependencies

```sh
npm install
```

## Run app

```sh
npm run dev
```
Client URL:
    http://localhost:3333/pages/client
    
Admin URL:
    http://localhost:3333/pages/admin

## Run migrations
```sh
npm run typeorm migration:run
```

## Create migrations
```sh
npm run typeorm migration:create -- -n <migration name>
```
