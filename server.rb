require "sinatra"
require "json"

class ThermostatAPI < Sinatra::Base
  set :public_folder, proc { File.join(root) }

  @@temperature = 20
  @@powersaving = "true"
  @@city = "London"

  get '/time' do
    response = {
      time: Time.now.to_s,
      city: "London"
    }
    response.to_json
  end

  get '/data' do
    response = {
      temp: @@temperature,
      psmode: @@powersaving,
      city: @@city
    }
    response.to_json
  end

  post '/temperature' do
    p params
    @@temperature = params[:temp]
    "OK"
  end

  post '/powersaving' do
    p params
    @@powersaving = params[:psmode]
    "OK"
  end

  post '/city' do
    p params
    @@city = params[:city]
    "OK"
  end

  run! if app_file == $0
end
