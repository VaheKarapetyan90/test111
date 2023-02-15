export const getTime = (time:any) => {
    if(!time){
        return '';
    }
    const date = new Date(time);
    const currentDate = new Date();
    const dayOfWeek = date.toLocaleDateString('en-US', {weekday: 'long'});

    let timeString;
    if (date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth() && date.getDate() === currentDate.getDate()) {
        timeString = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        
    } else if(date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth()){
        timeString = dayOfWeek;    

    }else  {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        timeString = `${year}.${month}.${day}`
    }

    return timeString;
} 