'use client'
import { ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { myContext } from './layout.jsx'
import { useRouter } from "next/navigation";
import Header from './header.jsx'
import Footer from './footer.jsx'
import moment from "moment-jalaali";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Main() {
  const router = useRouter()
  const select = useRef(null)
  const iconchev = useRef(null)
  const op = useRef(null)
  const { hotelName, setHotelName } = useContext(myContext)
  const [loading, setLoading] = useState(false)
  const pending = useRef(null)
  
  moment.loadPersian({ dialect: 'persian-modern' })

  let time = ''

  const select2 = (e) => {
    // console.log(statusHeader);


    op.current.innerText = e.target.innerText
    time = e.target.innerText
    console.log(time);




  }
  useEffect(() => {
    AOS.init({
      duration: 800,

    });
  }, []);



  const today = moment()
  const dateone = today.add(1, 'day').format('jYYYY/jMM/jDD')
  const datetwo = today.add(1, 'day').format('jYYYY/jMM/jDD')
  const datethree = today.add(1, 'day').format('jYYYY/jMM/jDD')
  const datefour = today.add(1, 'day').format('jYYYY/jMM/jDD')
  time = dateone + '-' + datetwo
  console.log(time);


  const check1 = (e) => {
    setLoading(true)
    e.target.style.background = '#f3e8e8'

    setTimeout(() => {
      router.push(`./room/${encodeURIComponent(time)}`)
    }, 3000)
    pending.current.innerText = '...در حال ارسال درخواست رزرو'

  }
  const open2 = (e) => {
    e.currentTarget.children[0].classList.toggle('dates')

  }

  const select1 = (event) => {


    select.current.innerText = event.target.innerText
    event.currentTarget.parentElement.classList.toggle('select1_state')
    iconchev.current.classList.toggle('iconchev')

    event.stopPropagation()
    setHotelName(event.target.getAttribute('data-name'))






  }
  const open1 = (e) => {
    e.currentTarget.children[0].classList.toggle('select1_state')
    iconchev.current.classList.toggle('iconchev')
  }


  return (
    <>
      <Header />
      <div className="swip w-[100%] h-[auto] flex border justify-center items-start 
        ">



        <ImageSlider />

      </div>
      <div className="w-[100%] lg:h-[70px] mt-[50px]  h-[350px]  flex justify-center items-center">
        <div data-aos='fade-down' className="w-[80%] lg:w-[90%]   h-[110%]  rounded-2xl bg-[#ececec] flex flex-wrap  justify-center items-center">

          <div onClick={open2} className="w-[470px] lg:w-[370px] h-[70px] mt-[30px] lg:mt-0 relative">
            <div className=" bg-[red] dates absolute lg:top-18 bottom-18 z-50   right-10 w-[350px] h-[auto] border z-[989999999898999898998]">
              <div onClick={select2} className="flex justify-end items-center bg-[white] pr-[5px] w-[100%] duration-300  hover:bg-[#4343ad] hover:text-[white] text-[black] h-[40px] border">{dateone + '-' + datetwo}</div>
              <div onClick={select2} className="flex text-[black] justify-end items-center bg-[white] pr-[5px] w-[100%] duration-300 hover:bg-[#4343ad] hover:text-[white] h-[40px] border">{datetwo + '-' + datethree}</div>
              <div onClick={select2} className="flex text-[black] justify-end items-center bg-[white] pr-[5px] w-[100%] duration-300 hover:bg-[#4343ad] hover:text-[white] h-[40px] border">{datethree + '-' + datefour}</div>
            </div>
            <div className="w-[90%] h-[40%]  flex justify-end ">
              یک شب <Calendar
                color="brown"
              />


            </div>
            <div className="w-[100%] h-[60%]  flex justify-center items-center   ">
              <div className="w-[80%] h-[100%] flex justify-between items-center
               border-b border-[brown]
              ">
                <ChevronLeft color="brown" />
                <span ref={op} className="text-black/75">{dateone + '-' + datetwo}</span>
              </div>

            </div>
          </div>
          <div className="w-[470px] lg:w-[370px] h-[70px]  flex justify-center mt-[30px] lg:mt-0 items-center flex-wrap">
            <div className="w-[80%]  flex justify-end">
              انتخاب هتل
              <MapPin
                size={22}
                color="brown"
              />
            </div>

            <div onClick={open1} className="select-op  w-[80%] h-[55%]  flex justify-between items-center relative">
              <div className="w-[350px] h-[auto] border select1_state bg-[white]  absolute top-10 right-0">
                <div data-name='saadat' onClick={select1} data-num='1' className="w-[100%] h-[40px] flex justify-end hover:text-[white] items-center  hover:bg-[#4343ad] duration-300  border-b text-[black]">هتل اسپیناس پالاس - سعادت آباد</div>

              </div>
              <span>
                <ChevronLeft ref={iconchev}
                  color="brown"
                  size={22} />
              </span>
              <span className="text-[black]" ref={select}>هتل اسپیناس پالاس - سعادت آباد</span>
            </div>

          </div>
          <button onClick={check1} className="lg:w-[130px] w-[350px] my-auto h-[70px] mt-[10px] lg:mt-[0px] lg:mr-2 rounded-2xl  bg-black  text-white flex justify-center items-center ">{
            'بررسی'
          }</button>
          <div ref={pending} className="w-[100%] h-[auto] text-right text-[gray]"></div>
        </div>
      </div>
      <div className="palaces w-full h-[auto] overflow-hidden  bg-[white]  mt-[50px]  flex lg:flex-nowrap flex-wrap justify-around lg:justify-between md:items-cneter items-start  ">
        <div data-aos="fade-right" className="lg:w-[300px] lg:h-[120vh] h-[130vh]  w-[430px]   ">
          <div className=" flex justify-center items-center w-[100%] h-[60%]   ">
            <img className="duration-400 transform hover:scale-103 w-[100%] h-[100%]  " src="https://espinashotels.com/wp-content/uploads/2024/09/branch_espinas_royal_hotel.jpg" alt="" />
          </div>
          <div className="w-[100%] h-[250px]  flex justify-center items-center flex-wrap">
            <strong className="font-bold text-[28px] w-[100%] flex justify-center items-center text-[black]">اسپیناس رویال (2017)</strong>
            <p className="w-[100%]  flex justify-end  items-center text-center text-gray-600">طراحی هتل اسپیناس رویال به عنوان اولین هتل با معماری نوین ایرانی اسلامی مطابق با استانداردهای پیشرفته روز دنیا، با توجه به ديد و منظره فوق العاده منطقه ولنجك به شهر تهران و كوه های البرز در زمينی به مساحت 8900 مترمربع در اين منطقه در دستور كار قرار گرفته است</p>
          </div>
          <div className="w-[100%] h-[80px] flex justify-center items-center underline"><div className=" hover:bg-[black] hover:text-[white] duration-200 w-[50%] h-[30px] border flex justify-center items-center text-[black]">
            <Link href={'#'} >اطلاعات بیشتر </Link>
          </div></div>
        </div>
        <div data-aos='fade-down' className="lg:w-[300px] lg:h-[120vh] h-[130vh]  w-[430px] ">
          <div className="  justify-center items-center w-[100%] h-[60%]  ">
            <img className="duration-400 transform hover:scale-103  w-[100%] h-[100%] " src="https://espinashotels.com/wp-content/uploads/2024/09/branch_espinas_astara_hotel.jpg" alt="" />
          </div>
          <div className="w-[100%] h-[250px]  flex justify-center items-center flex-wrap">
            <strong className="font-bold text-[28px] w-[100%] flex justify-center items-center text-[black] ">اسپیناس آستارا</strong>
            <p className="w-[100%]  flex justify-end  items-center text-center text-gray-600">هتل اسپیناس آستارا با قرار گرفتن در کنار دریاچه طبیعی آستارا، چشم اندازی تماشایی و محیطی آرام برای مهمانان فراهم آورده است. این هتل زیبایی های طبیعی و بومی این منطقه از جمله جنگل سرسبز و باطراوت و سواحل ماسه ای را در معرض توجه همگان قرار داده است</p>
          </div>
          <div className="w-[100%] h-[80px]  flex justify-center items-center underline "><div className="hover:bg-[black] hover:text-[white] duration-200 w-[50%] h-[30px] border flex justify-center items-center text-[black]">
            <Link href={'#'}>اطلاعات بیشتر </Link>
          </div></div>
        </div>
        <div data-aos='fade-down' className="lg:w-[300px] lg:h-[120vh] h-[130vh]  w-[430px] mt-3.5 lg:mt-0 ">
          <div className=" justify-center items-center w-[100%] h-[60%]">
            <img className="duration-400 transform hover:scale-103 w-[100%] h-[100%] " src="https://espinashotels.com/wp-content/uploads/2024/09/branch_espinas_international_hotel.jpg" alt="" />
          </div>
          <div className="w-[100%] h-[250px]  flex justify-center items-center flex-wrap">
            <strong className="font-bold text-[28px] w-[100%] flex justify-center items-center text-[black] ">هتل بین المللی</strong>
            <p className="w-[100%]  flex justify-end  items-center text-center text-gray-600">هتل بین المللی اسپیناس یکی از ناب ترین هتل های مرکز تهران است که با ظرافت هنرمندانه ای در این شهر جهانی جذاب توجه ها را به سوی خود جلب می کند. این هتل با تلفیق عناصر معماری مدرن واقلام طبیعی غنی، با مهارت تحسین برانگیزی احساس آرامش را القا می کند</p>
          </div>
          <div className="w-[100%] h-[80px]  flex justify-center items-center underline"><div className=" hover:bg-[black] hover:text-[white] duration-200 w-[50%] h-[30px] border flex justify-center items-center text-[black]">
            <Link href={'#'}>اطلاعات بیشتر </Link>
          </div></div>
        </div>
        <div data-aos="fade-left" className="lg:w-[300px] lg:h-[120vh] h-[140vh]  w-[430px] mt-3.5 lg:mt-0 ">
          <div className=" justify-center items-center w-[100%] h-[60%]  ">
            <img className="duration-400 transform hover:scale-103 w-[100%] h-[100%] " src="https://espinashotels.com/wp-content/uploads/2024/09/branch_espinas_palace_hotel.jpg" alt="" />
          </div>
          <div className="w-[100%] h-[250px]  flex justify-center items-center flex-wrap">
            <strong className="font-bold text-[28px] w-[100%] flex justify-center items-center text-[black]">اسپیناس پلاس</strong>
            <p className="w-[100%]  flex justify-end  items-center text-center text-gray-600">هتل اسپیناس پالاس با ارائه‌ی مجموعه ای از خدمات رفاهی و تفریحی متنوع، از بهترین هتل های تهران است. اقامت در این هتل همیشه باعث به جاماندن خاطرات فراموش نشدنی برای مهمانان خارجی و ایرانی آن بوده است. ما از اینکه در این هتل پذیرای مهمانان گرامی باشیم مفتخر خواهیم بود</p>
          </div>
          <div className="w-[100%] h-[80px]  flex justify-center items-center underline"><div className=" hover:bg-[black] hover:text-[white] duration-200 w-[50%] h-[30px] border flex justify-center items-center text-[black]">
            <Link href={'#'}>اطلاعات بیشتر </Link>
          </div></div>
        </div>
      </div>
      <section className="w-[100%] h-[auto] flex justify-center items-center flex-wrap bg-[#ececec] mt-7">
        <div className=" md:m-3 md:w-[350px] md:h-[300px] w-[95%] h-[210px]  mt-7.5 border-b border-[gray]">
          <div className="w-[100%] flex md:justify-end justify-center items-center h-[20%]   ">
            <img src="https://espinashotels.com/wp-content/uploads/2024/02/espinas_fee_icon.png" alt="" />
          </div>
          <h3 className="mt-7.5 w-[100%] h-[30px]  md:text-right text-center  text-2xl">مقرون به صرفه تر </h3>
          <div className="w-[100%] h-[40px] flex justify-center items-center">
            <p className="mt-7.5 md:w-[100%] w-[80%] h-[50px] md:text-right text-center text-gray-600">رزرو از طریق آژانس های مسافرتی هزینه بیشتری خواهد داشت. آژانس های مسافرتی هزینه خود را قبل از پرداخت برای رزرو شما کسر می کند. هتل اسپیناس همیشه مهمانانی را که مستقیماً رزرو کرده اند در اولویت قرار می دهد.

            </p>
          </div>
        </div>
        <div className=" md:m-3 md:w-[350px] md:h-[300px] w-[95%] h-[210px]   mt-7.5 border-b border-[gray]">
          <div className="w-[100%] flex md:justify-end justify-center items-center h-[20%]   ">
            <img src="https://espinashotels.com/wp-content/uploads/2024/02/espinas_loyalty_icon.png" alt="" />
          </div>
          <h3 className="mt-7.5 w-[100%] h-[30px]  md:text-right text-center  text-2xl">امتیاز برنامه وفاداری</h3>
          <div className="w-[100%] h-[40px] flex justify-center items-center">
            <p className="mt-7.5 md:w-[100%] w-[80%] h-[50px] md:text-right text-center text-gray-600">وقتی مستقیماً با هتل اسپیناس رزرو می‌کنید، برای هر رزرو امتیاز وفاداری دریافت می‌کنید. با گذشت زمان، امتیازات وفاداری اضافه می شود و می توان از آنها به عنوان تخفیف در رزروهای بعدی استفاده کرد.</p>
          </div>
        </div>
        <div className="md:m-3 md:w-[350px] md:h-[300px] w-[95%] h-[210px]   mt-7.5 border-b border-[gray]">
          <div className="w-[100%] flex md:justify-end justify-center items-center h-[20%]   ">
            <img src="https://espinashotels.com/wp-content/uploads/2024/02/espinas_stay_icon.png" alt="" />
          </div>
          <h3 className="mt-7.5 w-[100%] h-[30px] md:text-right text-center  text-2xl">سفارشی سازی </h3>
          <div className="w-[100%] h-[40px] flex justify-center items-center">
            <p className="mt-7.5 md:w-[100%] w-[80%] h-[50px] md:text-right text-center text-gray-600">اگر در طول سفر خود تولد یا سالگردی را جشن می گیرید، می توانید در زمان رزرو جزییات مناسبت خود را ذکر کنید و هتل می تواند کاری انجام دهد تا بازدید شما برای آن مناسبت خاص باشد.</p>
          </div>
        </div>
        <div className=" md:m-3 md:w-[350px] md:h-[300px] w-[95%] h-[210px]  mt-7.5 border-b border-[gray] ">
          <div className="w-[100%] flex md:justify-end justify-center items-center h-[20%]   ">
            <img src="https://espinashotels.com/wp-content/uploads/2024/02/espinas_experience_icon.png" alt="" />
          </div>
          <h3 className="mt-7.5 w-[100%] h-[30px]  md:text-right text-center  text-2xl">تجربه بهتر مهمان</h3>
          <div className="w-[100%] h-[40px] flex justify-center items-center">
            <p className="mt-7.5 md:w-[100%] w-[80%] h-[50px] md:text-right text-center text-gray-600">هنگامی که مهمانان مستقیماً با یک هتل رزرو می کنند، به احتمال زیاد تجربه شخصی را دریافت خواهند کرد. هتل ها می توانند مستقیماً با مهمانان ارتباط برقرار کنند و توصیه ها و امکانات شخصی را به آنها ارائه دهند</p>
          </div>
        </div>
        <div className=" md:m-3 md:w-[350px] md:h-[300px] w-[95%] h-[235px]  mt-7.5 border-b border-[gray] ">
          <div className="w-[100%] flex md:justify-end justify-center items-center h-[20%]   ">
            <img src="https://espinashotels.com/wp-content/uploads/2024/02/espinas_services_icon.png" alt="" />
          </div>
          <h3 className="mt-7.5 w-[100%] h-[30px]  md:text-right text-center  text-2xl">خدمات مشتری</h3>
          <div className="w-[100%] h-[40px] flex justify-center items-center">
            <p className="mt-7.5 md:w-[100%] w-[80%] h-[50px] md:text-right text-center text-gray-600">مهمانانی که اتاق خود را مستقیما از سایت رسمی هتل رزرو می نمایند مشمول قوانین استاندارد هتل می باشند و در صورت تمایل به اصلاح و یا کنسلی رزرو می توانند مستقیما با همکاران ما در ارتباط باشند. مشکلات احتمالی پیش امده برای رزروهای خارج از وب سایت رسمی اسپیناس، بر عهده هتل نمی باشد .</p>
          </div>
        </div>
        <div className=" md:m-3 md:w-[350px] md:h-[300px] w-[95%] h-[235px]  mt-7.5 border-b border-[gray] ">
          <div className="w-[100%] flex md:justify-end justify-center items-center h-[20%] ">
            <img src="https://espinashotels.com/wp-content/uploads/2024/02/espinas_booking_icon.png" alt="" />
          </div>
          <h3 className="mt-7.5 w-[100%] h-[30px]  md:text-right text-center  text-2xl">تضمین قطعی بودن رزرو</h3>
          <div className="w-[100%] h-[40px] flex justify-center items-center">
            <p className="mt-7.5 md:w-[100%] w-[80%] h-[50px] md:text-right text-center text-gray-600">بسیار بدیهیست که رزرو بیش از حد به طور منظم انجام می شود. بنابراین، رزرو بیش از حد تضمین می کند که همیشه یک مهمان دیگر برای پر کردن اتاقی که ناگهان خالی می شود وجود دارد.</p>
          </div>
        </div>

      </section>
      <section className="w-[100%] h-[auto]  flex-wrap md:flex-nowrap flex lg:justify-between justify-center items-center">
        <div className="md:w-[450px] w-[620px] md:h-[80vh]  h-[60vh] mt-3 md:mt-0 relative">
          <img className="w-full h-[100%] object-cover" src="/images/pexels-kamenczak-775219.jpg" alt="" />
          <div className="w-[100%] h-[100%] absolute top-0 left-0 bg-[black]/30 hover:bg-[black]/70 duration-300  ">
            <div className="w-[200px] h-[100%] absolute top-[50%] left-[50%] text-[white]  transform -translate-x-1/2 -translate-y-1/2 ">
              <p className="w-[100%] h-[50px]  md:mt-5 flex justify-center items-center text-sm text-[#ffa600]">آدرس شعبه </p>
              <p className="w-[100%] h-[80px]  md:mt-5 flex justify-center items-center text-[30px] text-[white] text-center">اسپیناس هتل آستارا</p>
              <p className="w-[80%] h-[80px]  md:mt-5 flex justify-center items-center text-lg text-[white] text-center ml-5">گیلان، شهر آستارا، جاده رشت به آستارا، هتل اسپیناس آستارا</p>
              <div className="w-[100%] h-[80px]  mt-5 flex justify-center items-center text-lg text-[white] text-center flex-wrap ">
                <p className="w-[100%] h-[50%]">تلفن: 02175675</p>
                <p className="w-[100%] h-[50%]">نمابر: 02175675365</p>
              </div>
              <div className=" w-[100%] h-[50px]  flex justify-center items-center md:mt-5">
                <div className="w-[150px] h-[40px] border-amber-600 border group flex justify-center items-center  hover:bg-[black]/60 duration-150" >
                  <span className="group-hover:translate-x-1.5 transform duration-150"><ChevronRight color="white" /></span>
                  <span>مسیر دسترسی</span>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="md:w-[450px] w-[620px] md:h-[80vh] h-[60vh]  mt-3 md:mt-0 relative ">
          <img className="w-full h-[100%] object-cover" src="/images/pexels-pixabay-161758.jpg" alt="" />
          <div className="w-[100%] h-[100%] absolute top-0 left-0 bg-[black]/30 hover:bg-[black]/70 duration-300 ">
            <div className="w-[200px] h-[100%] absolute top-[50%] left-[50%] text-[white]  transform -translate-x-1/2 -translate-y-1/2 ">
              <p className="w-[100%] h-[50px]  md:mt-5 flex justify-center items-center text-sm text-[#ffa600]">آدرس شعبه </p>
              <p className="w-[100%] h-[80px]  md:mt-5 flex justify-center items-center text-[30px] text-[white] text-center">اسیناس بین المللی</p>
              <p className="w-[80%] h-[80px]  md:mt-5 flex justify-center items-center text-lg text-[white] text-center ml-5">تهران، میدان ولیعصر، بلوار کشاورز، شماره 126، هتل اسپیناس بین الملل</p>
              <div className="w-[100%] h-[80px]  mt-5 flex justify-center items-center text-lg text-[white] text-center flex-wrap ">
                <p className="w-[100%] h-[50%]">تلفن: 02175675</p>
                <p className="w-[100%] h-[50%]">نمابر: 02175675365</p>
              </div>
              <div className=" w-[100%] h-[50px]  flex justify-center items-center mt-5">
                <div className="w-[150px] h-[40px] border-amber-600 border group flex justify-center items-center  hover:bg-[black]/60 duration-150" >
                  <span className="group-hover:translate-x-1.5 transform duration-150"><ChevronRight color="white" /></span>
                  <span>مسیر دسترسی</span>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="md:w-[450px] w-[620px] md:h-[80vh] h-[60vh] relative  mt-3 md:mt-0 ">
          <img className="w-full h-[100%] object-cover" src="/images/pexels-pixabay-271618.jpg" alt="" />
          <div className="w-[100%] h-[100%] absolute top-0 left-0 bg-[black]/30 hover:bg-[black]/70 duration-300 ">
            <div className="w-[200px] h-[100%] absolute top-[50%] left-[50%] text-[white]  transform -translate-x-1/2 -translate-y-1/2 ">
              <p className="w-[100%] h-[50px]  md:mt-5 flex justify-center items-center text-sm text-[#ffa600]">آدرس شعبه </p>
              <p className="w-[100%] h-[80px]  md:mt-5 flex justify-center items-center text-[30px] text-[white] text-center">اسپیناس  پالاس</p>
              <p className="w-[80%] h-[80px]  md:mt-5 flex justify-center items-center text-lg text-[white] text-center ml-5">تهران، سعادت آباد، میدان بهرود، خیابان عابدی، خیابان 33، هتل اسپیناس</p>
              <div className="w-[100%] h-[80px]  md:mt-5 flex justify-center items-center text-lg text-[white] text-center flex-wrap ">
                <p className="w-[100%] h-[50%]">تلفن: 02175675</p>
                <p className="w-[100%] h-[50%]">نمابر: 02175675365</p>
              </div>
              <div className=" w-[100%] h-[50px]  flex justify-center items-center mt-5">
                <div className="w-[150px] h-[40px] border border-amber-600 group flex justify-center items-center hover:bg-[black]/60 duration-150" >
                  <span className="group-hover:translate-x-1.5  transform duration-150"><ChevronRight color="white" /></span>
                  <span>مسیر دسترسی</span>
                </div>
              </div>

            </div></div>
        </div>
      </section>
      <section className="w-[100%] md:h-[150px]  h-[200px] bg-[#c7a17c] flex justify-center flex-col-reverse md:flex-row items-center flex-wrap md:flex-nowrap">
        <div className="md:w-[600px] w-[100%] h-[60%] ">
          <div className="w-[100%] h-[45px]  flex justify-center items-end relative">
            <input placeholder="ایمیل را وارد کنید" type="text" className="w-[100%] h-[70%] border-b focus:outline-none text-right pr-3.5 " />
            <button className=" absolute top-[14px] left-[0] w-[80px]">click

            </button>
          </div>
          <div className="w-[100%] md:h-[50%] h-[60%] text-right flex justify-end items-center ">
            <label htmlFor="">قوانین و شروط را می پذیرم</label>
            <input type="checkbox" className="ml-3.5" />
          </div>
        </div>
        <div className="md:w-[600px] w-[100%] md:h-[60%]  h-[40%]  flex justify-center items-center text-center md:text-end flex-wrap">
          <p className="w-[100%] h-[50%]">گوش به زنگ باشید </p>
          <p className="w-[100%] h-[50%] text-xl">برای دریافت پیشنهادات ویژه ما در خبرنامه ثبت نام کنید </p>
        </div>
      </section>



      <Footer />

    </>
  )
}
function ImageSlider() {
  return (
    <>
      <Swiper className="relative"
        modules={[Navigation]}
        navigation
        spaceBetween={30}
        slidesPerView={1}
      >
        <SwiperSlide >
          <img className="w-[100%] h-[100vh]" src="/images/bc1.jpg" alt="slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-[100%] h-[100vh]" src="/images/bc2.jpg" alt="slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-[100%] h-[100vh]" src="/images/bc3.jpg" alt="slide 3" />
        </SwiperSlide>
        <div className="absolute left-10 top-50 z-10  w-[100px]  h-[100px] border hidden lg:block" >
          <Image src='https://espinashotels.com/wp-content/uploads/2025/04/promotion-block-skylounge-blvd.png'
            width={100}
            alt="lg"
            height={100}
          ></Image>
        </div>
        <div className="absolute left-10 top-80 z-10 w-[100px]  h-[100px] border hidden lg:block " >
          <Image src='https://espinashotels.com/wp-content/uploads/2025/04/promotion-block-sunrise.png'
            width={100}
            alt="lg"
            height={100}
          ></Image>
        </div>
      </Swiper>


    </>
  );
}