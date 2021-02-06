class AddVideoToQuestions < ActiveRecord::Migration[6.0]
  def change
    add_column :questions, :video, :string
  end
end
