//alert( "Order Js File edit ")

//let Itemlisturl = "https://fakestoreapi.com/products"
let Itemlisturl = "http://127.0.0.1:5000/allproducts"

let allitems =[ ]
url = Itemlisturl
fetch(url).then((rawdata ) => {
    return rawdata.json( );
})
.then((condata) => {   
    condata.forEach(item => {   allitems.push({ id : item.prod_id , name: item.prod_name, price : item.prod_price , unit : item.prod_unit })
    });    
    
});    



// To make a data available globally and as iterator object 
let Finalitem = getme(allitems)
function getme(x ){
    return x
}

console.log(Finalitem)
function showmyitems(){

       
    //Successfully items loaded in selectitem box
    let myselectitems = document.getElementsByClassName("selectitems")
    for (let i=0; i<myselectitems.length;i++){
        myselectitems[i].onclick = function( ){
            
            for(i=0;i<Finalitem.length;i++ ){
                let myoption        =  document.createElement("option")
                myoption.text       =  Finalitem[i]['name']
                myoption.value      =  Finalitem[i]['id']
                //myoption.label       =  Finalitem[i]['name']
               
                this.appendChild( myoption)
                this.onchange = function (){
                    showitemvalues( )
                    
                } 
            }        
        }
    }

}
showmyitems()

// shows values of selected Item
function showitemvalues( ){
    ouritem = Finalitem 
    sitem  =  document.getElementsByClassName("selectitems")
    sprice =  document.getElementsByClassName("myprices")
    sunit  =  document.getElementsByClassName("myunits") //myunits
    sqty   =  document.getElementsByClassName("myquantitys" )
    stotal =  document.getElementsByClassName("mytotals" )
    for(i=0;i<sitem.length;i++){
        item_id = sitem[i].value
        //item_name   = Finalitem[item_id]['name']
        item_price  = Finalitem[(item_id) -1]['price']
        item_unit   = Finalitem[(item_id) -1]['unit']
        item_qnty   = sqty[i].value
        item_total  = item_price * item_qnty
        
        sprice[i].value = item_price
        sunit[i].value  = item_unit
        stotal[i].value = item_total   
         
    } 
    displaygtotal( )   
}

// Display Grand total 

function displaygtotal( ){
    stot = document.getElementsByClassName("mytotals")
    let sum = 0;
    for(i=0; i<stot.length; i++) {       
        sum = sum +  Number(stot[i].value )
   }
   fsum =  sum.toFixed(2);
   console.log("sum",sum )
   document.getElementById("gtot").value = fsum
}
 

/*    ******************** Buy more items ********* */


// 1.create a div element
let buymore_div = document.createElement( 'div');
buymore_div.classList.add('Mybuymorecontainer')

// 2. Add element to webpage using ID
let location_div = document.querySelector( '#mainitembox')
location_div.appendChild(buymore_div)


// 3. Add event listener to button
buymorebtn = document.getElementById("buymore" );  //buymore
buymorebtn.addEventListener('click' , createbuy )

// 4 callback function

function createbuy( ){
    sel_items = document.getElementsByClassName("selectitems")
    sel_length = sel_items.length
    sel_box = sel_items[(sel_length)-1 ].value
    if (sel_box ==='' ){
        console.log("empty")
        alert("Please select any item and then press buymore") 
    }
    else {
        console.log("loaded") 
        let details_to_load = `
        <div class="container" id="itembox">       <!-- New single Item box-->

            <div class="row selparent"  >
                <div class="col-sm-3 form-control">
                    <label for="name"  class="formelements" >Item</label>
                    <select name="selectabs" id="selectitem"  class="selectitems" >
                        <option value=""> --choose me-- </option>                 
                    </select>
                </div>

                <div class="col-sm-2  form-control" >
                    <label for="myprice" class="formelements" >Price</label>
                    <input type="text"  id="myprice" class="myprices"  style="width: 70px;">
                </div>

                <div class="col-sm-2  form-control" >
                    <label for="myunit"  class="formelements" >Unit</label>
                    <input type="text"  id="myunit"  class="myunits" style="width: 50px;">   
                </div>

                <div class="col-sm-2  form-control" id="ourprice">
                    <label for="myqnty"  class="formelements" >Qty</label>
                    <input type="number" id="myquantity" class="myquantitys"  value=1 onclick="showitemvalues( )"  onkeyup="showitemvalues( )" style="width: 70px;">
                </div> 

                <div class="col-sm-3 form-control">
                    <label for="mytotals"  class="formelements" >Total</label>
                    <input type="text" id="mytotal" class="mytotals" disabled  style="width: 80px;">
                </div>
            </div>
        </div>       <!--New  single Item box Ends here--> <!--Place content after this-->

`

    buymore_div.insertAdjacentHTML("beforeend",details_to_load)
    showmyitems()
    }
    
}

/*    ******************** Buy more items ends here  ***********  */



/* save item to cart */
function saveme(){
    cnam   = document.getElementById("cname").value
    cname  = cnam.charAt(0).toUpperCase() + cnam.slice(1);
    if (cname ==""){
        alert("Customer Name Cannot be empty ")       
        return false
    }
    
    formEl  = document.forms.purchaseform
    pid     = document.getElementsByClassName("selectitems")
    punit   = document.getElementsByClassName("myunits")
    pqnty   = document.getElementsByClassName("myquantitys")
    pprice  = document.getElementsByClassName("mytotals")       
    
    gtotal  = Number(document.getElementById("gtot").value)
    order_details = [ ]
    
    for (i=0 ; i<pid.length; i++){   
        pd = Number(pid[i].value)       //To see the Product name using the product Id

        newitem = { 
            product_id   : pid[i].value ,
            product_name : Finalitem[(pd-1)]['name'] ,
            product_unit : punit[i].value,
            quantity     : pqnty[i].value ,
            total        : pprice[i].value 
            }

        order_details.push(newitem)
    }
    new_order = {
                    "cname"          : cname ,
                    "gtotal"         : gtotal ,
                    "order_details"  : order_details
                }
    console.log(new_order)
    let mydata = new_order
    let url = "http://127.0.0.1:5000/insertOrder" ///insertOrder
    let options =   {
                        method : "POST" ,
                        headers :   {
                                    "Content-Type" : "application/json"
                                    } ,
                        body : JSON.stringify(mydata)
                    }
        
    fetch(url,options)
    .then((result) => {
    console.log(result)
    })
    alert("Your Order Placed Successfully " +cname )

    /*
    // THis prevnt refreshing of window screen
    const handlesubmit = (myevent) =>{
        myevent.preventDefault();
        console.log(formEl)
        //console.log("iter_req",iter_req)
        //console.log(pnamebox)




        console.log(order_details)
        console.log(new_order)

    }

    formEl.addEventListener("submit",handlesubmit)
    
    */


}





function checkname(){
    
}