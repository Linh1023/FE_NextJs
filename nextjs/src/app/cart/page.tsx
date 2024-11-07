import Cart from "@/components/cart/cart"
import { auth } from "@/auth"
import { fetchGetCart, fetchGetTours } from "@/services/apiServiceServer"
import { MyProvider } from "@/utils/MyContext";
import { SessionProvider } from "next-auth/react"
const CartPage = async () => {

    const session = await auth()
    if (!session?.user) return (
        <>
            <h3>Bạn vui lòng đăng nhập để thêm danh mục yêu thích</h3>
        </>
    )


    const tourCards: ITourResponse[] = await fetchGetTours();


    return (
        <>

                    <Cart

                        tourCards={tourCards}
                    />



        </>
    )
}

export default CartPage