package user

import (
	"context"

	"github.com/m0t0k1ch1/metamask-login-sample/application"
)

type Application interface {
	GetUser(ctx context.Context, in *GetUserInput) (*GetUserOutput, error)
}

type applicationImpl struct {
	*application.Core
}

func NewApplication(core *application.Core) Application {
	return &applicationImpl{core}
}

func (app *applicationImpl) GetUser(ctx context.Context, in *GetUserInput) (*GetUserOutput, error) {
	if err := in.Validate(); err != nil {
		return nil, err
	}

	address := in.Address()

	u, err := app.Repositories.User.Get(ctx, address)
	if err != nil {
		return nil, err
	}

	return NewGetUserOutput(u), nil
}
