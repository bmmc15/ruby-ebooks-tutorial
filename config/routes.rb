Rails.application.routes.draw do
  namespace :api do
  namespace :v1 do
  get 'exercises/index'
  post 'exercises/create'
  get '/show/:id', to: 'exercises#show'
  delete '/destroy/:id', to: 'exercises#destroy'
  end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Defines the root path route ("/")
  # root "articles#index"
  end