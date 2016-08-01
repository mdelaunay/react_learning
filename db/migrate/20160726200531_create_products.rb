class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :category
      t.string :price
      t.boolean :stocked, :default => true
      t.string :name

      t.timestamps null: false
    end
  end
end
