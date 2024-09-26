class AddFkToUsersOnEbookTable < ActiveRecord::Migration[7.2]
  def change
    add_foreign_key :ebooks, :users, column: :seller_id
    add_index :ebooks, :seller_id
  end
end
