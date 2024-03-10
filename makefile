include .env

EXEC=docker compose exec server

create-db:
	docker compose exec -it postgres createdb --username=postgres --owner=postgres ${POSTGRES_DB}

drop-db:
	docker compose exec -it postgres dropdb ${POSTGRES_DB}

create-migration:
	${EXEC} migrate create -ext sql -dir server/database/migrations -seq $(filter-out $@,$(MAKECMDGOALS))

migrate-up:
	${EXEC} migrate -path database/migrations -database "${DATABASE_URL}" -verbose up

migrate-down:
	${EXEC} migrate -path server/database/migrations -database "${DATABASE_URL}" -verbose down

seed:
	${EXEC} go run main.go seed