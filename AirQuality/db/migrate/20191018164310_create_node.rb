class CreateNode < ActiveRecord::Migration[6.0]
  def change
    create_table :nodes do |t|
      t.string :station
      t.float :lat
      t.float :long
      t.float :no2
      t.float :pm10
      t.float :so2
      t.float :co
      t.float :o2
      t.datetime :date
    end
  end
end
