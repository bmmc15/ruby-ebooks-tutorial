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

      post "/users", to: "users#create"
      get "/me", to: "users#me"
      post "/auth/login", to: "auth#login"
    end
  end
  root "homepage#index"
end
