# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

feature1 = Feature.create(name: "Feature 1")
feature2 = Feature.create(name: "Feature 2")

Test.create(name: "Test 1", state: 0, feature: feature1)
Test.create(name: "Test 2", state: 0, feature: feature1)
Test.create(name: "Test 3", state: 0, feature: feature1)
Test.create(name: "Test 1", state: 0, feature: feature2)
Test.create(name: "Test 2", state: 0, feature: feature2)
Test.create(name: "Test 3", state: 0, feature: feature2)
