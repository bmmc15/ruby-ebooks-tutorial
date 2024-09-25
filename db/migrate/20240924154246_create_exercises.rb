class CreateExercises < ActiveRecord::Migration[7.2]
  def change
    create_table :exercises do |t|
      t.string :name
      t.text :trainings
      t.text :instruction
      t.string :image

      t.timestamps
    end
  end
end
