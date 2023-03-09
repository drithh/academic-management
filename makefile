include .env

createdb:
	docker compose exec -it postgres createdb --username=postgres --owner=postgres ${POSTGRES_DB}

dropdb:
	docker compose exec -it postgres dropdb ${POSTGRES_DB}

createmigration:
	migrate create -ext sql -dir server/database/migrations -seq $(filter-out $@,$(MAKECMDGOALS))

migrateup:
	migrate -path server/database/migrations -database "${DATABASE_URL}" -verbose up

migratedown:
	migrate -path server/database/migrations -database "${DATABASE_URL}" -verbose down
