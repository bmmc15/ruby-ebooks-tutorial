class RemovingPdfFromEbooks < ActiveRecord::Migration[7.2]
  def change
    remove_column :ebooks, :pdf_preview, :string
  end
end
