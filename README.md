# bamazon-app

The **bamazon application* is a Node JS app designed to manage and purchase items from a storefront.

## Current Features

1. **bamazon-app** loads the mysql database "products_db," populating a table in the terminal window.
2. The user is prompted to purchase an item by the item's ID number.
  - if the ID is invalid, the user will be prompted to select a valid ID.
3. The user is then prompted to purchase a select quantity of the item selected.
  - if the quantity is greater than the quantity in the current database, the user will be prompted to enter a valid quantity.
4. A running cost of the user's purchases is updated and displayed. The database is updated to reflect the change in quantity.
5. The user is then prompted to continue purchasing. If the user selects yes, then the program runs again. If not, the connection ends and the program is terminated.

## Video Demonstration

https://www.youtube.com/watch?v=Cb_IQ3RuT70
