import{r as d,j as t,c as e,u as v,a as f,L as k,b as N,d as w,P as z,A as E,H as y}from"./index-Y-AVD2-w.js";const b="_input_1tpjw_1",C="_icon_1tpjw_29",u={input:b,icon:C,"with-icon":"_with-icon_1tpjw_39"},S=d.forwardRef(function({className:c,placeholder:n,search:r=!0,...a},l){return t.jsxs("div",{style:{position:"relative"},children:[t.jsx("input",{placeholder:n,ref:l,...a,className:e(u.input,{[u["with-icon"]]:r})}),r&&t.jsx("img",{src:"/search.svg",alt:"search",className:e(u.icon)})]})}),L="_menu_1paw4_1",_={menu:L,"menu-search":"_menu-search_1paw4_11","menu-items":"_menu-items_1paw4_21"},P="_image_dpk4z_21",A="_price_dpk4z_31",D="_cart_dpk4z_61",F="_rating_dpk4z_89",I="_title_dpk4z_133",R="_description_dpk4z_145",T="_link_dpk4z_157",i={"product-card":"_product-card_dpk4z_1","product-card-top":"_product-card-top_dpk4z_13",image:P,price:A,cart:D,rating:F,"product-card-bottom":"_product-card-bottom_dpk4z_119",title:I,description:R,link:T};function $(s){const c=v(),n=f(a=>a.cart.items),r=a=>{a.preventDefault(),c(N.add(s.id))};return t.jsx(k,{to:"/product/"+s.id,className:i.link,children:t.jsxs("div",{className:e(i["product-card"]),children:[t.jsxs("div",{className:e(i["product-card-top"]),children:[t.jsx("img",{src:s.image,alt:"",className:e(i.image)}),t.jsxs("div",{className:e(i.price),children:[s.price," ",t.jsx("span",{children:"₽"})]}),t.jsx("button",{className:e(i.cart),onClick:r,style:{background:n.some(a=>a.id===s.id)?"#FE724C":"#ccc"},children:t.jsx("img",{src:"/cart-icon.svg",alt:"add-to-cart"})}),t.jsxs("div",{className:e(i.rating),children:[t.jsx("span",{children:s.rating}),t.jsx("img",{src:"/rating-star.svg",alt:"rating-star"})]})]}),t.jsxs("div",{className:e(i["product-card-bottom"]),children:[t.jsx("div",{className:e(i.title),children:s.title}),t.jsx("div",{className:e(i.description),children:s.description})]})]})})}function H({products:s}){return s==null?void 0:s.map(c=>t.jsx($,{id:c.id,title:c.name,price:c.price,description:c.ingredients.join(", "),image:c.image,rating:c.rating},c.id))}function X(){const[s,c]=d.useState([]),[n,r]=d.useState(!1),[a,l]=d.useState(""),[p,j]=d.useState("");let g=0;d.useEffect(()=>{h(p)},[p]);const h=async m=>{r(!0);try{const{data:o}=await w.get(`${z}/products`,{params:{name:m}});c(o)}catch(o){console.log(o),o instanceof E&&l(o.message)}r(!1)},x=m=>{clearTimeout(g),g=setTimeout(()=>{j(m.target.value)},250)};return d.useEffect(()=>{h()},[]),t.jsxs("div",{className:e(_.menu),children:[t.jsxs("div",{className:e(_["menu-search"]),children:[t.jsx(y,{children:"Меню"}),t.jsx(S,{onChange:x,placeholder:"Введите блюдо или состав"})]}),t.jsxs("div",{className:e(_["menu-items"]),children:[a&&t.jsx("div",{children:a}),!n&&s&&t.jsx(H,{products:s}),!n&&!s.length&&"ничего не найдено :(",n&&t.jsx("div",{children:"Загружаем..."})]})]})}export{X as Menu,X as default};
