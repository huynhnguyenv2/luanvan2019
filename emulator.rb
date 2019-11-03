#!/usr/bin/env ruby
#
# Authenticate to a server, subscribe to a topic and publish

# $:.unshift File.dirname(__FILE__)+'/../lib'

require 'rubygems'
require 'mqtt'
require 'csv'
require 'firebase'
def insert_input(client, station)
  CSV.foreach('./data/madrid_2002.csv', :headers => false) do |row|
    if row.last.to_i == station
      data = "station:#{station},date_time:#{row[0]},So2:#{row[10]},O2:#{row[8]},No2:#{row[6]},Co:#{row[2]}"
      client.publish('nodes', data)

      sleep(5) 
    end
  end
end 

def emulator
  MQTT::Client.connect(
    :host => 'm11.cloudmqtt.com',
    :port => 16524,
    :username => "ikkwucnu",
    :password => "UN9O6syezakc"
  ) do |client|
    thread_one = Thread.new do
      insert_input client, 28079001
    end   

    thread_two = Thread.new do
      insert_input client, 28079035
    end

    thread_one.join
    thread_two.join
  
  end
end

emulator()
