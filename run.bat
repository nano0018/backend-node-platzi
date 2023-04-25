docker compose --env-file ./.env  up
docker compose --env-file ./.env up -d pgadmin
docker compose --env-file ./.env up -d postgres
docker compose --env-file ./.env up -d mysql
docker compose --env-file ./.env up -d phpmyadmin
npm run dev
