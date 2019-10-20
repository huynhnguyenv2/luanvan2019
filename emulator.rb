#!/usr/bin/env ruby
#
# Authenticate to a server, subscribe to a topic and publish

# $:.unshift File.dirname(__FILE__)+'/../lib'

require 'rubygems'
require 'mqtt'
require 'csv'

def insert_input(client, station)
  CSV.foreach('./data/madrid_2002.csv', :headers => false) do |row|
    if row.last.to_i == station
      puts 'pushing'
      client.publish(
        'node', 
        "#{station},#{rand(1.0..180.0).round(2)},#{rand(1.0..180.0).round(2)},#{DateTime.now()},#{row[10]},#{row[7]},#{row[6]},#{row[8]},#{row[2]}"
        )
      sleep(5)  # slow it down because computers are too fast
    end
  end
end 

MQTT::Client.connect(
  :host => 'm11.cloudmqtt.com',
  :username => 'ikkwucnu',
  :password => 'UN9O6syezakc',
  :port => 16524
) do |client|
  puts 'connected'

  # We have to do this in a separate thread or process (or a different computer)
  thread_one = Thread.new do
    insert_input client, 28079001
  end   
  thread_two = Thread.new do
    insert_input client, 28079035
  end

  thread_one.join
  thread_two.join

end


