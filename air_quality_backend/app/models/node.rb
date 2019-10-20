class Node
  include Mongoid::Document
  field :station, type: String
  field :lat, type: Float
  field :long, type: Float
  field :datetime, type: Date
  field :so2, type: Float
  field :o2, type: Float
  field :no2, type: Float
  field :pm10, type: Float
  field :co, type: Float
end
