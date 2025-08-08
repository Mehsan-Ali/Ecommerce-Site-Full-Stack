import { useAppSelector } from '../store/hooks'

export const Cart = () => {
    const { items, totalAmount, totalItems } = useAppSelector((state) => state.cart)
    return (
        <>
            {
                items.length <= 0 ?
                    <div>
                        Your cart is Empty
                    </div>
                    :
                    <div>
                        {items.map((item) => (
                            <div key={item._id} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="item-details">
                                    <h2>{item.name}</h2>
                                    <p>Price: ${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                        <div className="cart-total">
                            <p>Total Items: {totalItems}</p>
                            <p>Total Amount: ${totalAmount}</p>
                        </div>
                    </div>
            }
        </>
    )
}
