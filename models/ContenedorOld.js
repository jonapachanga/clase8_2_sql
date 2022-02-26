const fs = require('fs');
const mapper = require('../utils/ObjectMapper');

module.exports = class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
        this.loadProducts();
    }

    loadProducts() {
        // Read products from file
        if (! this.existFile(this.fileName)) {
            this.products = [];

            return;
        }

        try {
            const products = fs.readFileSync(this.fileName, {encoding: 'utf8', flag: 'r'});

            // Load products as objects
            this.products = (!!products) ? mapper.toObject(products) : [];

        } catch (e) {
            console.log(e);
        }
    }

    save(product) {
        try {

            // Push the new product in Products list
            const persistedProduct = this.addProduct(product);

            // Save the products in the file
            this._internalSave();

            return persistedProduct.id;
        } catch (error) {
            console.error(error);
        }
    }

    async _internalSave() {
        try {
            await fs.promises.writeFile(`${this.fileName}`, `${mapper.toString(this.products)}`);
        } catch (e) {
            console.log(e);
        }
    }

    async getById(productId) {
        const product = this.products.filter(product => product.id === Number(productId));

        return product.length ? product[0] : null;
    }

    async getAll() {
        return this.products;
    }

    async deleteById(productId) {
        this.products = this.products.filter(product => product.id !== Number(productId));
        await this._internalSave();
    }

    async deleteAll() {
        this.products.length = 0;
        await this._internalSave();
    }

    async update(id, newProduct) {
       const index = this.products.findIndex(value => value.id === Number(id));

       this.products[index].title = newProduct.title;
       this.products[index].price = newProduct.price;
       this.products[index].thumbnail = newProduct.thumbnail;

       await this._internalSave();

       return this.products[index];
    }

    existFile(path) {
        return fs.existsSync(path);
    }

    _assignId() {
        return this.products.length + 1;
    }

    addProduct(product) {
        product.id = this._assignId();
        this.products.push(product);

        return product;
    }
}