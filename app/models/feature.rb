class Feature < ApplicationRecord
    has_many :tests, dependent: :delete_all
end
