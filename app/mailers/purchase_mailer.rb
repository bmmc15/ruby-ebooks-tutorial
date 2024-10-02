class PurchaseMailer < ApplicationMailer
    default from: "rails_testing_emails@example.com"

    def purchase_email
       @user = params[:user]
       mail(to: @user.email, subject: "Ebooks.buy Order details")
    end
end
