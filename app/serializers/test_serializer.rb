class TestSerializer < ActiveModel::Serializer
  attributes :id, :name, :state
  belongs_to :feature
end
