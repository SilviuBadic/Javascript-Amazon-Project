import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export default function isWeekend(){
    let todaysDates = dayjs();
    let randomDate = todaysDates.add(4, 'days').format(`dddd`);
    console.log(randomDate);

    if(randomDate === 'Saturday' || randomDate === 'Sunday'){
      console.log(`The date is: ${randomDate}`);
      return randomDate;
    }
    else {
      console.log(`The date doesn't exist`);
    }
}
    
