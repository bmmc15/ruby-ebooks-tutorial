
class UserMailer < ApplicationMailer
    default from: "welcome@ebooks-buy.com"

    def welcome_email
       @user = params[:user]
       mail(to: @user.email, subject: "Welcome to Ebooks.buy")
    end
end
