Rails.application.routes.draw do
  root to: 'home#index'
  
  get 'api/user/', to: "api/users#show"

  namespace :api do
    resources :users, only: [:index, :create]
    resources :questions
    resources :answers
  end
  

  get '*path', to: 'home#index'
end
