class CreateTagEbooks < ActiveRecord::Migration[7.2]
  def change
    create_table :tag_ebooks do |t|
      t.references :ebook, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true

      t.timestamps
    end
    
    add_index :tag_ebooks, [:ebook_id, :tag_id], unique: true
  end
end
