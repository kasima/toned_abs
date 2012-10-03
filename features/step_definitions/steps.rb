Given /^I run the experiment (\d+) times?$/ do |count|
  count.to_i.times do
    step "I go to the experiment page"
    step "I click on finish"
    Capybara.reset_sessions!
  end
end

When /^I go to the experiment page$/ do
  visit("http://optimized-abs.herokuapp.com/index.html")
end

When /^I click on finish$/ do
  if page.has_content?('Variation 1') && with_a_chance_of(70)
    puts "Click 1!"
    click_link('Finish')
  elsif page.has_content?('Variation 2') && with_a_chance_of(30)
    puts "Click 2!"
    click_link "Page 2"
    click_link "Page 3"
    click_link('Finish')
  elsif page.has_content?('Variation 3') && with_a_chance_of(50)
    puts "Click 3!"
    click_link 'Finish'
  end
end

Then /^I should be done$/ do
end
