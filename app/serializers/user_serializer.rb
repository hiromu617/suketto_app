class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :created_at, :updated_at
  has_many :questions
  has_many :answers
end
