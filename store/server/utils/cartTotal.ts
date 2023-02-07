export interface Product {
    quantity: number
    _key: string
    product: {
        _id: string,
        name: string,
        price: number
        photoUrl: string
    }
}

const sum = (userCart:Product[]) => userCart.reduce((total: number, product) => {
    return total + (product.quantity * product.product.price);
}, 0)

export default sum;