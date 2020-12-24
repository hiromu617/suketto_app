class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :user_id,:best_answer_id, :created_at, :updated_at
  belongs_to :user
  has_many :answers
  has_many :tags
end
