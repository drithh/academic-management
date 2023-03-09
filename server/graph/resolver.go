package graph

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

import (
	"github.com/drithh/multi-tier-architecture/database"
)


type Resolver struct{
	Repository *database.Repository
}
