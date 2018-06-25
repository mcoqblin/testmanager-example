class FeatureSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :tests
end
