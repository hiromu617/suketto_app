class Question < ApplicationRecord
  mount_uploader :video, VideoUploader
  belongs_to :user
  has_many :answers, dependent: :destroy
  has_many :question_tags, dependent: :destroy
  has_many :tags, through: :question_tags,dependent: :destroy
  validates :title, presence: true, length: { maximum: 20 } 
  validates :body, presence: true, length: { maximum: 200 } 
  scope :from_tag, -> (tag_id)  { where(id: tag_ids = QuestionTag.where(tag_id: tag_id).select(:question_id))}
  

  def save_tags(tags)
    current_tags = self.tags.pluck(:name) unless self.tags.nil?
    old_tags = current_tags - tags
    new_tags = tags - current_tags

    # Destroy old taggings:
    old_tags.each do |old_name|
      self.tags.delete Tag.find_by(name: old_name)
    end

    # Create new taggings:
    new_tags.each do |new_name|
      question_tag = Tag.find_or_create_by(name: new_name)
      self.tags << question_tag
    end
  end
end
