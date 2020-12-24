class TagsSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :questions
end
