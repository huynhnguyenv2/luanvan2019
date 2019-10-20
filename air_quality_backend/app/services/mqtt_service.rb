require 'mqtt'

class MqttService
  def run
    MQTT::Client.connect(
      :host => 'm11.cloudmqtt.com',
      :username => 'ikkwucnu',
      :password => 'UN9O6syezakc',
      :port => 16524
    ) do |client|
      client.get('test/#') do |topic,message|
        puts "#{topic}: #{message}"
      end
    end
  end
end

