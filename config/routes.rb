Rails.application.routes.draw do
  resources :features
  resources :tests
  mount_ember_app :frontend, to: "/"
end
