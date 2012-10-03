require 'capybara'
require 'capybara/cucumber'
require 'show_me_the_cookies'
require 'active_support/core_ext'

require 'test/unit'
require 'pry'
include Test::Unit::Assertions
World(ShowMeTheCookies)