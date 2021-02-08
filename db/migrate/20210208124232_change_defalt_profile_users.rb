class ChangeDefaltProfileUsers < ActiveRecord::Migration[6.0]
  def change
    change_column_default :users, :profile, from: nil, to: "まだ設定されていません"
  end
end
