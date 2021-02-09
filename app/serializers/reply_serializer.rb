class ReplySerializer < ActiveModel::Serializer
  attributes :id, :body, :user_id, :answer_id, :created_at
  belongs_to :user
  belongs_to :answer
end
