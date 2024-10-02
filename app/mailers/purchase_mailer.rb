class PurchaseMailer < ApplicationMailer
    default from: "rails_testing_emails@example.com"

    def purchase_email
       @user = params[:user]
       mail(to: @user.email, subject: "Ebooks.buy Order details")
    end

    def notify_author_of_sale_fee

        @user = params[:user]
        # get last order timestamp from this buyer
        last_purchase_minute = Purchase
                        .where(buyer_id: @user.id)
                        .order(created_at: :desc)
                        .limit(1)
                        .pluck(:created_at)
                        .first
                        .beginning_of_minute

        # get ebooks from that buyer's order
        ebooks_ids_from_last_order = Purchase
            .where(buyer_id: @user.id)
            .where(created_at: last_purchase_minute..last_purchase_minute.end_of_minute)
            .pluck(:ebook_id)

        # loads all ebooks from the order to memory
        ebooks = Ebook.where(id: ebooks_ids_from_last_order)

        ebook_by_seller = calculate_seller_fees(ebooks)

        puts "ebook_by_seller #{ebook_by_seller}"

        sellers = User.where(id: ebook_by_seller.keys)

        ebook_by_seller.each do |seller_id, value| 
            @seller = sellers.find_by(id: seller_id)
            puts "seller #{@seller}"
            
            @fee_details = value[:details]
            puts "fee_details #{@fee_details}"

            @total_fee = value[:total_fee]
            puts "total_fee #{@total_fee}"

            mail(to: @seller.email, subject: "Your ebooks were bought!")
        end
    end

    private
    def calculate_seller_fees(ebooks)
        ebook_by_seller = {}
        ebooks.each do |ebook|
            ebook_by_seller[ebook.seller_id] ||= { total_fee: 0, details: [] }
          
            ebook_by_seller[ebook.seller_id][:total_fee] += (ebook.price * ebook.seller_fee).round(2)
          
            ebook_by_seller[ebook.seller_id][:details] << "#{ebook.title}(#{ebook.id}) fee:  #{ebook.price}$ x #{ebook.seller_fee * 100}% = #{(ebook.price * ebook.seller_fee).round(2)}$"
        end
        ebook_by_seller
    end
end
