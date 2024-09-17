let shop = document.getElementById("shop");

let basket=JSON.parse(localStorage.getItem("data")) ||[];

let genrateShop = () => {
    return (shop.innerHTML = shopItemData.map((x)=>{
        let {id,name,price,desc,imge}=x;
        let search=basket.find((x)=>x.id===id) ||[];
        return `
        <div id=product-id-${id} class="items">
            <div class="img">
                 <img width="220px" height="230px" src= ${imge} alt="">
            </div>
            <div class="details">
                <h3>${name}</h3>
                <div class="about">
                   Lorem ipsum dolor sit amet, consectetur adipisicing.
                </div>
                <div class="amount-quantity">
                    <h2>
                    $ ${price}
                    </h2>
                    <div class="buttons">
                        <span onclick="decrement(${id})" class="material-symbols-outlined sub">
                            remove
                            </span>
                             <div id=${id} onlick="update(${id})" class="quantity">${search.item===undefined? 0:search.item}</div>
                         <span onclick="increment(${id})"class="material-symbols-outlined add">
                                add
                                </span>    

                    </div>
                </div>
  
            </div>

        </div>`;})
        .join(""));
    };
genrateShop();
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
    
    localStorage.setItem("data",JSON.stringify(basket));
    };  
    
    

let update= (id)=>{
    let search=basket.find((x)=>x.id===id);
    // console.log(search.item);
    document.getElementById(id).innerHTML= search.item;
    calculation();
};

let calculation=(id)=>{
   let cartIcon = document.getElementById("cartAmount");
   cartIcon.innerHTML=(basket.map((x)=>x.item ) .reduce((x,y)=> x+y,0))
};

calculation();