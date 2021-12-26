export const createCart = () => {
    let cart: any[] = []
    return function (product: any = null) {
        if (!product) {
            return cart
        } 
        cart.push(product)

        return cart
        
    }
}









