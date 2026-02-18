#set
temp_mo = {99.6,101.5,99.6,100,101,99.6,100}
temp_tu = {99.6,101.5,99.6,100,101,99.5,100}
print (temp_mo.union(temp_tu))
print (temp_mo.intersection(temp_tu))
print (temp_mo - temp_tu)
print (temp_tu - temp_mo)
temp_mo.add(95)
print (temp_mo)
