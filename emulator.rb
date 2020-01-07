#!/usr/bin/env ruby
#
# Authenticate to a server, subscribe to a topic and publish

# $:.unshift File.dirname(__FILE__)+'/../lib'

require 'rubygems'
require 'mqtt'
require 'csv'
$start = 0 
def insert_input(client, station)
  CSV.foreach('./data/madrid_2003.csv', :headers => false).with_index do |row,i |  
    if (row.last.to_i == station)
      data = "{\"station_code\":#{station},"
      data += "\"date_time\":\"#{row[0]}\","
      data += "\"so2\":#{row[12] || -1},"
      data += "\"o2\":#{row[8] || -1},"
      data += "\"no2\":#{row[6]  || -1},"
      data += "\"co\":#{row[2] || -1},"
      data += "\"pm10\":#{row[10] || -1}}"
      client.publish('nodes', data) 
      sleep(1) 
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
      insert_input client, 28079016
    end   

    thread_two = Thread.new do
      insert_input client, 28079008
    end

    thread_three = Thread.new do
      insert_input client, 28079004
    end

    thread_four = Thread.new do
      insert_input client, 28079011
    end

    thread_five = Thread.new do
      insert_input client, 28079017
    end

    thread_one.join
    thread_two.join
    thread_three.join
    thread_four.join
    thread_five.join
  
  end
end

emulator()
