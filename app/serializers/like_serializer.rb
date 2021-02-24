class LikeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :answer_id
  belongs_to :user
  belongs_to :answer
end