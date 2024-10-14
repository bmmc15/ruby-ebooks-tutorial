class AddLastPasswordUpdateToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :last_password_update, :datetime
  end
end
