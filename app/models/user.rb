class User < ApplicationRecord
  has_many :questions
  has_many :answers
  validates :name, presence: true, length: { maximum: 10 } 
  validates :profile, length: { maximum: 100 } 
  validates :email, presence: true , uniqueness: true
  mount_uploader :avatar, AvatarUploader
end
