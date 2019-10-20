#!/usr/bin/env ruby
#
# Authenticate to a server, subscribe to a topic and publish

$:.unshift File.dirname(__FILE__)+'/../lib'

require 'rubygems'
require 'mqtt'

MQTT::Client.connect(
  :host => 'm11.cloudmqtt.com',
  :username => 'ikkwucnu',
  :password => 'UN9O6syezakc',
  :port => 16524
) do |client|
  puts 'connected'

  # We have to do this in a separate thread or process (or a different computer)
  t1 = Thread.new do
    20.times do # We could do it forever, but 20 times is good enough
      puts 'write'
      sleep(0.5)  # slow it down because computers are too fast
      client.publish('test/authentication', "Current user: LLskdf, The time is now #{Time.now}")
    end
  end   
  t2 = Thread.new do
    20.times do # We could do it forever, but 20 times is good enough
      puts 'write'
      sleep(0.5)  # slow it down because computers are too fast
      client.publish('test/authentication', "Current user: Jpamg, The time is now #{Time.now}")
    end
    # when a block is passed to #get, it loops infinitely so this has to be the last line of our program
   
  end

  t1.join
  t2.join

  

end


