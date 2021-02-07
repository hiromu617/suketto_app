Rails.application.routes.draw do
  root to: 'home#index'
  
  get 'api/user/', to: "api/users#show"
  get 'api/users/:id', to: "api/users#showById"
  delete 'api/deleteVideo/:id', to: "api/questions#deleteVideo"

  namespace :api do
    resources :users, only: [:index, :create, :update]
    resources :questions
    resources :answers
    resources :tags, only: [:show]
  end
  

  get '*path', to: 'home#index'
end
