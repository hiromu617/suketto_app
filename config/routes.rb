Rails.application.routes.draw do
  root to: 'home#index'
  
  get 'api/user/', to: "api/users#show"

  namespace :api do
    resources :users, only: [:index, :create]
  end
  
  namespace :api do
    resources :questions
  end

  get '*path', to: 'home#index'
end
