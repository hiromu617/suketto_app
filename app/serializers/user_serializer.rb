class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :avatar, :profile, :created_at, :updated_at
  has_many :questions
  has_many :answers
  has_many :replies
end
