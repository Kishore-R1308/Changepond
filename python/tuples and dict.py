continents = ("Antartica","Asia","Africa","North America","South America",
              "Australia","Europe")
print(continents[0])




#dictnaory
#dictnaory
profile = {"name":"nithi","age":40,"gender":"M","isMarried":True}

for k in profile.keys():
    print(k)
for v in profile.values():
    print(v)

for (k,v) in profile.items():
    print(k,"is",v)
 

profile["city"] = "Nagai"
print(profile)

print("get name",profile.get("name"))
profile.pop("name")
print(profile)
profile.popitem()
print("last item popped",profile)


profile.clear()
print("profile cleared",profile)
