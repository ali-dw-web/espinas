'use client'
import { Menu, Router } from "lucide-react";
import { useEffect, useRef, useState } from "react"
import { useContext } from "react"
import { User } from 'lucide-react'
import { myContext } from "../../layout"
import React from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Room({ time }) {
    const { hotelName, setHotelName } = useContext(myContext)
    const [color, setColor] = useState(1)
    const [list, setList] = useState(null)
    const [selectedRoom, setselectedRoom] = useState([])
    const [price, setPrice] = useState(null)
    const error = useRef()
    const success = useRef()
    const router = useRouter()
    const [voucher, setVoucher] = useState([
        {
            name: '',
            lastName: '',
            idNumber: '',
            mobile: '',
            trackingNumber: parseInt((Math.random()) * 100000000000)

        }
    ])
    const roomRefs = useRef([])
    const loading = useRef()
    const [reserverinfo, setReserverinfo] = useState([
        {
            name: '',
            lastName: '',
            idNumber: '',
            mobile: '',


        }
    ])
    const input = useRef([])
    useEffect(() => {
        roomRefs.current = [];
    }, [selectedRoom]);

    useEffect(() => {

        if (hotelName == 'saadat') {
            fetch('https://68dab56d23ebc87faa310681.mockapi.io/room')
                .then(res => res.json())
                .then(val => {
                    setList(val)
                    if (loading.current) {
                        loading.current.style.display = 'none'
                    }
                })
        }
    })



    useEffect(() => {
        let total = 0
        selectedRoom.map((val) => {


            total += (Number(val.price)) * (Number(val.noRoom))

            setPrice(total)

        })

    }, [selectedRoom]);






    function orders(val) {

        const orders = {

            name: val.name,
            price: val.price,
            noRoom: 1,




        }








        if (selectedRoom.length == 0) {
            setselectedRoom((pre) => [...pre, orders])
        } else {
            const status = selectedRoom.some(s => s.name == orders.name && s.price == orders.price)
            if (status) {
                error.current.children[1].innerText = 'اتاق فعلی انتخاب شده'
                error.current.style.right = '10px'
                error.current.style.opacity = '1'
                setTimeout(() => {

                    error.current.style.right = '-400px'
                    error.current.style.opacity = '0'
                }, 3000)
            } else {
                setselectedRoom((pre) => [...pre, orders])
            }
        }

    }
    function recheck() {
        setVoucher([
            {
                name: '',
                lastName: '',
                idNumber: '',
                mobile: '',

            }
        ])


    }
    function roomNo(val, event) {
        const state = event.target.innerText
        setselectedRoom((prev) => {
            return prev.map((i) => {
                if (i.name === val.name && i.price === val.price) {
                    let noRooom = i.noRoom
                    if (state == '+') {
                        if (noRooom >= 5) {
                            error.current.children[1].innerText = 'انتخاب بیش از 5 اتاق مقدور نیست '
                            error.current.style.right = '10px'
                            error.current.style.opacity = '1'
                            setTimeout(() => {

                                error.current.style.right = '-400px'
                                error.current.style.opacity = '0'
                            }, 3000)
                        } else {
                            noRooom++
                        }
                    } else {
                        if (noRooom <= 1) {
                            error.current.children[1].innerText = 'با کلیک روی X گزینه را حذف کنید'
                            error.current.style.right = '10px'
                            error.current.style.opacity = '1'
                            setTimeout(() => {

                                error.current.style.right = '-400px'
                                error.current.style.opacity = '0'
                            }, 3000)
                        } else {
                            noRooom--
                        }
                    }
                    return { ...i, noRoom: noRooom }
                }
                return i
            })
        })

    }
    function removeSelectedItem(val) {
        setselectedRoom((prev) => {
            return prev.filter(r => r.name !== val.name && r.price !== val.price)
        })
    }
    function makeReservation() {
        if (selectedRoom.length == 0) {
            error.current.children[1].innerText = 'هیچ اتاقی انتخاب نشده!'
            error.current.style.right = '10px'
            error.current.style.opacity = '1'
            setTimeout(() => {

                error.current.style.right = '-400px'
                error.current.style.opacity = '0'
            }, 3000)

        } else {
            setColor(2)
        }
    }
    function focused(event) {

        event.target.nextElementSibling.style.top = '-13%'
        event.target.style.border = '1px solid gray'
        if (!(event.target.nextElementSibling.nextElementSibling.innerText = '') || !(event.target.nextElementSibling.nextElementSibling.innerText = null)) {
            event.target.nextElementSibling.nextElementSibling.innerText = ''
        }

    }
    function focus(event) {
        event.target.nextElementSibling.style.top = '-13%'
        event.target.parentElement.style.border = '1px solid gray'
        console.log(event.target.parentElement.parentElement.children[2]);


        if (!(event.target.parentElement.parentElement.children[2] == '') || !(event.target.parentElement.parentElement.children[2] == null)) {
            event.target.parentElement.parentElement.children[2].innerText = ''
        }
    }

    useEffect(() => {
        AOS.init({
            duration: 800,

        });
    }, []);

    function key() {


        if (event.target.getAttribute('name') == 'firstName' || event.target.getAttribute('name') == 'lastName') {
            if (event.keyCode >= 96 && event.keyCode <= 105 || [50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 192, 49].includes(event.keyCode)) {
                event.preventDefault()
            }
        } else if (event.target.getAttribute('name') == 'idNumber' || event.target.getAttribute('name') == 'mobile') {
            if ((event.keyCode >= 65 && event.keyCode <= 90) || [219, 220, 221, 188, 190, 191, 192, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 49].includes(event.keyCode)) {
                event.preventDefault()
            }
        }

    }
    let flag = 0
    function reg() {
        let check2 = ''
        let check = ''
        let newD = { ...reserverinfo[0] }
        input.current.map((val) => {
            console.log(val.getAttribute('name'));
            let type = val.getAttribute('name')

            if (val.value == '' || val.value == null) {
                val.style.border = '1px solid red'
                val.nextElementSibling.nextElementSibling.innerText = 'اطلاعات را تکمیل کنید '
                check2 += '2'
            } else {
                if (type == 'firstName' || type == 'lastName') {
                    let x = val.value.search(/[a-z?><":|}{~!@#$%^&*()_+}script><]/)
                    if (x >= 0) {
                        val.style.border = '1px solid red'
                        val.nextElementSibling.nextElementSibling.innerText = 'اطلاعات صحیح نمیباشد'
                        check2 += '2'
                    } else {
                        val.style.border = '1px solid gray'
                        val.nextElementSibling.nextElementSibling.innerText = ''
                        check2 += '1'
                        if (type == 'firstName') {

                            setVoucher((prev) => [
                                { ...prev[0], name: val.value },
                                ...prev.slice(1)
                            ]);
                        } else {

                            setVoucher((prev) => [
                                { ...prev[0], lastName: val.value },
                                ...prev.slice(1)
                            ]);
                        }
                    }
                } else if (type == 'idNumber') {
                    let r = val.value.length
                    if (!(r == 10)) {
                        val.style.border = '1px solid red'
                        val.nextElementSibling.nextElementSibling.innerText = 'کد ملی صحیح نمیباشد '
                        check2 += '2'

                    } else {
                        val.style.border = '1px solid gray'
                        val.nextElementSibling.nextElementSibling.innerText = ''
                        check2 += '1'

                        setVoucher((prev) => [
                            { ...prev[0], idNumber: val.value },
                            ...prev.slice(1)
                        ]);

                    }
                } else {
                    let z = val.value.length
                    if (!(z == 11) || !(val.value.search(/[0]/)) == 0 || !(val.value.search(/[9]/)) == 1) {
                        val.style.border = '1px solid red'
                        val.nextElementSibling.nextElementSibling.innerText = 'شماره معتبر نمیباشد '
                        check2 += '2'
                    } else {
                        val.style.border = '1px solid gray'
                        val.nextElementSibling.nextElementSibling.innerText = ''
                        check2 += '1'

                        setVoucher((prev) => [
                            { ...prev[0], mobile: val.value },
                            ...prev.slice(1)
                        ]);

                    }
                }
            }

        })


        roomRefs.current.map((val) => {

            let baby = val.children[1].children[1].children[0].children[0].children[0].value
            let teen = val.children[1].children[1].children[0].children[1].children[0].value
            let adult = val.children[1].children[1].children[0].children[2].children[0].value
            let error = val.children[1].children[1].children[1].children[2]
            let guestName = val.children[1].children[1].children[1].children[1].children[0].value
            let guestLastName = val.children[1].children[1].children[1].children[0].children[0].value
            let roomName = val.children[0].children[1].innerText
            let price = val.children[2].innerText
            if (guestName == '' || guestName == null || guestLastName == '' || guestLastName == null || guestName.search(/[a-z@!#$%^&*()_+?><":/*<>script1234567890]/) >= 0
                || guestLastName.search(/[a-z@!#$%^&*()_+?><":/*<>script1234567890]/) >= 0) {
                error.style.display = 'flex'
                val.children[1].children[1].children[1].children[1].style.border = '1px solid red'
                val.children[1].children[1].children[1].children[0].style.border = '1px solid red'
                check += '2'
            } else {
                error.style.display = 'none'
                val.children[1].children[1].children[1].children[1].style.border = '1px solid gray'
                val.children[1].children[1].children[1].children[0].style.border = '1px solid gray'
                check += '1'
            }
        })


        if (check.search(/[2]/) >= 0 || check2.search(/[2]/) >= 0) {


            error.current.children[1].innerText = 'اطلاعات را به درستی تکمیل کنید '
            error.current.style.right = '10px'
            error.current.style.opacity = '1'
            setTimeout(() => {

                error.current.style.right = '-400px'
                error.current.style.opacity = '0'
            }, 3000)
        } else {
            roomRefs.current.map((val) => {


                let baby = val.children[1].children[1].children[0].children[0].children[0].value
                let teen = val.children[1].children[1].children[0].children[1].children[0].value
                let adult = val.children[1].children[1].children[0].children[2].children[0].value
                let error = val.children[1].children[1].children[1].children[2]
                let guestName = val.children[1].children[1].children[1].children[1].children[0].value
                let guestLastName = val.children[1].children[1].children[1].children[0].children[0].value
                let roomName = val.children[0].children[1].innerText
                let price = val.children[2].innerText
                const prevoucher = {
                    baby: baby,
                    teen: teen,
                    adult: adult,
                    guestName: guestName,
                    guestLastName: guestLastName,
                    roomName: roomName,
                    price: price,
                    time: time,

                }
                setVoucher((prev) => [...prev, prevoucher])
            })
            setColor(3)
        }



        console.log(voucher);
    }
    const hint = (event) => {
        event.target.children[0].style.width = '300px'
        event.target.children[0].style.border = '1px solid green'
        setTimeout(() => {
            event.target.children[0].style.width = '0px'
            event.target.children[0].style.border = '0px solid white'
        }, 4000);
    }

    function blur(event) {
        if (event.target.value == '' || event.target.value == null) {
            event.target.nextElementSibling.style.top = '50%'

        } else {
            event.target.nextElementSibling.style.top = '-13%'
        }
    }
    function sendServer() {
        const Reservations = {
            voucher
        }
        fetch('https://6905eef4ee3d0d14c1342d8b.mockapi.io/rooms', {
            method: 'POST',
            body: JSON.stringify(Reservations),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    if (success.current) {
                        success.current.style.right = '10px'
                        success.current.style.opacity = '1'
                        setTimeout(() => {
                            success.current.style.right = '-600px'
                            success.current.style.opacity = '0'
                            router.push('../')

                        }, 3000)
                    }

                }
            })



    }


    return (
        <>

            <section className="w-[100%] relative">
                <div ref={loading} className=" bg-[white] w-[100%] h-[100vh] fixed top-0 right-0 flex z-50 justify-center items-center">
                    <img className="w-[35px] h-[35px]" src="/images/icons8-loading.gif" alt="" />
                </div>
                <div ref={error} className={" duration-500 opacity-0 bg-[#282828] mt-[180px] w-[280px] rounded-[8px] overflow-hidden h-[95px] border fixed  z-50 bottom-[10px] right-[-400px] border-[gray] mx-auto"}>
                    <div className="w-[100%]  h-[25px]  flex justify-center items-center">
                        <div className="w-[15%] h-[100%]  flex justify-center items-center icofont-close-line text-[#9c9a9a]"></div>
                        <div className="w-[70%] h-[100%] flex justify-end items-center pt-1  text-[15px] text-[#e4e4e4] ">اخطار</div>
                        <div className="w-[15%] h-[100%]  flex justify-center items-center text-[#bd473d] icofont-close-circled"></div>
                    </div>
                    <div dir="rtl" className="h-[50px] w-[85%] mx-auto text-[12px] flex justify-center items-center text-[#b8b8b8] ">اطلاعات را به درستی تکمیل کنید</div>
                    <div className="w-[100%] h-[4px] bg-[red] absolute bottom-0 left-0"></div>
                </div>



                {color == 1 ? <section className="overflow-hidden  w-[100%] h-[50px] border bg-[#484848] flex justify-end items-center">

                    <div className="w-[80px] h-[100%] flex justify-center items-center ">
                        <Menu color="white" />
                    </div>

                </section> : null}
                <section style={color == 1 ? { height: '120px' } : { height: '70px', display: 'flex ', justifyContent: 'center ', alignItems: 'center', flexWrap: 'wrap', background: 'white' }} className="w-[100%]   border-b border-[#b1aeae57] bg-[#f2f2f2] ">
                    <div style={color === 1 ? { display: 'flex' } : { display: 'none' }} className="w-[100%] h-[50%] border-b flex justify-center items-center text-[black] ">{decodeURIComponent(time).toLocaleString('IR-fa')}</div>
                    <div className="w-[100%] h-[30%] flex justify-center items-center  ">
                        <div
                            className="w-[130px] h-[1px] border border-[#a3a3a3] flex justify-center items-center">
                            <div style={color === 4 ? { background: 'green' } : null} className=" bg-[#a3a3a3] flex justify-center items-center w-[30px] h-[30px] rounded-[50%]">4</div>
                        </div>
                        <div className="w-[130px] h-[1px] border border-[#a3a3a3] flex justify-center items-center">
                            <div style={color === 3 ? { background: 'green' } : null} className=" bg-[#a3a3a3] flex justify-center items-center w-[30px] h-[30px] rounded-[50%]">3</div>
                        </div>
                        <div style={color === 2 ? { borderColor: 'green' } : null} onClick={makeReservation} className="w-[130px] h-[1px] border border-[#a3a3a3] flex justify-center items-center">
                            <div onClick={recheck} style={color === 2 ? { background: 'green' } : null} className=" bg-[#a3a3a3] flex justify-center items-center w-[30px] h-[30px] rounded-[50%]">2</div>
                        </div>
                        <div style={color === 1 ? { borderColor: 'green' } : null} onClick={() => setColor(1)} className="w-[130px]  h-[1px] border border-[#a3a3a3] flex justify-center items-center">
                            <div style={color === 1 ? { background: 'green' } : null} className=" bg-[#a3a3a3] flex justify-center items-center w-[30px] h-[30px] rounded-[50%]">1</div>

                        </div>
                    </div>
                    <div className="w-[100%] h-[20%]   flex justify-center items-center ">
                        <div style={color === 4 ? { color: 'green' } : null} className="text-[#a3a3a3] w-[130px] h-[100%]  flex justify-center items-center">دریافت واچر</div>
                        <div style={color === 3 ? { color: 'green' } : null} className="text-[#a3a3a3] w-[130px] h-[100%] flex justify-center items-center">تایید و پرداخت</div>
                        <div style={color === 2 ? { color: 'green' } : null} className=" text-[#a3a3a3] w-[130px] h-[100%]  flex justify-center items-center">تکمیل اطلاعات </div>

                        <div style={color === 1 ? { color: 'green' } : null} className=" text-lg text-[#a3a3a3] w-[130px] h-[100%]  flex justify-center items-center">انتخاب اتاق</div>

                    </div>
                </section>
                <section style={color == 1 ? { height: '73vh' } : { height: 'auto' }} className="w-[100%] h-[73vh] border   relative">


























                    <div style={color === 1 ? { display: 'flex' } : { display: 'none' }} className="w-[100%] h-[100%] bg-[#f2f2f2]   top-0 left-0 justify-center items-center">
                        <div className="w-[28%] h-[100%] hidden lg:block">
                            <div className="w-[100%] mx-[auto] h-[47%] flex justify-center items-center  relative ">
                                <img className="w-[100%] mt-1  h-[100%]" src={hotelName === 'saadat' ? 'http://files.netminder.ir/app-harrisnewtech-ir--images//9e5f330623c64fd3a7033ce7d726c109.jpg' : null} alt="" />
                                <div className=" absolute w-[100%] h-[30px] bg-[black]/70 bottom-0 left-0 flex justify-center items-center">
                                    <div className="w-[40%] h-[80%]  flex justify-center items-center ">⭐⭐⭐⭐⭐</div>
                                    <div className="mx-auto w-[70%] h-[100%]  text-[white] flex items-center justify-center ">سعادت آباد - تهران</div>
                                </div>
                            </div>




                            <div className="w-[100%] h-[50%]  mt-2 overflow-y-scroll scroll-width-none ">
                                {selectedRoom.length == 0 ? <div className=" mx-auto w-[98%] shadow-[0_0px_5px_rgba(0,0,0,0.2)] h-[95%] bg-[#ffffff] rounded-[10px]  text-[100px]">
                                    <div className="w-[100%] h-[50%]  icofont-prestashop text-[#807e7eea] text-[90px] flex items-center justify-center "></div>
                                    <div className="w-[100%] h-[50%]  flex items-start justify-center text-[20px] text-[#cda357]">هیچ اتاقی انتخاب نشده !</div>
                                </div> : null}
                                {selectedRoom.map((val, i) => {
                                    const price = Number(val.price).toLocaleString("fa-IR")
                                    return (
                                        <div key={'pre' + i} className=" mx-auto shadow-[0_0px_5px_rgba(0,0,0,0.2)]  group w-[98%] h-[90px] border-b rounded-[10px] mt-2.5  border-[#bdb8b894]  flex justify-around items-center  bg-[white]">
                                            <div className="w-[30%] h-[100%]  flex justify-around items-center" >
                                                <div className="w-[30px] h-[30px]  flex justify-center items-center ">
                                                    <div onClick={() => roomNo(val, event)} className="w-[27px] h-[27px] hover:bg-[#61bafac7]   bg-[#4fb7ff] cursor-pointer flex justify-center items-center text-[22px] rounded-[5px]">+</div>
                                                </div>
                                                <div className="w-[35px] h-[30px] pointer-events-none flex justify-center items-center text-[17px] text-[black]"> اتاق{val.noRoom}</div>
                                                <div className="w-[30px] h-[30px]  flex justify-center items-center ">
                                                    <div onClick={() => roomNo(val, event)} className="w-[27px] h-[27px] hover:bg-[#5cb9fcc7]  bg-[#4fb7ff] flex justify-center text-[22px] items-center cursor-pointer rounded-[5px]">-</div>
                                                </div>
                                            </div>
                                            <div className=" w-[70%] h-[100%]  " >
                                                <div onClick={() => removeSelectedItem(val)} className=" icofont-brand-nexus w-[100%] h-[15px] text-[red] flex justify-end pt-1 pr-1    opacity-0 group-hover:opacity-100 duration-100"></div>
                                                <p className="w-[95%] h-[20px] text-[black] mt-3.5 flex justify-end items-center text-[13px] ">{val.name}</p>
                                                <p className="w-[95%] h-[20px]  text-[black]  flex items-center justify-end text-[13px]">(صبحانه)</p>
                                                <p className="w-[95%] h-[20px]  flex justify-end items-center text-[13px] text-[black]">{price}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div style={selectedRoom.length === 0 ? { display: 'none' } : { display: 'flex' }} className=" mx-auto shadow-[0_0px_5px_rgba(0,0,0,0.2)] text-[20px] text-black mt-1.5 w-[98%] h-[50px]  rounded-[8px] bg-[#ffffff]  justify-center items-center">
                                    <div className="  w-[30%] h-[100%] flex justify-center items-center text-[20px]">{Number(price).toLocaleString('fa-IR')}</div>

                                    <div className="w-[70%] direction-ltr h-[100%]  flex justify-center items-center  whitespace-nowrap overflow-hidden text-[15px]"> ...................................    جمع کل</div>
                                </div>
                                <div onClick={makeReservation} style={selectedRoom.length === 0 ? { display: 'none' } : { display: 'flex' }} className=" text-[20px] text-white mt-1.5 w-[100%] h-[50px] border rounded-[8px] bg-[#28a745]  justify-center items-center">ثبت رزرو</div>
                            </div>
                        </div>



                        <div className="lg:w-[70%] w-[90%] h-[100%]  overflow-y-scroll scroll-width-none lg:block flex-wrap  flex justify-center items-center">
                            {list?.map((val, i) => {
                                const price = Number(val.price).toLocaleString("fa-IR")
                                return (
                                    <React.Fragment key={i}>
                                        <div key={'p' + i} className=" border group shadow-[0_0px_5px_rgba(0,0,0,0.2)] lg:ml-6 mt-3.5 w-[95%] md:w-[85%] lg:h-[230px] h-[auto]  border-[#bdb8b894]  bg-[white] rounded-[5px]">
                                            <div className="w-[100%] border-b border-[#bdb8b894] h-[45px] lg:h-[15%]   flex justify-end pr-1.5 text-[20px] items-center text-[black]">{val.name}</div>
                                            <div className="w-[100%] lg:h-[70%] md:h-[250px] h-[auto]  lg:flex-nowrap flex-row-reverse  flex-wrap flex justify-center items-center ">
                                                <div className="lg:w-[25.33%] md:w-[50%] w-[80%] lg:h-[100%] h-[60%]  flex items-center justify-center">
                                                    <div className=" rounded-tl-2xl border-[4px] border-[#80808031] group-hover:bg-[#d4cbcb] duration-150 rounded-br-2xl  w-[95%] md:h-[90%] h-[135px] flex justify-center items-center">
                                                        <img className=" rounded-tl-2xl rounded-br-2xl w-[98%] md:h-[98%] h-[100%] object-cover" src={val.img} alt="" />
                                                    </div>
                                                </div>
                                                <div className="lg:w-[50.33%] md:w-[50%] lg:h-[100%] lg:border-b-0 border-b  md:h-[60%] md:border-r border-[#bdb8b894] w-[100%] h-[60px]  flex justify-around items-center">
                                                    <div className="w-[50%] h-[100%] flex justify-center items-center relative text-[black] ">{price}
                                                        <div className="w-[80%] h-[30px]  text-[red] absolute top-[5%] md:top-[30%] right-0 flex justify-center text-[15px]  items-center line-through">{(Number(val.price) + 1800000).toLocaleString("fa-IR")}</div>
                                                    </div>
                                                    <div className="text-[black] w-[50%] h-[100%] flex justify-center items-center ">برای یک شب</div>
                                                </div>
                                                <div className=" flex-wrap border-r border-[#bdb8b894]  lg:w-[25.33%] w-[100%]  lg:h-[100%] md:h-[40%] h-[50px]  flex justify-around items-center  ">
                                                    <div onClick={() => orders(val)}
                                                        className="w-[120px] h-[30px]  flex justify-center cursor-pointer items-center rounded-[3px] bg-[#4fb7ff]">ثبت رزرو</div>
                                                    <div className="w-[120px] h-[30px]  rounded-[3px] bg-[#ff4232] text-[14px] flex justify-center items-center md:bg-[#76abe3]">قیمت شب های دیگر</div>
                                                </div>
                                            </div>
                                            <div className="w-[100%] h-[100px] md:h-[50px] lg:h-[15%] border-t border-[#bdb8b894]  md:flex-row flex-col-reverse flex justify-center items-center flex-wrap md:flex-nowrap">
                                                <div className="w-[100%] md:h-[100%] h-[50%]  flex md:justify-center justify-around  items-center">
                                                    <div className="w-[33.33%] h-[100%]  flex justify-center items-center border-r border-[#bdb8b894]">
                                                        <span className="text-[#161616] text-[15px] pr-1.5">نفر اضافه</span>
                                                        <span className="icofont-users-alt-3 text-[20px] text-[gray] icofont-bed"></span>
                                                    </div>
                                                    <div className="w-[33.33%] h-[100%]  flex justify-center items-center border-r border-[#bdb8b894]">
                                                        <span className="text-[#161616] text-[15px] pr-1.5">صبحانه</span>
                                                        <span className="icofont-users-alt-3 text-[20px] text-[gray] icofont-spoon-and-fork"></span>
                                                    </div>
                                                    <div className="w-[33.33%] h-[100%]  flex justify-center items-center border-r border-[#bdb8b894]">
                                                        <span className="text-[gray] text-[15px] pr-1.5">{val.noPeople}</span>
                                                        <span className="icofont-users-alt-3 text-[20px] text-[gray]"></span>
                                                    </div>
                                                </div>
                                                <div className=" w-[100%] md:w-[30%] h-[50%] md:border-b-0 border-b border-[#bdb8b894] md:h-[100%]  flex justify-end items-center">
                                                    <span className="text-[black]">ندارد :</span>
                                                    <span className="text-[gray] pr-1.5 md:border-0 ">نوع سرویس اضافه </span>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })}

                        </div>














                    </div>











































                    <div style={color === 2 ? { display: 'flex' } : { display: 'none' }} className="w-[100%] h-[auto-]  absolute top-0 left-0  justify-center items-center bg-[#f2f2f2] ">
                        <div className=" md:w-[auto] w-[100%] [@media(min-width:1250px)]:w-[1050px] flex-wrap md:flex-nowrap flex flex-col-reverse md:flex-row justify-center md:justify-between items-center md:items-start ">
















                            <div className="  [@media(min-width:1150px)]:mr-3.5 sm:w-[75%] w-[95%]  md:w-[370px] [@media(min-width:1150px)]:w-[650px]  md:mt-4 mt-[155px] md:mr-2  h-[auto] ">
                                <p className="w-[100%] h-[50px]   flex justify-end items-center text-[20px] text-[black]">اطلاعات شخص رزرو کننده</p>






                                <div className="w-[100%]   bg-[white] mt-3.5 rounded-xl border border-[#a3a1a1cb] flex justify-between items-center flex-wrap  ">

                                    <div className="w-[45%] h-[35px]  relative z-40  text-[right] mt-5">
                                        <input ref={(el) => (input.current[0] = el)} autoComplete="off" name="lastName" onKeyDown={key} onBlur={blur} onFocus={() => focused(event)} dir="rtl" type="text" className="border text-[black] border-[#7a7979ce] w-[100%] h-[100%] text-[right] focus:outline-[blue] rounded-[5px] focus:shadow-[0_0px_5px_rgba(0,0,255,0.9)]  " />
                                        <div className=" bg-[white] z-10  duration-150    top-[50%] right-[0%] transform translate-y-[-50%] absolute mr-1.5 flex justify-center items-center  ">
                                            <div className="    text-[11px] flex justify-end items-center mr-1 text-[black]">نام خانوادگی(اجباری)</div>
                                            <div className="h-[100%] w-[10px] flex justify-center items-center text-[black] icofont-ui-user"></div>
                                        </div>
                                        <div className="w-[100%] h-[15px]  text-[red] flex justify-end text-[12px] items-center mt-1"></div>
                                    </div>
                                    <div className="w-[45%] h-[35px]  relative text-[right] mt-5">
                                        <input ref={(el) => (input.current[1] = el)} autoComplete="off" name="firstName" onKeyDown={key} onBlur={blur} onFocus={() => focused(event)} dir="rtl" type="text" className="border border-[#7a7979ce] w-[100%] h-[100%] text-[right] focus:outline-[blue] text-[black] rounded-[5px] focus:shadow-[0_0px_5px_rgba(0,0,255,0.9)]  " />
                                        <div className=" bg-[white]  duration-150   top-[50%] right-[0%] transform translate-y-[-50%] absolute mr-1.5 flex justify-center items-center  ">
                                            <div className="   text-[11px] flex justify-end items-center text-[black] ">نام (اجباری)</div>
                                            <div className="h-[100%] w-[20%] flex justify-center items-center  icofont-ui-user text-[black]"></div>
                                        </div>
                                        <div className="w-[100%] h-[15px]  text-[red] flex justify-end items-center text-[12px] mt-1"></div>
                                    </div>
                                    <div className="w-[45%] h-[35px]  relative text-[right] mt-[35px]">
                                        <input ref={(el) => (input.current[2] = el)} autoComplete="off" name="mobile" onKeyDown={key} onBlur={blur} onFocus={() => focused(event)} dir="rtl" className="border border-[#7a7979ce] w-[100%] h-[100%] text-[right] text-[black] focus:outline-[blue] rounded-[5px] focus:shadow-[0_0px_5px_rgba(0,0,255,0.9)]  " />
                                        <div className=" bg-[white]  duration-150 w-[100px] top-[50%] right-[0%] transform translate-y-[-50%] absolute mr-1.5 flex justify-center items-center  ">
                                            <div className="    text-[11px] flex justify-end items-center text-[black]">موبایل (اجباری)</div>
                                            <div className="h-[100%] w-[20%] flex justify-center items-center text-[black] icofont-smart-phone"></div>
                                        </div>
                                        <div className="w-[100%] h-[15px]  text-[red] flex justify-end items-center text-[12px] mt-1"></div>
                                    </div>
                                    <div className="w-[45%] h-[35px]  relative text-[right] mt-[35px]">
                                        <input ref={(el) => (input.current[3] = el)} autoComplete="off" onKeyDown={key} name="idNumber" onBlur={blur} onFocus={() => focused(event)} dir="rtl" type="text" className="border border-[#7a7979ce] w-[100%] h-[100%] text-[right] focus:outline-[blue] text-[black] rounded-[5px] focus:shadow-[0_0px_5px_rgba(0,0,255,0.9)]  " />
                                        <div className=" bg-[white]  duration-150 w-[100px]   top-[50%] right-[0%] transform translate-y-[-50%] absolute mr-1.5 flex justify-center items-center  ">
                                            <div className="text-[11px] flex justify-end items-center text-[black]">کد ملی (اختیاری)</div>
                                            <div className="h-[100%] w-[20%] flex justify-center text-[black] items-center icofont-ui-v-card"></div>
                                        </div>
                                        <div className="w-[100%] h-[15px]  text-[red] flex justify-end items-center text-[12px] mt-1"></div>
                                    </div>
                                    <div className="w-[45%] h-[35px]  relative text-[right] mt-[35px]">
                                        <input autoComplete="off" name="email" onBlur={blur} onFocus={() => focused(event)} dir="rtl" type="text" className="border border-[#7a7979ce] w-[100%] h-[100%] text-[right] focus:outline-[blue] rounded-[5px] focus:shadow-[0_0px_5px_rgba(0,0,255,0.9)] text-[black] " />
                                        <div className=" bg-[white]  duration-150 w-[100px]   top-[50%] right-[0%] transform translate-y-[-50%] absolute mr-1.5 flex justify-center items-center  ">
                                            <div className="   text-[11px] flex justify-end items-center text-[black]">ایمیل (اختیاری)</div>
                                            <div className="h-[100%] w-[20%] flex justify-center items-center text-[black] icofont-email"></div>
                                        </div>
                                        <div className="w-[100%] h-[15px]  text-[red] text-[12px] flex justify-end items-center mt-1"></div>
                                    </div>
                                    <div className="w-[100%]  h-[60px] border mt-4.5 bg-[#f8d648] rounded-[5px] flex justify-center items-center text-[black]">لطفأ در واردکردن شماره موبایل دقت کنید، زیرا ما از این طریق رزروتان را پیگیری خواهیم کرد</div>

                                </div>

                                <div className="w-[100%]  h-[30px] mt-3.5 flex justify-end items-center text-[20px] text-[black]">توضیحات لازم در انتخاب رده سنی</div>
                                <div className="w-[100%] h-[45px] border rounded-[5px] border-[#b6b6b6c5] bg-[#ffffff] flex justify-end items-center">
                                    <div className="w-[100px]  text-[12px] h-[95%] flex justify-center items-center rounded-[5px] mr-1 bg-[#f7c9b7]">نوزاد:زیر 2 سال </div>
                                    <div className="w-[100px]   text-[12px] h-[95%] flex justify-center items-center rounded-[5px]  mr-1 bg-[#f7c9b7]">کودک: بین 2-4 سال </div>
                                    <div className="w-[100px] h-[95%] text-[12px] flex justify-center items-center rounded-[5px] mr-3.5 bg-[#f7c9b7]">بزرگسال:بالای 4 سال </div>
                                </div>
                                <div className=" mt-2 w-[100%] h-[40px]  flex justify-end items-center">
                                    <div className="w-[auto] h-[100%] flex justify-center items-center text-[13px] text-[black]">(مشحص کردن نفرات هر اتاق )</div>
                                    <div className="  w-[auto] h-[100%]  flex justify-center items-center  text-[18px] text-[black]">لیست اتاق ها </div>
                                </div>
                                <div className="w-[100%] h-[auto]  bg-[#f2f2f2] rounded-[5px] ">
                                    {selectedRoom.map((val, i) => {
                                        return Array.from({ length: val.noRoom }).map((_, z) => {
                                            const index = flag++
                                            return (
                                                <React.Fragment key={z}>
                                                    <div ref={(el) => {
                                                        if (el) roomRefs.current[index] = el;
                                                    }} className=" duration-150 w-[100%] bg-[#ffffff] mt-3.5 rounded-[5px] border border-[#a3a3a3] ">
                                                        <div className="w-[100%] border-b border-[#8b8b8be0] h-[auto] md:flex-row flex-col-reverse flex justify-center items-center md:flex-nowrap flex-wrap">
                                                            <div className="[@media(min-width:1150px)]:w-[30%] md:w-[50%] w-[100%] h-[50px]  flex justify-center items-center
                                                ">
                                                                <div className="w-[33.33%] h-[100%] ">
                                                                    <div className="w-[100%] h-[50%]  flex justify-center items-center icofont-users-alt-3 text-[#4c4b4bc9]"></div>
                                                                    <div className="w-[100%] h-[50%]  flex justify-center items-centertext-[black]">2نفر</div>
                                                                </div>
                                                                <div className="w-[33.33%] h-[100%] ">
                                                                    <div className="w-[100%] h-[50%]  flex justify-center items-center icofont-spoon-and-fork text-[#4c4b4bc9]"></div>
                                                                    <div className="w-[100%] h-[50%]  flex justify-center items-center text-[black]">صبحانه</div>
                                                                </div>
                                                                <div className="w-[33.33%] h-[100%] ">
                                                                    <div className="w-[100%] h-[50%] flex justify-center items-center icofont-bed text-[#4c4b4bc9]"></div>
                                                                    <div className="w-[100%] h-[50%]  flex justify-center items-center text-[black]">2نفر</div>
                                                                </div>

                                                            </div>
                                                            <div className=" gigar font-bold [@media(min-width:1150px)]:w-[70%] md:w-[50%] w-[100%] h-[50px]  flex justify-end  text-[22px] pr-2.5 items-center text-[black]">{val.name}</div>
                                                        </div>
                                                        <div className="w-[100%] h-[auto]  flex justify-center items-center [@media(min-width:1150px)]:flex-nowrap flex-wrap">
                                                            <div className="[@media(min-width:1150px)]:w-[50%]    w-[100%] h-[100px] [@media(min-width:1150px)]:border-1  border-b border-[#8b8888ee]  ">
                                                                <div className=" text-[black] w-[100%] h-[50%]  flex justify-center items-center">
                                                                    ?دراتاق فردی با تابعیت خارجی وجود دارد
                                                                </div>
                                                                <div className="w-[100%] h-[50%]  flex justify-center items-center">
                                                                    <input name="foreigner" type="radio" />
                                                                    <label className="mr-2 text-[black]" htmlFor="">خیر</label>
                                                                    <input name="foreigner " type="radio" />
                                                                    <label className="text-[black]" htmlFor="">بله </label>
                                                                </div>
                                                            </div>
                                                            <div className="[@media(min-width:1150px)]:w-[50%] w-[100%] h-[130px]  ">
                                                                <div className="w-[100%] h-[50%]  flex justify-around items-center">
                                                                    <div className="w-[25%] h-[40px] border border-[#969494] rounded-[5px] relative">
                                                                        <select className="w-[100%] h-[100%] text-[black]" name="baby" id="">
                                                                            <option value="0">0</option>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                        </select>
                                                                        <div className=" flex justify-center items-c text-[black]enter absolute top-[-13%] text-[black] right-0 text-[13px]  h-[14px] bg-[#ffffff]">نوزاد</div>
                                                                    </div>
                                                                    <div className="w-[25%] h-[40px]  rounded-[5px] relative border border-[#969494]">
                                                                        <select className="w-[100%] h-[100%] text-[black]" name="teen" id="">
                                                                            <option className="text-[black]" value="0">0</option>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>

                                                                        </select>
                                                                        <div className=" flex justify-center items-center absolute top-[-13%] right-0 text-[13px]  h-[14px] bg-[#ffffff] text-[black]">کودک</div>
                                                                    </div>
                                                                    <div className="w-[25%] h-[40px] border border-[#969494] rounded-[5px] relative">
                                                                        <select className="w-[100%] h-[100%] text-[black]" name="adult" id="">

                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                        </select>
                                                                        <div className=" flex justify-center items-center absolute top-[-13%] right-0 text-[13px]  h-[14px] bg-[#ffffff] text-[black]">بزرگسال</div>
                                                                    </div>

                                                                </div>
                                                                <div className="w-[100%] h-[50%] relative  flex justify-around items-start ">
                                                                    <div className=" mt-[8px] w-[40%] h-[32px] rounded-[5px]  border-[#949191e1] border relative">
                                                                        <input onBlur={blur} onFocus={() => focus(event)} dir="rtl" className=" text-[black]  w-[100%] h-[100%] focus:outline-[blue] rounded-[5px] focus:shadow-[0_0px_5px_rgba(0,0,255,0.9)]" type="text" />
                                                                        <div className=" duration-150 ico-ui-fontuser mr-1.5  absolute text-[11px]  top-[50%] right-[0%] bg-[white] transform translate-y-[-50%] flex justify-center items-center text-[black]">نام خانوادگی</div>
                                                                    </div>
                                                                    <div className=" mt-[8px] w-[40%] h-[32px] rounded-[5px] border-[#6e6d6dd0] border relative">
                                                                        <input onBlur={blur} onFocus={() => focus(event)} dir="rtl" className=" 
                                                         w-[100%] focus:outline-[blue] text-[black] rounded-[5px] focus:shadow-[0_0px_5px_rgba(0,0,255,0.9)] h-[100%]" type="text" />
                                                                        <div className="mr-1.5  absolute  top-[50%] right-[0%] transform translate-y-[-50%] duration-150 bg-[white] flex justify-center items-center text-[11px] icofont-ui-user text-[black]">نام میهمان اصلی</div>
                                                                    </div>
                                                                    <div className=" hidden justify-end items-center text-[red] error w-[100%] h-[20px]  bottom-0 right-0 absolute text-[black]">
                                                                        اطلاعات به درستی تکمیل نشده
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="w-[100%] h-[45px] text-[black] bg-[#03a9f4] flex justify-start items-center text-[17px] pl-3">{(Number(val.price).toLocaleString('fa-IR'))} تومان</div>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        })
                                    })}
                                </div>
                                <div className="w-[100%] h-[60px] flex justify-end items-center mt-2.5">
                                    <div onClick={() => setColor(1)} className="  text-[white] w-[190px] h-[100%]  bg-[#28a745] rounded-[5px] flex justify-center items-center ">
                                        <div className="w-[80%] h-[100%]  text-[black] flex justify-center items-center text-[black]">افزودن اتاق های بیشتر</div>
                                        <div className="w-[20%] h-[100%]  flex justify-center items-center icofont-plus text-[black]"></div>
                                    </div>
                                </div>







                            </div>
                            <div className=" sm:w-[75%] w-[95%]  md:w-[370px] mt-[35px]    [@media(min-width:1250px)]:w-[400px]  h-[auto] ">
                                <figure className="w-[100%]  h-[260px] relative">
                                    <img className=" rounded-tr-[7px] rounded-tl-[7px] object-cover w-[100%] h-[100%]" src={hotelName === 'saadat' ? 'http://files.netminder.ir/app-harrisnewtech-ir--images//9e5f330623c64fd3a7033ce7d726c109.jpg' : null} alt="" />
                                    <div className="w-[100%] h-[30px] bg-[black]/80 absolute bottom-0 right-0 flex justify-center items-center">
                                        <div className="w-[30%] h-[100%] flex justify-center items-center">⭐⭐⭐⭐⭐</div>
                                        <div className="w-[70%] h-[100%] text-[white]  flex justify-end items-center pr-3.5 text-[black]">هتل اسپیناس پالاس</div>
                                    </div>
                                </figure>
                                <div className="w-[100%] h-[100px]  bg-[#ffffff] ">
                                    <div className="w-[100%] h-[50%]  flex justify-end text-right items-center ">
                                        <div className=" text-[black] w-[100%] h-[100%] ">33rd Alley, Abedi Street, Behroud Sq., Saadat Abad, Tehran, Iran</div>
                                        <div className="w-[15px] h-[100%] mr-2 text-[25px] icofont-location-pin"></div>
                                    </div>
                                    <div className="w-[100%] h-[50%] text-[black] flex justify-center items-center">
                                        <a className="text-[blue]" target="_blank" href="https://www.google.com/maps/place/35%C2%B047'35.7%22N+51%C2%B021'22.8%22E/@35.7932567,51.3537608,17z/data=!3m1!4b1!4m4!3m3!8m2!3d35.7932567!4d51.3563357?entry=ttu&g_ep=EgoyMDI1MTAxMy4wIKXMDSoASAFQAw%3D%3D">مشاهده بر روی نقشه</a>
                                    </div>
                                    <div className="time w-[100%] text-[black] h-[40px] flex justify-center items-center bg-[#ffffff]">{decodeURIComponent(time)}</div>
                                    <div className="time w-[100%] h-[35px]   bg-[#ffffff] flex justify-center items-center">
                                        <div className="w-[50%] border-r border-[black] text-[black] h-[100%]  flex justify-center items-center text-[22px] ">{(Number(price).toLocaleString('fa-IR'))}</div>
                                        <div className="w-[50%] h-[100%] text-[20px]  font-bold flex text-[black] justify-center items-center text-[black]">جمع کل</div>

                                    </div>
                                    <div onClick={reg} className='w-[100%] rounded-xl h-[70px] text-[22px] flex justify-center pointer items-center mt-3 bg-[#28a745]'>ثبت رزرو</div>
                                </div>
                            </div>
                        </div>
                    </div>













































                    <div style={color === 3 ? { display: 'flex' } : { display: 'none' }} className="w-[100%] bg-[#f2f2f2]   absolute top-0 left-0 justify-center ">
                        <div ref={success} className={" duration-500 opacity-0 bg-[#282828] mt-[180px] w-[320px] rounded-[8px] overflow-hidden h-[95px] border fixed  z-50 bottom-[10px] right-[-400px] border-[gray] mx-auto"}>
                            <div className="w-[100%]  h-[25px]  flex justify-center items-center">
                                <div className="w-[15%] h-[100%]  flex justify-center items-center icofont-close-line text-[#9c9a9a]"></div>
                                <div className="w-[70%] h-[100%] flex justify-end items-center pt-1  text-[15px] text-[#e4e4e4] ">موفق</div>
                                <div className="w-[15%] h-[100%]  flex justify-center items-center text-[#0ba005] icofont-close-circled"></div>
                            </div>
                            <div dir="rtl" className="h-[50px] w-[85%] mx-auto text-[12px] flex justify-center items-center text-[#b8b8b8] ">سفارش شما ثبت شد در حال بازگشت به صفحه اصلی ...</div>
                            <div className="w-[100%] h-[4px] bg-[#03991c] absolute bottom-0 left-0"></div>
                        </div>
                        <div className="md:w-[800px] w-[95%] bg-[white]  border border-[gray] mt-8 rounded-[8px] overflow-hidden shadow-[0_0px_5px_rgba(0,0,0,0.2)]">
                            <div className=" pr-3 text-[18px] text-[white] w-[100%] h-[45px] bg-[#03a9f4] flex justify-end items-center ">اطلاعات رزرو</div>
                            <div className="w-[100%] h-[200px]  flex justify-center items-center">
                                <img src="https://espinashotels.com/wp-content/uploads/2024/02/espinas_top_logo_black.png" alt="" />
                            </div>
                            <div className="w-[100%] h-[35px]  flex justify-center items-center mt-2.5 ">
                                <div className=" text-[13px] w-[150px] flex justify-center items-center text-[black] h-[100%] ">{hotelName == 'saadat' ? 'اسیپیناس پالاس' : 'اسپیناس پالاس آستارا'}</div>
                                <div className="w-[60%] h-[100%] overflow-hidden text-[black]">.........................................................................................................................................................................................................</div>
                                <div className=" w-[150px] h-[100%]  flex justify-center items-center text-[black]">هتل</div>
                            </div>
                            <div className="w-[100%] h-[35px]  flex justify-center items-center mt-2.5 ">
                                <div className=" text-[13px] w-[150px] flex justify-center items-center  h-[100%] text-[black]">{time.substring(0, 10)}</div>
                                <div className="w-[60%] h-[100%] overflow-hidden text-[black]">.........................................................................................................................................................................................................</div>
                                <div className=" w-[150px] h-[100%]  flex justify-center items-center text-[black]">تاریخ ورود</div>
                            </div>
                            <div className="w-[100%] h-[35px]  flex justify-center items-center mt-2.5 ">
                                <div className=" text-[13px] w-[150px] flex justify-center items-center  h-[100%] text-[black]">{time.substring(11, 22)}</div>
                                <div className="w-[60%] h-[100%]  overflow-hidden text-[black]">.........................................................................................................................................................................................................</div>
                                <div className=" w-[150px] h-[100%]  flex justify-center items-center text-[black]">تاریخ خروج </div>
                            </div>
                            <div className="w-[100%] h-[35px]  flex justify-center mt-2.5 items-center ">
                                <div className=" text-[13px] w-[150px] flex justify-center items-center  h-[100%] text-[black]">1شب</div>
                                <div className="w-[60%] h-[100%] overflow-hidden text-[black]">.........................................................................................................................................................................................................</div>
                                <div className=" w-[150px] h-[100%]  flex justify-center items-center text-[black]">مدت</div>
                            </div>
                            <div className="w-[100%] h-[35px]  flex justify-center items-center mt-2.5 ">
                                <div className=" text-[13px] w-[150px] flex justify-center items-center  h-[100%] text-[black]">{voucher[0].name + ' ' + voucher[0].lastName}</div>
                                <div className="w-[60%] h-[100%] overflow-hidden text-[black]">.........................................................................................................................................................................................................</div>
                                <div className=" w-[150px] h-[100%]  flex justify-center items-center text-[black]">نام</div>
                            </div>
                            <div className="w-[100%] h-[35px]  flex justify-center items-center mt-2.5 ">
                                <div className=" text-[13px] w-[150px] flex justify-center items-center  h-[100%] text-[black]">{voucher[0].mobile}</div>
                                <div className="w-[60%] h-[100%] overflow-hidden text-[black]">.........................................................................................................................................................................................................</div>
                                <div className=" w-[150px] h-[100%]  flex justify-center items-centertext-[black] text-[black]">موبایل</div>
                            </div>
                            <div className="w-[100%] h-[35px]  flex justify-center items-center mt-2.5 ">
                                <div className=" text-[13px] w-[150px] flex justify-center items-center  h-[100%] text-[black]">{voucher[0].trackingNumber}</div>
                                <div className="w-[60%] h-[100%] overflow-hidden text-[black]">.........................................................................................................................................................................................................</div>
                                <div className=" w-[150px] h-[100%]  flex justify-center items-centertext-[black] text-[black]">کد پیگیری</div>
                            </div>




                            <div className="w-[100%] h-[auto]  mt-1.5">
                                <div className=" w-[100%] mt-[10px] h-[70px] border border-[green] flex justify-center items-center">
                                    <div className="w-[33.33%] h-[100%] border-r  border-[white] bg-[#428bca] flex justify-center items-center text-[20px] font-bold text-[black]"> جمع کل</div>
                                    <div className="w-[33.33%] h-[100%] border border-[gray] bg-[#428bca]">
                                        <div className="w-[100%] border-b border-[white] h-[50%] flex justify-center items-center text-[black]">نفر</div>
                                        <div className="w-[100%] h-[50%] flex justify-center items-center">
                                            <div className="w-[33.33%] border-r h-[100%] border-[white] flex justify-center items-center text-[black]">نوزاد</div>
                                            <div className="w-[33.33%]  h-[100%] border-[white] flex justify-center items-center text-[black]">کودک</div>
                                            <div className="w-[33.33%] border-l h-[100%] border-[white] flex justify-center items-center text-[black]">بزرگسال </div>
                                        </div>
                                    </div>
                                    <div className="w-[33.33%] h-[100%] text-[20px] border-l bg-[#428bca] border-[white]  flex justify-center items-center text-[black]">نوع اتاق</div>
                                </div>
                                {voucher.map((val, i) => {
                                    if (!(i == 0)) {
                                        return (
                                            <React.Fragment key={i}>

                                                <div className="w-[100%] h-[70px] border border-[black] flex justify-center items-center">
                                                    <div className="w-[33.33%] h-[100%] flex justify-center items-center text-[green] font-bold text-[black]">{val.price}</div>
                                                    <div className="w-[33.33%]   h-[100%] flex justify-center items-center">
                                                        <div className="w-[33.33%] h-[100%] border-[gray] border-r border-l flex justify-center items-center text-[black]">{val.baby}</div>
                                                        <div className="w-[33.33%] h-[100%]  flex justify-center items-center text-[black]">{val.teen}</div>
                                                        <div className="w-[33.33%] h-[100%] border-[gray] border-r border-l flex justify-center items-center text-[black]">{val.adult}</div>
                                                    </div>
                                                    <div onClick={() => {
                                                        console.log(voucher);

                                                    }} className="w-[33.33%] h-[100%] flex justify-center items-center text-[20px] font-bold text-[black]">{val.roomName}</div>
                                                </div>

                                            </React.Fragment>
                                        )
                                    }
                                })}
                            </div>








                            <div className="w-[100%] h-[35px]  flex justify-center items-center mt-2.5 ">
                                <div className=" text-[13px] text-[black] w-[150px] text-[green] flex justify-center items-center  h-[100%] ">{price && price.toLocaleString('fa-IR')}تومان</div>
                                <div className="w-[60%] h-[100%]  overflow-hidden text-[black]">.........................................................................................................................................................................................................</div>
                                <div className=" w-[150px] h-[100%]  flex justify-center items-center text-[black]">جمع کل</div>
                            </div>

                            <div className="w-[100%] h-[35px]  mt-2.5 flex justify-center items-center ">
                                <div className=" text-[15px] font-bold text-[black] w-[150px] text-[green] flex justify-center items-center  h-[100%] ">{price && price.toLocaleString('fa-IR')}تومان</div>
                                <div className="w-[60%] h-[100%] overflow-hidden text-[black]">.........................................................................................................................................................................................................</div>
                                <div className=" w-[150px] font-bold text-[15px] h-[100%]  flex justify-center items-center text-[black]">قابل پرداخت</div>
                            </div>
                            <div className="w-[100%] h-[150px]   flex justify-center items-center">
                                <div onClick={sendServer} className="w-[250px] h-[80px] border  border-[green] bg-[#d9f2fd] rounded-[5px]">
                                    <div className="w-[100%] h-[50%] text-[18px] text-[black] flex justify-center text-[green] font-bold items-center ">{price && price.toLocaleString('fa-IR')}تومان</div>
                                    <div className="w-[100%] h-[50%]   text-[green] flex justify-center items-center  ">
                                        <div className="w-[30%] h-[100%]  flex justify-end items-center icofont-pay text-[30px]"></div>
                                        <div className="w-[70%] h-[100%]  flex justify-center items-center text-[black]">پرداخت و دریافت واچر</div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>



                    <div style={color === 4 ? { display: 'block' } : { display: 'none' }} className="w-[100%] h-[100%] border border-amber-950 absolute top-0 left-0">4</div>
                </section>
            </section>

        </>
    )
}
