class Comment < ActiveRecord::Base
  validates :author, :presence => true
end
