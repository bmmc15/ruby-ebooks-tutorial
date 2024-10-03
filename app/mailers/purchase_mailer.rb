class PurchaseMailer < ApplicationMailer
    default from: "rails_testing_emails@example.com"

    def purchase_email
       @user = params[:user]
       mail(to: @user.email, subject: "Ebooks.buy Order details")
    end

    def notify_author_of_sale_fee
        @seller = params[:seller]
        @fee_details = params[:fee_details]
        @total_fee = params[:total_fee]

        mail(to: @seller.email, subject: "Your ebooks were bought!")
    end
end
