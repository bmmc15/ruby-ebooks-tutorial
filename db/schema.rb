# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2024_10_02_085418) do
  create_table "ebooks", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.float "price"
    t.float "seller_fee"
    t.integer "seller_id"
    t.string "pdf_preview"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "status", null: false
    t.index ["seller_id"], name: "index_ebooks_on_seller_id"
  end

  create_table "exercises", force: :cascade do |t|
    t.string "name"
    t.text "trainings"
    t.text "instruction"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "purchases", force: :cascade do |t|
    t.integer "buyer_id", null: false
    t.integer "ebook_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["buyer_id"], name: "index_purchases_on_buyer_id"
    t.index ["ebook_id"], name: "index_purchases_on_ebook_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
  end

  add_foreign_key "ebooks", "users", column: "seller_id"
  add_foreign_key "purchases", "ebooks"
  add_foreign_key "purchases", "users", column: "buyer_id"
end
