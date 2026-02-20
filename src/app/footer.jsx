import { Instagram, Linkedin, Whatsapp } from "lucide-react";
export default function Footer() {

    return (
        <>
            <section className="footer w-[100%] h-[auto]  bg-[black]">
                <div className="h-[120px]  w-[100%]  border-amber-50 flex justify-center items-center">
                    <img className="  w-[100px] h-[60px]" src="/_next/image?url=https%3A%2F%2Fespinashotels.com%2Fwp-content%2Fuploads%2F2024%2F01%2Fespinas_new_top_logo_white.png&w=256&q=75" alt="" />
                </div>
                <div className="w-[100%] h-[auto]  flex flex-wrap md:flex-nowrap  justify-center items-center ">
                    <div className="md:w-[300px] w-[100%] h-[180px] border-r  ">
                        <p className="w-[95%] h-[25px] text-[#c79462] text-center md:text-right mt-3.5">دفتر مدیریت</p>
                        <p className="w-[95%] h-[70px] text-[#afacac] text-center md:text-right mt-[40px]"> تهران، سعادت آباد، میدان بهرود، خیابان 33، هتل اسپیناس پالاس</p>
                    </div>
                    <div className="md:w-[300px] w-[100%] h-[180px] border-r">
                        <p className="w-[95%] h-[25px]   text-[#c79462] text-center md:text-right mt-3.5">تلفن های تماس</p>
                        <div className="w-[95%] h-[70px]   text-[#afacac] text-center md:text-right mt-[40px]">
                            <p className="w-[100%] h-[25px]">تلفن: 02175675</p>
                            <p className="w-[100%] h-[25px]">نمابر: 02175675365</p>

                        </div>
                    </div>
                    <div className="md:w-[300px] w-[100%] h-[180px] border-r">
                        <p className="w-[95%] h-[25px]  text-[#c79462] text-center md:text-right mt-3.5">واحد فروش، مارکتینگ و رزرواسیون</p>
                        <p className="w-[95%] h-[70px]   text-[#afacac] text-center md:text-right mt-[40px]">atena.ghnzadeh@espinashtels.com

                            

                            sales@espinashotels.co</p>
                    </div>
                    <div className="md:w-[300px] w-[100%] h-[180px]  ">
                        <p className="w-[95%] h-[25px]   text-[#c79462] text-center md:text-right mt-3.5">در ارتباط باشید </p>
                        <div  className="w-[95%] h-[70px] text-center md:text-right mt-[20px] flex md:justify-end justify-center items-center ">
                          <div className="w-[50px] h-[50px]  flex justify-center items-center"><Linkedin color="white"/></div>
                          <div className="w-[50px] h-[50px]  flex justify-center items-center"><Instagram color="white"/></div>
                        </div>
                    </div>

                </div>
                <div className="w-[100%] md:h-[100px] h-[60px] md:border-0 border-t border-[gray] flex justify-center items-center  ">
                    <div  className="w-[50%] h-[100%] md:flex justify-center items-center hidden text-[gray]"> کپچی رایت Espinas2024. کلیه حقوق محفوظ است توسعه  یافته توسط Salimi</div>
                    <div  className="w-[50%] h-[100%] md:flex hidden justify-around items-center">
                        <div  className="cursor-pointer w-[15%] h-[50%] duration-150  text-[white] hover:text-[#dea451] flex justify-center items-center">استخدام</div>
                        <div  className="cursor-pointer w-[15%] h-[50%] duration-150  flex justify-center hover:text-[#dea451] text-white items-center">مجموعه فان سنتر </div>
                        <div  className="cursor-pointer w-[15%] h-[50%] duration-150  flex justify-center hover:text-[#dea451] text-white items-center">سالن کنسرت</div>
                        <div  className=" cursor-pointer w-[15%] h-[50%]  flex justify-center text-[#dea451] items-center">صفحه نخست</div>
                    </div>
                </div>
            </section>
        </>
    )
}
