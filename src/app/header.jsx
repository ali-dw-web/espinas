import './globals.css'
import { Phone, Mail, LogIn } from "lucide-react";
import { Menu } from "lucide-react";
import { Instagram } from "lucide-react";
import { Linkedin } from "lucide-react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
import Image from 'next/image'
import { useRef, useState } from 'react';
export default function Header() {
    const left_menu = useRef(null)
    const right_menu = useRef(null)
    const removeSideMenu = useRef(null)
    const loginmenu1 = useRef(null)
    const [loading, setLoading] = useState(1)
    const router = useRouter()

    const menu = () => {
        if (window.innerWidth > 1024) {
            right_menu.current.classList.add('right_menu_slide')
            removeSideMenu.current.classList.add('removeSideMenu')
        } else {
            left_menu.current.classList.add('left_menu_slide')
            removeSideMenu.current.classList.add('removeSideMenu')
        }
    }
    const removemenus = () => {
        right_menu.current.classList.remove('right_menu_slide')
        left_menu.current.classList.remove('left_menu_slide')
        removeSideMenu.current.classList.remove('removeSideMenu')

    }
    function openLogin(e) {
        loginmenu1.current.classList.add('loginmenu')

    }
    function closeLogin(e) {
        loginmenu1.current.classList.remove('loginmenu')
    }
    function login(e) {
        let password = e.target.parentElement.previousElementSibling.previousElementSibling.children[1].children[0].value
        let username = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.children[1].children[0].value
        if (password == 'ADMIN' && username == 'ADMIN') {
            setLoading(2)
            setTimeout(() => {
                router.push('./adminPannel')
            }, 3000)
        } else {
            alert('سیکتیر')
        }





    }
    function search(e) {
        if (e.target.checked) {
            e.target.parentElement.previousElementSibling.previousElementSibling.children[1].children[0].value = 'ADMIN'
            e.target.parentElement.previousElementSibling.children[1].children[0].value = 'ADMIN'
        } else {
            e.target.parentElement.previousElementSibling.previousElementSibling.children[1].children[0].value = ''
            e.target.parentElement.previousElementSibling.children[1].children[0].value = ''
        }
    }
    function openLoginres() {
        loginmenu1.current.classList.add('loginmenu')


    }
     useEffect(() => {
    AOS.init({
      duration: 800,
      
    });
  }, []);

    return (
        <>
            <div onClick={removemenus} ref={removeSideMenu}></div>
            <div ref={right_menu} className=' flex flex-wrap justify-center items-center duration-500 w-[300px] h-[100vh] border fixed top-0 right-[-300px] bg-[#fffaf6] z-60'>
                <div className='w-[80%] h-[120px]  flex justify-center items-center '>
                    <Image
                        src='https://espinashotels.com/wp-content/uploads/2024/02/espinas_top_logo_black.png'
                        alt='espinas'
                        width={150}
                        height={150}
                    />
                    <div ref={loginmenu1} className='duration-300 w-[250px] h-[100vh]  top-0 right-[-300px] z-50  fixed bg-[black]'>
                        <div className='w-[100%] h-[25px]  text-[15px]   flex justify-end items-center'>
                            <span onClick={() => closeLogin(event)} className='w-[30px] flex justify-center text-[#dbd9d9] items-center h-[100%] icofont-close-line '></span>
                        </div>
                        <div className='w-[100%] h-[150px] mt-[20px]  flex justify-center items-center'>
                            <div className='w-[120px] h-[120px] icofont-ui-user text-[50px] text-[#badef2] rounded-[50%] bg-[#f9fbfc] flex justify-center items-center'></div>
                        </div>
                        <div className='w-[100%] h-[230px] '>
                            <div dir='rtl' className='w-[100%] h-[25%]  mt-2.5'>
                                <label className=' pr-2.5 w-[100%] h-[10px]   flex justify-start text-[15px] items-center text-[white] ' htmlFor="">نام کاربری</label>
                                <div className='w-[90%] h-[25px]  mx-auto mt-2'>
                                    <input className='w-[100%] h-[100%] bg-[#1e2124] rounded-[5px] mt-1.5 text-[white]' type="text" />
                                    <div className='w-[100%] h-[10px] text-[#f34848] hidden'>اطلاعات صحیح نمیباشد</div>
                                </div>
                            </div>
                            <div dir='rtl' className='w-[100%] h-[25%]  mt-5 '>
                                <label className=' pr-2.5 w-[100%] h-[10px] flex justify-start text-[15px] items-center text-[white] ' htmlFor="">رمز عبور</label>
                                <div className='w-[90%] h-[25px]  mx-auto mt-2'>
                                    <input className='w-[100%] h-[100%] bg-[#1e2124] rounded-[5px] mt-1.5 text-[white]' type="password" />
                                    <div className='w-[100%] h-[10px] text-[#fa4141] hidden'>اطلاعات صحیح نمیباشد</div>
                                </div>
                            </div>
                            <div className='w-[100%] h-[30px] text-[white]  flex justify-end items-center'>
                                <label className='pr-2' htmlFor="">ADMIN</label>
                                <input onChange={() => search(event)} className='mr-5' type="checkbox" />
                            </div>
                            <div className='w-[100%] h-[50px]  mt-[35px] flex justify-center items-center'>
                                <div onClick={() => login(event)} className=' text-[black] w-[120px] h-[30px]  rounded-[5px] bg-[white] flex justify-center items-center'>
                                    {loading == 1 ? 'ورود ' :
                                        <img className='h-[95%]' src="images/icons8-loading-circle.gif" alt="" />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[80%] h-[120px]  flex justify-center items-center flex-wrap '>
                    <strong className='text-[brown]'>:  دفتر فروش و مارکتینگ
                    </strong>
                    <p className='text-[black]'> تلفن تماس : 09104578437</p>
                    <p className='text-[black]'>نمابر : 025025025025</p>
                </div>
                <div className='w-[80%] h-[120px] flex justify-center items-center flex-wrap '>
                    <strong className='text-[brown]'>
                        :  رزرواسیون مرکزی هتل اسپیناس
                    </strong>
                    <p className='text-[black]'>espinas.reservation@gmail.com</p>
                </div>
                <div className='w-[80%] h-[120px]  flex justify-center items-center '>
                    <div className='w-[45px] h-[45px]  rounded-[50%] m-1.5 bg-[green] flex justify-center items-center '>
                        <Phone
                            color='white'
                        />
                    </div>
                    <div className='w-[45px] h-[45px]  rounded-[50%] m-1.5 bg-[blue] flex justify-center items-center '>
                        <Linkedin
                            color='white'
                        />
                    </div>
                    <div className='w-[45px] h-[45px] rounded-[50%] m-1.5 bg-black flex justify-center items-center'>
                        <Instagram
                            color='white'
                        />
                    </div>
                </div>

            </div>
            <div ref={left_menu} className='duration-500 w-[300px] h-[100vh] border-b fixed top-0 left-[-300px] bg-[#353535] z-60'>
                <div className='w-full h-[50px] text-white  border-black   border-b duration-300 hover:bg-[black] flex items-center justify-end  '>درباره هتل</div>
                <div className='w-full h-[50px] text-white  border-black   border-b duration-300 hover:bg-[black] flex items-center justify-end'>اتاق ها و سوییت ها </div>
                <div className='w-full h-[50px] text-white  border-black   border-b duration-300 hover:bg-[black] flex items-center justify-end  '>فان سنتر</div>
                <div className='w-full h-[50px] text-white  border-black   border-b duration-300 hover:bg-[black] flex items-center justify-end '>مرکز سلامتی </div>
                <div className='w-full h-[50px]  text-white  border-black  border-b duration-300 hover:bg-[black] flex items-center justify-end  '>رستوران  ها</div>
                <div className='w-full h-[50px] text-white  border-black   border-b duration-300 hover:bg-[black] flex items-center justify-end '>جلسات و روییداد های</div>
                <div className='w-full h-[50px] text-white  border-black   border-b duration-300 hover:bg-[black] flex items-center justify-end '>تهران رویال هال</div>
                <div className='w-full h-[50px] text-white  border-black   border-b duration-300 hover:bg-[black] flex items-center justify-end '>ارتباط با هتل </div>

            </div>
            <div data-aos='fade-down' className="header z-50 absolute top-0 w-[100%] h-[160px] ">
                <div className='w-[100%] bg-black/50 lg:h-[60%] h-[45%] border-b border-amber-50 flex content-center items-center'>
                    <div className='md:w-[33.33%] w-[36%] h-[100%] flex justify-center items-center flex-wrap' >
                        <div className='w-[100%] h-[50%]    lg:justify-start justify-center items-center hidden text-white lg:flex  text-[15px]'>
                            <Phone className="text-white w-6 h-6 ml-2.5 pr-[5px]" />
                            discordali70@gmail.com
                        </div>
                        <div className='w-[100%] h-[50%] text-white  hidden lg:flex lg:justify-start justify-center items-center text-[15px]'>
                            <Mail className='ml-2.5 pr-[5px] text-white' />
                            09104578437
                        </div>
                        <div onClick={openLoginres} className='w-[80px] md:mr-2 h-[50%]   lg:hidden flex justify-center items-center bg-black rounded-sm text-[white]'>ورود همکار</div>
                        <div className='w-[80px] h-[50%]  border hidden sm:flex lg:hidden justify-center items-center  bg-black color rounded-sm text-white'>فارسی</div>
                    </div>
                    <div className='w-[33.33%] h-[100%]  flex justify-center items-center' >
                        <Image
                            src='https://espinashotels.com/wp-content/uploads/2024/01/espinas_new_top_logo_white.png'
                            width={100}
                            height={80}
                            alt=''
                        ></Image>
                    </div>
                    <div className='md:w-[33.33%] w-[30%] h-[100%] flex justify-end items-center'>
                        <div className='h-[100%] w-[60%]  hidden lg:block'>
                            <div className='w-[100%] h-[60%]  flex text-white justify-center items-center font-bold'>اوج احساسات</div>
                            <div className='w-[100%] h-[40%]  flex justify-center items-center'>
                                <div className='w-[65px] h-[38px] mr-[10px] flex justify-center items-center rounded-md bg-black/90 text-white'>
                                    فارسی
                                </div>
                                <div onClick={() => openLogin(event)} className='w-[65px] h-[38px]  flex justify-center items-center relative rounded-md text-[12px] bg-black/90 text-white'>ورود همکار
                                </div>

                            </div>
                        </div>
                        <div onClick={menu} className='h-[100%] w-[40px] flex justify-center items-center relative'>

                            <Menu className='text-white' />
                        </div>
                    </div>
                </div>
                <div className='ho w-[100%] h-[30%] shadow-2xl shadow-black  lg:flex hidden bg-black/35 justify-around items-center'>
                    <div className='flex cursor-pointer justify-center items-center  hover:text-orange-400 font-bold  h-[100%]  transition-colors duration-300  text-white'>تماس با ما</div>
                    <div className='flex cursor-pointer font-bold justify-center items-center  hover:text-orange-400 transition-colors duration-300  h-[100%]  text-white'>استخدام</div>
                    <div className='flex cursor-pointer font-bold justify-center items-center  hover:text-orange-400 transition-colors duration-300  h-[100%]  text-white'>تهران رویال هال</div>
                    <div className='flex cursor-pointer font-bold justify-center items-center   hover:text-orange-400 h-[100%] transition-colors duration-300  text-white'>مجموعه فان سنتر</div>
                    <div className='flex cursor-pointer font-bold justify-center items-center  hover:text-orange-400 transition-colors duration-300  h-[100%]  text-white'>پروژه های مسکونی </div>
                    <div className='flex cursor-pointer font-bold justify-center items-center  hover:text-orange-400 transition-colors duration-300  h-[100%]  text-white'>رستوران های مجموعه</div>
                    <div className='flex cursor-pointer justify-center items-center  hover:text-orange-400 font-bold h-[100%] transition-colors duration-300  text-white'>شعب هتل اسپیناس</div>
                    <div className='flex cursor-pointer font-bold justify-center items-center  hover:text-orange-400 transition-colors duration-300  h-[100%]  text-white'>صفحه نخست</div>
                </div>

            </div>
        </>
    )
}