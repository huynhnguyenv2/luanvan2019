require 'mqtt'

class MqttService
  def run
    MQTT::Client.connect(
      :host => 'm11.cloudmqtt.com',
      :username => 'ikkwucnu',
      :password => 'UN9O6syezakc',
      :port => 16524
    ) do |client|
      client.get('node') do |topic,message|
        value= message.split(',')
        data = Node.new({station: value[0],
          lat: value[1].to_f,
          long: value[2].to_f,
          datetime: Date.parse(value[3]),
          so2: value[4].to_f,
          o2: value[5].to_f,
          no2: value[6].to_f,
          pm10: value[7].to_f,
          co: value[8].to_f
        })
        if data.save
          puts "success"
        else
          puts 'fails'
        end
      end
    end
  end
end

