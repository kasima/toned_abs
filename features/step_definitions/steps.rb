Given /^I run the experiment (\d+) times?$/ do |count|
  count.to_i.times do
    step "I go to the experiment page"
    step "I click on finish"
    Capybara.reset_sessions!
  end
end

When /^I go to the experiment page$/ do
  visit("http://toned-abs.herokuapp.com/index.html")
end

When /^I click on finish$/ do
  if page.has_selector?('a.finish')
    puts "Click!"
    click_link('Finish')
  end
end

Then /^I should be done$/ do
end
