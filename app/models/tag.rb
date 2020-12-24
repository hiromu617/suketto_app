class Tag < ApplicationRecord
  has_many :tags, through: :question_tags
  has_many :question_tags, dependent: :destroy

end
