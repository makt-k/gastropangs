Gastropangs::Application.routes.draw do
  devise_for :users
  root :to => "home#index"

  resources :users, :only => :show do
    resources :meals, :only => [:index, :create, :show]
  end

  get'/users/:user_id/over' => "meals#overate"
  get'/users/:user_id/dow' => "meals#meals_by_dow"

end
