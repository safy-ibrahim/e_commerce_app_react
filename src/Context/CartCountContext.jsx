// import axios from "axios";
// import { createContext, useEffect, useState } from "react";



// export let cartCountContext = createContext(0)


// export default function CartCountContextProvider({ children }) {
//     const [cartCount, setCartCount] = useState(0)

//     async function getLoggedUseCart() {
//         try {
//             const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
//                 headers: {
//                     token: localStorage.getItem('token')
//                 }
//             }
//             );
            
//             setCartCount(data.numOfCartItems)
//             //setCartData(data)
            
//             // console.log(data);
//             // console.log('cart data');
//         } catch (err) {
//             console.log('errpor');
//         }

//     }

//     useEffect(() => {
//         getLoggedUseCart();
//     }, [])

//     return <cartCountContext.Provider value={{ cartCount, setCartCount }}>
//         {children}
//     </cartCountContext.Provider>
// }






import axios from "axios";
import { createContext, useEffect, useState } from "react";

// إنشاء الـ context مع قيمة ابتدائية 0
export let cartCountContext = createContext(0);

export default function CartCountContextProvider({ children }) {
    const [cartCount, setCartCount] = useState(0); // حفظ عدد العناصر في عربة التسوق

    async function getLoggedUseCart() {
        try {
            const token = localStorage.getItem('token'); // الحصول على التوكين من localStorage
            if (!token) {
                console.error('No token found in localStorage'); // التحقق من وجود التوكين
                return;
            }

            // إرسال الطلب للحصول على بيانات عربة التسوق
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: {
                    token: token // إضافة التوكين إلى headers
                }
            });

            if (data && data.numOfCartItems !== undefined) {
                setCartCount(data.numOfCartItems); // تحديث عدد العناصر في العربة
            } else {
                console.error('Unexpected response structure:', data); // التحقق من هيكل البيانات المستلمة
            }
        } catch (err) {
            console.error('Error fetching cart data:', err.response || err.message); // تحسين رسائل الخطأ
        }
    }

    useEffect(() => {
        getLoggedUseCart(); // استدعاء الدالة عند تحميل المكون
    }, []);

    return (
        <cartCountContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </cartCountContext.Provider>
    );
}