class Answer < ApplicationRecord
  belongs_to :user
  belongs_to :question
  has_many :replies
  validates :body, presence: true, length: { maximum: 100 } 
end
