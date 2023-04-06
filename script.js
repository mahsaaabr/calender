let darkmode=true;
const dark_btn=document.querySelector(".dark-mode-switch");
const calendar=document.querySelector(".calendar");
const calendar_day=document.querySelector(".calendar-days");
const prev=document.getElementById('prev-year');
const next=document.getElementById('next-year');
// const month_name=document.getElementById('month-name');
let year=document.getElementById('year').innerHTML;
let month_header=document.getElementById('month-picker');
let month_list=document.getElementById('month-list');
let month_list_show=true;
const month_names= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];


month_header.addEventListener('click',()=>{
    if (month_list_show){
        month_list.style.display="grid";
        month_list_show=false;
    }else{
        month_list.style.display="none";
        month_list_show=true;
    }
    
})


dark_btn.addEventListener('click',()=>{
    if(darkmode){
        calendar.style.backgroundColor="rgb(0, 42, 85)";
        calendar.style.color="white";
        dark_btn.style.justifyContent="right";
        calendar_day.classList.add("day-hover");
        dark_btn.style.border="1px solid white";
        dark_btn.style.backgroundColor="white";
        month_list.style.backgroundColor="rgb(240, 254, 255)";
        darkmode=false;
    }else{
        dark_btn.style.justifyContent="left";
        calendar_day.classList.remove("day-hover");
        dark_btn.style.border="1px solid black";
        calendar.style.backgroundColor="white";
        calendar.style.color="black";
        month_list.style.backgroundColor="white";
        darkmode=true;
    }
})






isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    console.log(currDate)
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month
    
    let first_day = new Date(year, month, 2)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() +1
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.style.display='none';
        month_list_show=true;
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

