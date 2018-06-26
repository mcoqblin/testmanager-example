Rails.application.routes.draw do
  namespace :api do
    resources :features
    resources :tests
  end

  mount_ember_app :frontend, to: "/"
end
