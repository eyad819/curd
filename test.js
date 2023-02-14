let title = document.getElementById("titel");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let tmp;
let mood='create'
//get total
function getTotal(){
if(price.value!=""){
let result = (+price.value + +taxes.value + +ads.value) - +discount.value
total.innerHTML= result;
total.style.background="#040";
}else{
  total.innerHTML='';
total.style.background="#a00d02";

}
}

//create project

let dataPro;
if(localStorage.prodect != null){
  dataPro= JSON.parse(localStorage.prodect);

}else{
  dataPro=[];
}

submit.onclick=function(){
  let NewPro={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
  }
  if(title.value !=''){
if(mood ==='create'){
if(NewPro.count>1){
  for(let i=0 ; i<NewPro.count;i++){
    dataPro.push(NewPro)
  }
}else{
  dataPro.push(NewPro)
}

}else{
  dataPro[tmp]=NewPro;
  mood='create';
  submit.innerHTML='create';
  count.style.display='block'
}
  }

  localStorage.setItem('prodect'  ,JSON.stringify(dataPro) )
  cleardata()
  showData()
}
//clear inpunt
function cleardata(){
title.value='';
price.value='';
taxes.value='';
ads.value='';
discount.value='';
count.value='';
category.value='';
total.innerHTML='';
}
//read
function showData(){
  getTotal()
let table='';

for(let i = 0; i <dataPro.length;i++){
  table+=`
  
  <tr>
<td>${i}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td><button onclick="updateData(${i})" id="update">update</button></td>
<td><button onclick="deleteData(${i})" id="delete">delete</button></td>
</tr>
  `
}

document.getElementById('tbody').innerHTML=table;
let btndelete=document.getElementById('deleteall');
if(dataPro.length>0){
  btndelete.innerHTML=`
<button onclick="deleteAll()">Delete All (${dataPro.length})</button>
  `
}
else{
  btndelete.innerHTML='';
}
}
showData()
//delete
function deleteData(i){
dataPro.splice(i,1);
localStorage.prodect=JSON.stringify(dataPro);
showData()
}
function deleteAll(){
  localStorage.clear;
  dataPro.splice(0);
  showData();
}
//update
function updateData(i){
title.value=dataPro[i].title;
price.value=dataPro[i].price;
taxes.value=dataPro[i].taxes;
ads.value=dataPro[i].ads;
discount.value=dataPro[i].discount;
getTotal()
category.value=dataPro[i].category;
count.style.display='none';
submit.innerHTML='Update';
mood='update';
tmp=i;
scroll({top:0, behavior:'smooth'})
}

///search
let searchMood='title';
function getsearchMood(id){
    let search=document.getElementById('search');
if(id=='searchtitle'){
  searchMood='title';
}else{
  searchMood='category';
}
    search.placeholder='Search By '+searchMood;
    search.focus();
    search.value='';
    showData()
}

function searchData(value){
  let table='';
  for(let i=0;i<dataPro.length ; i++){
if(searchMood=='title'){
    if(dataPro[i].title.includes(value)){
      table+=`
      <tr>
    <td>${i+1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
      `
    }
  }else{
    if(dataPro[i].category.includes(value.toLowerCase())){
      table+=`
      <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
      `    
  }
}
  }

document.getElementById('tbody').innerHTML=table;
}
