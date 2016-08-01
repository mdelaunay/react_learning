json.extract! product, :id, :category, :price, :stocked, :name, :created_at, :updated_at
json.url product_url(product, format: :json)