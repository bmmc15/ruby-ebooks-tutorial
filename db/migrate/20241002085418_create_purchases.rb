class CreatePurchases < ActiveRecord::Migration[7.2]
  def change
    create_table :purchases do |t|
      t.references :buyer, null: false, foreign_key: { to_table: :users }
      t.references :ebook, null: false, foreign_key: true

      t.timestamps
    end
  end
end
