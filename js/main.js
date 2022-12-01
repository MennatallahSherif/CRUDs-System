var productName= document.getElementById("productName");
var productPrice= document.getElementById("productPrice")
var productCategory= document.getElementById("productCategory")
var ProductDescription= document.getElementById("productDescription")
var submitButton=document.getElementById("submitButton")
var alertName=document.getElementById("alertName")
var alertPrice=document.getElementById("alertPrice")
var alertCat=document.getElementById("alertCat")
var alertDesc=document.getElementById("alertDesc")

var productContainer
var currentIndex

// if i have data on my container
if(localStorage.getItem("ProductList") != null){
    productContainer= JSON.parse(localStorage.getItem("ProductList")) 
    displayProducts()
}
else{
    productContainer=[]
}


// form Button
submitButton.onclick=function(){
    if(submitButton.innerHTML=="Add Product"){
        addProduct()
    }
    else{
        updateProduct()
    }
   
}

// add each product in an object and collect them in one array
function addProduct(){
    if(validationName()&&validationPrice()&&validationCategory()){
    var product={
        name:productName.value ,
        price:productPrice.value,
        category:productCategory.value,
        desc:ProductDescription.value,
    }
     productContainer.push(product)
     localStorage.setItem("ProductList",JSON.stringify(productContainer))
     displayProducts()
     clearForm()
}
}


// display data in the table
function displayProducts(){
    var cartoona= "";
    for(var i=0; i<productContainer.length; i++){
        productContainer[i]
         cartoona+=` <tr>
         <td>${i}</td>
         <td>${productContainer[i].name}</td>
         <td>${productContainer[i].price}</td>
         <td>${productContainer[i].category}</td>
         <td>${productContainer[i].desc}</td>
         <td><button class="btn btn-warning" onclick="getProduct(${i})">Update</button></td>
         <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
     </tr>` 
    }

    document.getElementById("tableBody").innerHTML=cartoona
}


// delete
function deleteProduct(index){
        productContainer.splice(index,1)
        displayProducts()
        localStorage.setItem("ProductList",JSON.stringify(productContainer))
      
}

// search
var searchContainer=[]
function search(term){
    var cartoona="";
    for (var i =0; i< productContainer.length ; i++)
        {
         if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())||
         productContainer[i].category.toLowerCase().includes(term.toLowerCase()))
         {
            cartoona+=` <tr>
            <td>${i}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].desc}</td>
            <td><button class="btn btn-warning" onclick="getProduct(${i})">Update</button></td>
            <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
        </tr>` 

         }  
   }  
   document.getElementById("tableBody").innerHTML=cartoona 
}


// update
function getProduct(index){
   currentProduct= productContainer[index]
   productName.value=currentProduct.name
   productPrice.value=currentProduct.price
   productCategory.value=currentProduct.category
   ProductDescription.value=currentProduct.desc

   submitButton.innerHTML ="update"

   currentIndex=index

}
function updateProduct(){
    var product={
        name:productName.value ,
        price:productPrice.value,
        category:productCategory.value,
        desc:ProductDescription.value,
    }
    productContainer[currentIndex]=product;
    displayProducts()
    localStorage.setItem("ProductList",JSON.stringify(productContainer))
    submitButton.innerHTML="Add Product"
    clearForm()

}


// validation
function validationName(){
    var regex=/^[A-Z][a-z]{1,8}[1-9]{0,4}$/
    if(regex.test(productName.value))
    {
        alertName.style.display="none"
        return true

    }
    else{
        alertName.style.display="block"
        return false
    }
}
function validationPrice(){
    var regex=/^[1-9][0-9]{2,6}$/
    if(regex.test(productPrice.value))
    {
        alertPrice.style.display="none"
        return true

    }
    else{
        alertPrice.style.display="block"
        return false
    }
}
function validationCategory(){
    var regex=/^[A-Z][a-z]{2,10}[0-9]{0,4}$/
    if(regex.test(productCategory.value))
    {
        alertCat.style.display="none"
        return true

    }
    else{
        alertCat.style.display="block"
        return false
    }
}

// clear
function clearForm(){
    productName.value="";
    productPrice.value="";
    productCategory.value="";
    ProductDescription.value="";
}