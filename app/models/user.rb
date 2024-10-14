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

    has_one_attached :avatar
    def avatar_url
        avatar.attached? ? Rails.application.routes.url_helpers.url_for(avatar) : nil
    end

    def password_expired? # ? is the convention to a method that returns boolean
        return true unless last_password_update

        last_password_update < 6.months.ago
    end

    def update_password(new_password)
        self.password = new_password
        self.last_password_update = Time.current
        save
    end
end
