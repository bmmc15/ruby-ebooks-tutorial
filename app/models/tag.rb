class Tag < ApplicationRecord
  has_many :tag_ebooks
  has_many :ebooks, through: :tag_ebooks
  validates :name, presence: true, uniqueness: true
end
