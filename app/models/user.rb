class User < ApplicationRecord
    before_save { self.email = email.downcase }
    validates :username, presence: true,
                         uniqueness: { case_sensitive: false },
                         length: { minimum: 3, maximium: 25 }
    VALID_EMAIL_REGEX =/\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence: true,
                         uniqueness: { case_sensitive: false },
                         length: { minimum: 3, maximium: 25 },
                         format: { with: VALID_EMAIL_REGEX }
    has_secure_password
    has_many :ebooks, foreign_key: :seller_id
    has_many :purchases, foreign_key: :buyer_id
end
