Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :ebooks do
        member do
          get "show_pdf"
        end
      end
      resources :users, except: [ :new ]
      post "purchase", to: "purchase#create"
      get "purchases", to: "purchase#index"

      post "/users", to: "users#create"
      get "/me", to: "users#me"
      post "/auth/login", to: "auth#login"
    end
  end
  root "homepage#index"

  get "*path", to: "homepage#index", constraints: ->(req) { req.format.html? && !req.path.start_with?("/images", "/rails/active_storage") }

  # get "signup", to: "users#new"

  # signup routes
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Defines the root path route ("/")
  # root "articles#index"
end
