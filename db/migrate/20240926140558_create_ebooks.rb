class CreateEbooks < ActiveRecord::Migration[7.2]
  def change
    create_table :ebooks do |t|
      t.string :title
      t.string :description
      t.float :price
      t.float :seller_fee
      t.string :status
      t.integer :seller_id
      t.string :pdf_preview

      t.timestamps
    end
  end
end
