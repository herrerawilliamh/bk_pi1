/*IMPORTS*/
const fs = require('fs');
const path = require('path');
const { productModel } = require("./models/carts.model");

/*VARS*/
//const dataPath = path.join(path.resolve(__dirname, '..','data', 'data.json'));

class ProductManager{
    constructor(productModel){
        this.products=[]
        this.path
        this.productModel = productModel;
    }
    addProduct(title, description, price, thumbnail, code, stock){
        if(!thumbnail){
            thumbnail = ""
        }
        const required_fields = [title, description, price, code, stock].includes("")
        if(required_fields){
            console.log("Debes completar todos los campos")
            return false;
        }
        const code_found =this.products.find((product)=>product.code===product.code)
        if(code_found){
            console.log("Código de producto encontrado, debes cambiar el Código de producto")
            return false;
        }
        const products = this.getProducts()
        //const last_id = products[products.length - 1].id
        //const product_id = last_id + 1
        const product={
            //id:product_id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        /*products.push(product)
        const new_data = JSON.stringify(products, null, 2);
        fs.writeFileSync(dataPath, new_data);*/

        this.productModel.create(product, (error, result) => {
            if (error) {
                console.log("Error al crear el producto", error);
                return;
            }
            console.log("Producto creado exitosamente", result);
        });
    }
    getProducts(){
        this.productModel.find({}, (error, result) => {
            if (error) {
                console.log("Error al obtener los productos", error);
                return;
            } 
            console.log("Productos obtenidos exitosamente", result);
        });
        /*try {
            const data_reading = fs.readFileSync(dataPath, "utf-8")
            const data_products = JSON.parse(data_reading)
            return data_products
        } catch (error) {
            console.error("Error de lectura", error);
        }   
        return this.products*/
    }
    getProductsById(id){
        this.productModel.findById(id, (error, result) => {
            if (error) {
                console.log("Error al obtener el producto", error);
                return;
            } 
            if(!result){
                console.log("Producto no encontrado");
                return;
            }
            console.log("Productos obtenido exitosamente", result);
        });
        /*const data_reading = this.getProducts()
        const product_found = data_reading.find((product)=>product.id===+id)
        if(!product_found){
            console.log("Product Not Found")
            return
        }
        return product_found*/
    }
    updateProduct(id, campo, dato){
        const update = {};
        update[campo] = dato;
        this.productModel.findByIdAndUpdate(id, update, { new: true }, (error, result) => {
            if (error) {
                console.log("Error al actualizar el producto por id", error);
                return;
            } 
            if(!result){
                console.log("Producto no encontrado. No se pudo actualizar el producto.");
                return;
            }
            console.log("Producto actualizado exitosamente", result); 
        });
        /*const data_reading = this.getProductsById(id);
        if(!data_reading){
            console.log("Product Not Found. No se pudo actualizar el producto.")
            return
        }
        if (data_reading[campo] === dato) {
            console.log("Es el mismo dato. No se necesita actualizar el producto.");
            return
        }
        data_reading[campo] = dato;
        let product_found = this.getProducts();
        product_found = product_found.map((p) => {
            if(p.id === id){
                return data_reading
            }
            return p
        });
        fs.writeFileSync(dataPath, JSON.stringify(product_found, null, 2));
        console.log("Producto actualizado exitosamente");
        return product_found*/
    }
    deleteProduct(id){
        this.productModel.findByIdAndDelete(id, (error, result) => {
            if (error) {
                console.log("Error al eliminar el producto por id", error);
                return;
            } 
            if(!result){
                console.log("Producto no encontrado. No se pudo eliminar el producto.");
                return;
            }
            console.log("Producto eliminado exitosamente", result); 
        });
        /*const data_reading = this.getProductsById(id);
        let product_found = this.getProducts();
        if(!data_reading){
            console.log("Product Not Found. El producto no existe.")
            return
        }
        product_found = product_found.filter((p) => p.id !== id);
        fs.writeFileSync(dataPath, JSON.stringify(product_found, null, 2))
        console.log("Producto eliminado exitosamente")*/
    }

}

module.exports = ProductManager;