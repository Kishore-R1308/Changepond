
#program 1:
"""Write a program which will find all such numbers which are divisible by 7 but are not a multiple of 5,
between 2000 and 3200 (both included)."""
#program 2:
"""Write a program which can compute the factorial of a given number"""
#program 3:
"""Reverse the given digit for eg:input - 14339 outpu - 93341"""
#program 4:
"""For a given string fiand out the number of vowels and number of consonant
"This is a python programming language it is highlevel""""
#program 5:
"""For a given string count each number of vowels and print it
"This is a python programming language it is highlevel"
for eg: print output as  
a : count of a in string
e : count of e in string`"""
**********************************************************************************************************************************
#program 1:
"""
for i in range(2000,3200):
    if(i%7 == 0 and i%5 != 0):
        print(i)"""
*********************************************************************************************************************************
#program2:
"""print("Factorial Program")
fact = int(input("Enter a number:"))
temp = fact
for i in range(fact-1,0,-1):
           fact*=i
print(temp ,"factorial is:", fact)"""
*********************************************************************************************************************************
#program 3
"""n = 14339
re = 0
while(n != 0):
    rem = n%10
    re = re *  10 + rem
    n = n//10
print(re)"""
*********************************************************************************************************************************
#program 4
"""word = "This is a python programming language it is highlevel"
vow = ['a','e','i','o','u']
vow_count = 0
con_count = 0
for i in range(0,len(word)):
    if word[i].lower() in vow:
        vow_count +=1
    elif word[i].lower()>='a' and word[i].lower()<='z':
        con_count+=1
print(vow_count)
print(con_count)"""
*********************************************************************************************************************************

#program 5

"""word = "This is a python programming language it is highlevel"
word = word.lower()
vowels ={'a':0,'e':0,'i':0,'o':0,'u':0}
for i in word:
    if i in vowels:
        vowels[i] +=1
    
for i in vowels:
    print(i, " : count of string = ",vowels[i])"""
*********************************************************************************************************************************




