class Ebook < ApplicationRecord
    before_save { self.status = status.downcase }

    validates :title, presence: true
    validates :description, presence: true
    validates :price, presence: true,
                        numericality: { greater_than: 0 }
    validates :seller_fee, presence: true,
                        numericality: { greater_than: 0 }

    enum status: { draft: 0, pending: 1, live: 2 }
    validates :status, presence: true, inclusion: { in: statuses.keys, message: "%{value} is not a valid status" }
    belongs_to :seller, class_name: "User", foreign_key: "seller_id"
    has_many :purchases, foreign_key: :ebook_id
end
