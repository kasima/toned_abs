Given /^I run the experiment (\d+) times?$/ do |count|
  count.to_i.times do
    step "I go to the experiment page"
    step "I click on finish"
    # binding.pry
    # clear herokuapp.com cookies
    Capybara.reset_sessions!

    # clear optimizely cookies
    driver = page.driver.browser
    driver.get 'http://log3.optimizely.com'
    driver.manage.delete_all_cookies
  end
end

When /^I go to the experiment page$/ do
  visit("http://optimized-abs.herokuapp.com/index.html")
end

When /^I click on finish$/ do
  body_class = find('body')[:class]
  if body_class == 'variation-1' && with_a_chance_of(70)
    puts "Click 1!"
    click_link('Finish')
  elsif body_class == 'variation-2' && with_a_chance_of(30)
    puts "Click 2!"
    click_link "Page 2"
    click_link "Page 3"
  elsif body_class == 'variation-3' && with_a_chance_of(50)
    puts "Click 3!"
    click_link 'Finish'
  elsif body_class == 'variation-default' && with_a_chance_of(10)
    puts "Click default!"
    click_link 'Finish'
  end
end

Then /^I should be done$/ do
end
