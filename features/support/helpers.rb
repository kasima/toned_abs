module Helpers
  def with_a_chance_of(likelihood = 50)
    rand(100) < likelihood
  end
end

World(Helpers)
