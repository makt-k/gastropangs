require 'simplecov'
require 'capybara/poltergeist'
require 'capybara/rspec'

SimpleCov.start 'rails'
Capybara.javascript_driver = :poltergeist

Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, js_errors: false)
end


ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'rspec/autorun'

Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

ActiveRecord::Migration.check_pending! if defined?(ActiveRecord::Migration)

FactoryGirl.lint

RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
  config.use_transactional_fixtures = false
  config.infer_base_class_for_anonymous_controllers = false

  config.order = 'random'
  config.treat_symbols_as_metadata_keys_with_true_values = true
end
