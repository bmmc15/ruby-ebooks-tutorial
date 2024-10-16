class EbookSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :price, :ebook_cover_url, :pdf_url
  has_many :tags, serializer: TagSerializer
end