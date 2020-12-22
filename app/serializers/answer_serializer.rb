class AnswerSerializer < ActiveModel::Serializer
  attributes :id, :body, :user_id, :created_at, :updated_at
  belongs_to :question
  belongs_to :user
end