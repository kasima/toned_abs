#!/usr/bin/env rackup
#\ -E deployment

use Rack::ContentLength

app = Rack::Directory.new File.join(Dir.pwd, 'app')
run app