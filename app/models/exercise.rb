class Exercise < ApplicationRecord
  validates :name, presence: true
  validates :trainings, presence: true
  validates :instruction, presence: true
end
