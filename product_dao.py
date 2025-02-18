import mysql.connector
#con =mysql.connector.connect(host = 'localhost',user = 'root', password='siva',database = 'lasttry',auth_plugin='mysql_native_password')
con =mysql.connector.connect(host = 'localhost',user = 'root', password='siva',database = 'daily_fresh')
#print( 'MYSQL DB database connection successful')
 
 
def show_products():
    cur =con.cursor( )
    query = 'SELECT * FROM products'
    cur.execute( query)
    ViewData = cur.fetchall( )
    response1 = [ ]
    for item in ViewData:
        prod_id = item[0]
        Prod_name = item[1]
        prod_unit = item[2]
        prod_price = item[3]
        response1.append (
            {
            'prod_id'   :prod_id,
            'prod_name' :Prod_name,
            'prod_unit' :prod_unit,
            'prod_price':prod_price
            }
        )
      
    print  (  response1) 
    return response1 

def insert_new_product(newproduct) :
    cur = con.cursor() 
    query2 = " INSERT INTO products (prod_name,prod_unit,prod_price ) VALUES (%s,%s,%s ) " 
    data = (newproduct['pname'] , newproduct ['punit'],newproduct['pprice']) 
    cur.execute(query2,data) 
    con.commit( ) 
    #print( 'successfully Inserted using - insert_new_product ' ) 
    #return cur.lastrowid
    return "msg:success inserted a new Data"


def update_new_product(newproduct) :
    cur = con.cursor() 
    query4 = "UPDATE products SET prod_name=%s,prod_unit=%s,prod_price=%s  WHERE prod_id=%s"
    data4 =  (newproduct['uname'] , newproduct ['uunit'],newproduct['uprice'] ,newproduct['uid']) 
    cur.execute(query4,data4) 
    con.commit( ) 
    
    
    #print( 'successfully Updated data - Update  ' ) 
    #return cur.lastrowid
    return "msg:success Updated  new Data"


def delete_product(id):
    cur = con.cursor() 
    query3 = (" DELETE FROM products WHERE prod_id=" + str (id)) 
    cur.execute(query3) 
    con.commit( ) 
    #flash
    #print( 'successfully deleted using - delete product ' ) 
    return "msg:successfully deleted +id"

"""
update_new_product( 
    {
        "pid" : 16,
        "pname" : 'changed',
        "punit" : "box",
        "pprice" : 80
    }
) 
"""

#delete_product(3)
#show_products()

# python product_dao.py

""""

# Insert Query
insert_new_product(
        {
            "pname" : 'kiwi',
            "punit" : "box",
            "pprice" : 80
        }
    
    )


show_products()


"""
