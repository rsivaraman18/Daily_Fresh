function check_admin1( ){
    //let isadmin = confirm("Are you Admin of this site ? " )
    isadmin = prompt("Only Admin can use this page ","Admin pwd" )
    console.log(isadmin )
    if (isadmin !="siva"){
        myanchor = document.getElementById("myanchor1")
        myanchor.setAttribute("href", "#");
        alert("Sry password incorrect" )
        
    }
}


function check_admin2( ){
    //let isadmin = confirm("Are you Admin of this site ? " )
    isadmin = prompt("Only Admin can use this page ","Admin pwd" )
    console.log(isadmin )
    if (isadmin !="siva"){
        myanchor = document.getElementById("myanchor2")
        myanchor.setAttribute("href", "#");
        alert("Sry password incorrect" )
        
    }
}