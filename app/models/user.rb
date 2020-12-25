class User < ApplicationRecord
  has_many :questions
  has_many :answers
  validates :name, presence: true, length: { maximum: 10 } 
end
