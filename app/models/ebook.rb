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
    has_many :tag_ebooks
    has_many :tags, through: :tag_ebooks

    has_one_attached :pdf
    def pdf_url
        pdf.attached? ? Rails.application.routes.url_helpers.url_for(pdf) : nil
    end

    has_one_attached :ebook_cover
    def ebook_cover_url
        ebook_cover.attached? ? Rails.application.routes.url_helpers.url_for(ebook_cover) : nil
    end

end
