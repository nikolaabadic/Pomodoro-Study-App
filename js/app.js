const calculateTime = (totalTime) => {
    document.getElementById('minuts').textContent = (Number.parseInt(totalTime/60) == 0) ? Number.parseInt(totalTime/60)+ '0:': Number.parseInt(totalTime/60)+':'
    document.getElementById('seconds').textContent = (Number.parseInt(totalTime%60) >= 0 && Number.parseInt(totalTime%60)<=9) ? '0' + Number.parseInt(totalTime%60) : Number.parseInt(totalTime%60)
}
const calculateBreakTime = (totalBreakTime,iteration) => {
    if(totalBreakTime>=0){
        document.querySelector('body').style.background = "#f9e076"
        document.getElementById('title').textContent='Break time!'
        document.getElementById('minuts').textContent = (Number.parseInt(totalBreakTime/60) == 0) ? Number.parseInt(totalBreakTime/60)+ '0:': Number.parseInt(totalBreakTime/60)+':'
        document.getElementById('seconds').textContent = (Number.parseInt(totalBreakTime%60) >= 0 && Number.parseInt(totalBreakTime%60)<=9) ? '0' + Number.parseInt(totalBreakTime%60) : Number.parseInt(totalBreakTime%60)
    } else {
        clearInterval(iteration)
    }
}
const startTheTime = ()=>{
    const start = () => {
        iteration = setInterval(()=>{
            if(totalTime>=0){
                calculateTime(totalTime)
                totalTime--
                currentTime=totalTime
            }else{
                calculateBreakTime(totalBreakTime,iteration)
                totalBreakTime--

                if(totalTime<0 && totalBreakTime<0){
                    setTimeout(()=>{window.location.replace('index.html')} , 3000)  
                }
            }        
        },1000)
    }


    let time = sessionStorage.getItem('time')
    let breakTime =  sessionStorage.getItem('breakTime')

    time = (Number.isNaN(+time) || time==='') ? 25 : time
    breakTime=(Number.isNaN(+breakTime) || breakTime==='') ? 5 : breakTime

    document.getElementById('minuts').textContent= +time+':'
    document.getElementById('seconds').textContent='00'

    let totalTime =time*60
    let totalBreakTime = breakTime*60
    let currentTime
    let iteration

    start()

    if(totalTime<0){
        start()
    }


    let ticking = true
    document.getElementById('pause').addEventListener('click',()=>{
        if(totalTime>=0){
            if(ticking){
                document.getElementById('pause').textContent='resume'
                clearInterval(iteration)
                ticking=false
            }else{
                document.getElementById('pause').textContent='pause'
                start()
                ticking=true
            }
        }    
    })

    document.getElementById('quit').addEventListener('click',()=>{
        onclick=window.location.href='index.html'
    })
}
startTheTime()