cities = ["chennai","mumbai","chennai","pune"]
city = "pune"
cities.append(city)
print(cities)
city = "bengalore"
cities.insert(1,city)
for c in cities:
    print (c)
print("-"*60)
cities.sort()
for c in cities:
    print (c)
cities.pop()
print(cities)
cities.remove("pune")
cities.count("chennai")
print(cities.count("chennai"))
cities.clear()
print(cities)
