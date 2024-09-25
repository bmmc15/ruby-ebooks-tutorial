Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'exercises/index'
      post 'exercises/create'
      get '/show/:id', to: 'exercises#show'
      delete '/destroy/:id', to: 'exercises#destroy'
      resources :users, except: [:new]



    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  get 'signup', to: 'users#new'  

  # signup routes
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Defines the root path route ("/")
  # root "articles#index"
  end