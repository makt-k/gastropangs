Gastropangs::Application.routes.draw do
  devise_for :users
  root :to => "home#index"

  resources :users, :only => :show do
    resources :meals, :only => [:index, :create, :show, :update]
  end

  get'/users/:user_id/recent' => 'meals#recent_meals'
  get'/users/:user_id/over' => 'meals#meals_overate'
  get'/users/:user_id/dow' => 'meals#meals_by_dow'
  get'/users/:user_id/today' => 'meals#meals_today'

end
