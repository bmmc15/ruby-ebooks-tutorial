class ChangeEbookStatusType < ActiveRecord::Migration[7.2]
  def change
    remove_column :ebooks, :status, :string

    add_column :ebooks, :status, :integer, null: false
  end
end
