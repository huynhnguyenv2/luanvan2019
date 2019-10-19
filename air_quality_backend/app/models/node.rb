class Node
  include Mongoid::Document
  field :station, type: String
  field :lat, type: String
  field :long, type: String
  field :datetime, type: String
  field :so2, type: String
  field :co, type: String
  field :no2, type: String
  field :pm10, type: String
  field :co, type: String
end
