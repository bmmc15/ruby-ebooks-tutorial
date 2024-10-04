Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :ebooks do
        member do
          get "show_pdf"
        end
      end

      get "exercises/index"
      post "exercises/create"
      get "/show/:id", to: "exercises#show"
      delete "/destroy/:id", to: "exercises#destroy"
      resources :users, except: [ :new ]
      get "login", to: "sessions#new"
      post "login", to: "sessions#create"
      delete "logout", to: "sessions#destroy"
      post "purchase", to: "purchase#create"
    end
  end
  root "homepage#index"
  get "signup", to: "users#new"

    # get "/*path" => "homepage#index"



    # signup routes
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
    # Defines the root path route ("/")
    # root "articles#index"
  end
