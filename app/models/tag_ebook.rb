class TagEbook < ApplicationRecord
  belongs_to :ebook
  belongs_to :tag
end
