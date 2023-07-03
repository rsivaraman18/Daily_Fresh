from flask import Flask ,request ,jsonify,render_template,url_for
print("I am ready1" )
import product_dao
import order_dao
print("I am ready2" )
app = Flask ( __name__) 

@app.route("/" )
def indexpage( ) :
    return render_template("Index.html") 

@app.route("/mgproduct" )
def manageproduct( ) :
    return render_template("Manage_product.html")


@app.route("/orderproduct")
def orderpage( ) :
    return render_template( "Order_product.html")


@app.route("/vieworders")
def vieworders( ) :
    return render_template( "View_orders.html")


@app.route("/vieworderdetails")
def view_order_details( ) :
    return render_template( "View_ordersdetails.html")


@app.route("/contact")
def contact_page( ) :
    return render_template( "View_us1.html")

@app.route("/feedback")
def feedback_page( ) :
    return render_template( "View_us2.html")



@app.route('/allproducts',methods=['GET'])
def get_myproducts():
    myproducts = product_dao.show_products()
    response2 =jsonify(myproducts)
    response2.headers.add('Access-Control-Allow_orgin','*')
    return response2


@app.route('/getallorders',methods=['GET'])
def get_all_myorders():
    myorders = order_dao.get_all_orders()
    response =jsonify(myorders )
    response.headers.add('Access-Control-Allow_orgin','*')
    return response


@app.route('/getorderdetails/<int:id>',methods=['GET'])
def get_part_orderdetails(id):
    myorddetail = order_dao.get_order_details(id)
    response =jsonify(myorddetail )
    response.headers.add('Access-Control-Allow_orgin','*')
    return response


@app.route('/delete/<int:id>' ,methods = ['POST'])
def del_myproducts(id):
    ret_msg = product_dao.delete_product(id)
    response3 = jsonify(ret_msg)
    response3.headers.add('Access-Control-Allow_orgin','*')
    return response3


@app.route('/insert' , methods=['POST'])
def insert_myproducts():
    #new = request.form['pname']  # to get data in form
    new = request.get_json( )  # toget data's in json format
    ret_msg = product_dao.insert_new_product(new)
    response4 = jsonify(ret_msg)
    response4.headers.add('Access-Control-Allow_orgin','*')
    return response4


@app.route('/insertOrder' , methods=['POST'])
def insert_orders():
    new = request.get_json( )  # toget data's in json format
    ret_msg = order_dao.insert_order(new)
    response5 = jsonify(ret_msg)
    response5.headers.add('Access-Control-Allow_orgin','*')
    return response5


@app.route('/update', methods=['PUT'])
def update_myproducts():
    #new = request.form['pname']  # to get data in form
    new = request.get_json( )  # toget data's in json format
    ret_msg = product_dao.update_new_product(new)
    response4 = jsonify(ret_msg)
    response4.headers.add('Access-Control-Allow_orgin','*')
    return response4



