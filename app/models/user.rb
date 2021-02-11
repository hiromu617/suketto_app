class User < ApplicationRecord
  has_many :questions, dependent: :destroy
  has_many :answers, dependent: :destroy
  has_many :replies, dependent: :destroy
  validates :name, presence: true, length: { maximum: 10 } 
  validates :profile, length: { maximum: 100 } 
  validates :email, presence: true , uniqueness: true
  mount_uploader :avatar, AvatarUploader
end
