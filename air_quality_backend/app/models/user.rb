class User
  include Mongoid::Document
  field :name, type: String
  field :mail, type: String
  field :address, type: String
  field :active, type: String
end
