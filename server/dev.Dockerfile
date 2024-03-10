FROM golang:1.20.2-alpine3.16

WORKDIR /app  

COPY go.mod go.sum ./

RUN go mod download

# install air
RUN go get -u github.com/cosmtrek/air 
RUN go install github.com/cosmtrek/air

RUN go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

COPY . /app

CMD air