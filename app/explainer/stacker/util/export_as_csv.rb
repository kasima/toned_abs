require "rubygems"
require "bundler/setup"
require "google_drive"
require 'yaml'

begin
  config = YAML.load_file("stacker_config.yaml")
  spreadsheet_key = config["config"]["spreadsheet_key"]
  worksheet_index = config["config"]["worksheet_index"]
  if !spreadsheet_key
    puts "No spreadsheet_key detected in stacker_config.yaml - it should look like:"
    puts "\nconfig:\n  spreadsheet_key: 0AvXsgHX7wggadEU5TkNXRUFPQUtPYWVlck1tOGI3Ymc\n\n"
    exit
  end
  puts "Loading spreadsheet with key: #{spreadsheet_key}"
rescue Errno::ENOENT
  puts 'No stacker_config.yaml file detected, see sample file in stacker/util'
  exit
end



# console will prompt for google username and password
puts "Note: If you get login prompt use your google username and password"
session = GoogleDrive.saved_session
doc = session.spreadsheet_by_key(spreadsheet_key)
puts "Exporting Google Spreadsheet: #{doc.title}"
doc.export_as_file("app/data.csv", "csv", worksheet_index)
puts "Spreadsheet exported to data.csv"
