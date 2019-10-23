#!/usr/bin/env ruby
#
# Authenticate to a server, subscribe to a topic and publish

# $:.unshift File.dirname(__FILE__)+'/../lib'

require 'rubygems'
require 'mqtt'
require 'csv'
require 'firebase'
def insert_input(firebase,station)
  CSV.foreach('./data/madrid_2002.csv', :headers => false) do |row|
    if row.last.to_i == station
      puts 'pushing'
      response = firebase.push(
        "nodes", 
        { 
          data: "#{station},#{rand(1.0..180.0)},#{rand(1.0..180.0)},#{DateTime.now},#{row[10]},#{row[7]},#{row[6]},#{row[8]},#{row[2]}"
        }
      )
      puts response.success? # => true
      puts response.code # => 200
      
      sleep(5)  # slow it down because computers are too fast
    end
  end
end 

def emulator
  # We have to do this in a separate thread or process (or a different computer)
  firebase_url    = 'https://airquality-8892d.firebaseio.com'
  firebase_secret = 'dmOMAvMlnDu8MTTVYWjILJ9vU8NcdaoEk9P5CumK'
  firebase        = Firebase::Client.new(firebase_url, firebase_secret)
  
  thread_one = Thread.new do
    insert_input firebase, 28079001
  end   
  thread_two = Thread.new do
    insert_input firebase, 28079035
  end

  thread_one.join
  thread_two.join

end

emulator()
