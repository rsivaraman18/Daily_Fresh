from datetime import datetime
import mysql.connector
con = mysql.connector.connect(host ="rsivaraman1.mysql.pythonanywhere-services.com" , user ="rsivaraman1" , password="sivasiva" , database = "rsivaraman1$daily_fresh" )

#con =mysql.connector.connect(host = 'localhost',user = 'root', password='siva',database = 'daily_fresh')
print('MYSQL DB database connection successful for ORDER page')
 
def insert_order(neworder):
    cur = con.cursor()
    ord_query1 = " INSERT INTO orders (customer_name,grand_total,order_time) VALUES (%s,%s,%s ) "
    ord_data = (neworder['cname'] ,neworder ['gtotal'], datetime.now() )
    cur.execute(ord_query1,ord_data)
    order_id = cur.lastrowid
    con.commit( )
    #print("msg:success inserted a new Data",order_id )


    order_items = [ ]

    for item in neworder['order_details']:
        order_items.append([
            order_id,
            int(item['product_id']) ,
            str(item['product_name']) ,
            str(item['product_unit']) ,
            float(item['quantity'])   ,
            float(item['total'])      ,
        ] )


    orderdetail_query = " INSERT INTO order_details (order_id,product_id,product_name,product_unit,quantity,total) VALUES (%s,%s,%s,%s,%s,%s) "

    cur.executemany(orderdetail_query,order_items)
    con.commit( )
    #print("msg:success inserted items to order_details table",order_id )
    msg = "successfully added",order_id
    return msg

def get_all_orders( ):
    cur = con.cursor()
    ord_query2 = " SELECT * FROM orders"
    cur.execute(ord_query2)
    myorderdata = cur.fetchall( )

    response1 = [ ]
    for (oid,cname,gtot,otime ) in myorderdata:
        response1.append(
                        {
                        "order_id"      : oid,
                        "customer_name" : cname ,
                        "grand_total"   : gtot ,
                        "order_time"     : otime
                        }
        )
    #print(response1 )
    return response1



def get_order_details(id):
    cur = con.cursor()
    query3 = ("  SELECT * FROM order_details WHERE order_id=" + str (id))
    #query3 = "SELECT * FROM order_details WHERE  order_id = 1016"
    cur.execute(query3)
    myorderdata = cur.fetchall( )
    #print("myorder is",myorderdata )
    response = [ ]
    for (oid , pid ,pname,punit, qnt , tot ) in myorderdata:
        response.append(
                        {
                        "order_id"      : oid,
                        "Product_id"    : pid ,
                        "Product_name"  : pname ,
                        "Product_unit"  : punit ,
                        "Quantity"      : qnt ,
                        "Total"         : tot
                        }
        )
    #print("response is",response )
    return response



#get_order_details(1016)











'''


# insert order in this format
insert_order(
    {
        "cname"         : "Sivaraman",
        "gtotal"        : 690,
        "order_details" : [
                            {
                                "product_id"    : 1 ,
                                "product_name"  : "apple",
                                "product_unit"  : "kg" ,
                                "quantity"      : 2 ,
                                "total"         : 240
                            },

                            {
                                "product_id"    : 2 ,
                                "product_name"  : "Mango",
                                "product_unit"  : "kg",
                                "quantity"      : 3 ,
                                "total"         : 450
                            }

                          ]
    }
)
'''
