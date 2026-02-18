"""CREATE A SHOPPPING CART

Items: Bread butter jam toast cheese
prices: 45,87,32,56,90,12

when i start the program user should be able to see the menu with items and
price below that he should be allowed to enter his choice asking
with below menu

1. add item to cart
2. update
3. delete
4. view
5. exit and print bill

if 1:
ask user the name of item
ask user the quantity
after quantity entered teh items shud be added to cart

if 2:
ask user to name of item to update
check if the item is the cart, if yes ask for quantity to update
if cart doesn't have item, show him message item is not present in the cart
go to add item choice

if 3:
 ask user to name of item to delete
 check is it in the cart? if yes delete item from cart
 if not, show message , no item

if 4:
display the cart with all items in the cart as below
name of item, qty, item price, total price(itemprice* qty)

if 5L
exit program and display the bill
name of item, qty, item price, total price(itemprice* qty)
"""

items = {
    "bread": 45,
    "butter": 87,
    "jam": 32,
    "toast": 56,
    "cheese": 90,
    "eggs": 12
}

cart = {}

while True:

    print("\nITEMS AVAILABLE")


    print(items)

    print("\nOptions")
    print("1. Add item")
    print("2. Update item")
    print("3. Delete item")
    print("4. View cart")
    print("5. Exit and print bill")

    choice = input("Enter your choice: ")

    match choice:

        case "1":
            item = input("Enter item name: ").lower()
            if item in items:
                qty = int(input("Enter quantity: "))
                if item in cart:
                    cart[item] = cart[item] + qty
                else:
                    cart[item] = qty
                print("Item added to cart")
            else:
                print("Item not available")

        case "2":
            item = input("Enter item name to update: ").lower()
            if item in cart:
                qty = int(input("Enter new quantity: "))
                cart[item] = qty
                print("Item updated")
            else:
                print("Item not in cart, please add it")

        case "3":
            item = input("Enter item name to delete: ").lower()
            if item in cart:
                del cart[item]
                print("Item deleted")
            else:
                print("No such item in cart")

        case "4":
            if cart == {}:
                print("Cart is empty")
            else:
                print("\nItem  Qty  Price  Total")
                for item in cart:
                    price = items[item]
                    qty = cart[item]
                    total = price * qty
                    print(item," ",qty," ",price," ",total)

        case "5":
            print("\nFINAL BILL")
            total_amount = 0
            print("Item  Qty  Price  Total")
            for item in cart:
                price = items[item]
                qty = cart[item]
                total = price * qty
                total_amount = total_amount + total
                print(item," ",qty," ",price," ",total)

            print("Total Amount =", total_amount)
            print("Thank you for shopping")
            break

        case _:
            print("Invalid choice")

                
        
                        
        
            
        
        
   
        

    
 

    






















