/*IMPORTS*/
const fs = require('fs');
const path = require('path');
const ProductManager = require('./ProductManager.js');

/*VARS*/
const cartPath = path.join(path.resolve(__dirname, '..',__dirname, 'data', 'cart.json'));

class CartManager{
    constructor(products){
        this.carts = [];
        this.products = new ProductManager(products);
    }
    createCart(products=[]){
        const carts = this.getCart();
        const last_id = carts[carts.length -1].id;
        const cart_id = last_id+1;
        const cart = {
            id: cart_id,
            products: products
        };
        carts.push(cart);
        const new_data = JSON.stringify(carts, null, 2);
        fs.writeFileSync(cartPath, new_data);
        return cart;
    }
    getCart(){
        try {
            const data_reading = fs.readFileSync(cartPath, "utf-8")
            const data_cart = JSON.parse(data_reading)
            return data_cart
        } catch (error) {
            console.error("Error de lectura", error);
        }
        return this.carts
    }
    getCartById(id) {
        const data_reading = this.getCart()
        const cart_found = data_reading.find((cart) => cart.id === +id);
        if (cart_found) {
            return cart_found;
        }else{
            return "Cart not found";
        }
    }
        addProductToCart(cid, pid) {
            const cart = this.getCartById(cid)
            const product = this.products.getProductsById(pid);
            if (cart && product) {
                const item = cart.products.find(i => i.product === pid);
                if (!item) {
                    cart.products.push({product: pid, quantity: 1});
                }else{
                    item.quantity++;
                }
                const data = fs.readFileSync(cartPath, 'utf8')
                const carts = JSON.parse(data)
                const index = carts.findIndex(c => c.id === +cid)
                carts[index] = cart
                const new_data = JSON.stringify(carts, null, 2)
                fs.writeFileSync(cartPath, new_data)
                console.log('Carrito actualizado')
                return cart;
            }else{
                return "Cart or product not found";
            }
        }
    saveCart(cart) {
        const cartJSON = JSON.stringify(cart, null, 2);
        fs.writeFileSync(cartPath, cartJSON);
    }
}

module.exports = CartManager;