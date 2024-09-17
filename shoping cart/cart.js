let lable=document.getElementById("lable");
let ShoppingCart=document.getElementById("ShoppingCart");


let basket=JSON.parse(localStorage.getItem("data")) ||[];
let calculation=(id)=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML=(basket.map((x)=>x.item ) .reduce((x,y)=> x+y,0))
 };
 
 calculation();

 let genrateCarItems=()=>{
    if (basket.length !== 0) {
        return (ShoppingCart.innerHTML = basket
          .map((x) => {
            let { id, item } = x;
            let search =  shopItemData.find((y) => y.id === id) || [];
            return `
          <div class="cart-item">
            <img width="100" src=${search.imge} alt="" />
            <div class="details">
    
              <div class="title-price-x">
                  <h4 class="title-price">
                    <p>${search.name}</p>
                    <p class="cart-item-price">$ ${search.price}</p>
                  </h4>
                  <span onclick="removeItem(${id})" class="material-symbols-outlined cross">
close
</span>
              </div>
    
              <div class="buttons">
                        <span onclick="decrement(${id})" class="material-symbols-outlined sub">
                            remove
                            </span>
                             <div id=${id} onlick="update(${id})" class="quantity">${item}</div>
                         <span onclick="increment(${id})"class="material-symbols-outlined add">
                                add
                                </span>    

                    </div>
              <h3>$ ${item * search.price}</h3>
            </div>
          </div>
          `;
          })
          .join(""));
      }
    else{
        ShoppingCart.innerHTML=``;
        lable.innerHTML=`
        <h2>Cart is empty</h2>
        <a href="index.html">
        <button class="HomeBtn">Back to home</button></a>`;
        
    }
 };
 genrateCarItems();
 let increment = (id)=>{
    // console.log(basket);
    let slectedItem=id;
    let search=basket.find((x)=>x.id===slectedItem.id);
    // if(search===undefined) return;
    if(search===undefined){
       basket.push({
        id:slectedItem.id,
        item:1
    });  
    }
    else{
        search.item+=1;
    }
    genrateCarItems();
    update(slectedItem.id);
    localStorage.setItem("data",JSON.stringify(basket));
    };
let decrement = (id)=> {
    // console.log(basket);
    let slectedItem=id;
    let search=basket.find((x)=>x.id===slectedItem.id);
    if(search===undefined) return;
    else if(search.item===0)
        return;
    else
    search.item-=1;
    update(slectedItem.id);
    basket=basket.filter((x)=> x.item !==0);
    genrateCarItems();
    
    localStorage.setItem("data",JSON.stringify(basket));
    };  
let update= (id)=>{
    let search=basket.find((x)=>x.id===id);
    // console.log(search.item);
    document.getElementById(id).innerHTML= search.item;
    calculation();
    TotalAmount();
}; 
let removeItem = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    basket = basket.filter((x) => x.id !== selectedItem.id);
    genrateCarItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
  };
  let TotalAmount = () => {
    if (basket.length !== 0) {
      let amount = basket
        .map((x) => {
          let { item, id } = x;
          let search = shopItemData.find((y) => y.id === id) || [];
  
          return item * search.price;
        })
        .reduce((x, y) => x + y, 0);
      // console.log(amount);
      lable.innerHTML = `
      <h2>Total Bill : $ ${amount}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `;
    } else return;
  };
  let clearCart=()=>{
    basket=[];
    genrateCarItems();
    localStorage.setItem("data",JSON.stringify(basket));
    calculation();
    

  }
  TotalAmount();
