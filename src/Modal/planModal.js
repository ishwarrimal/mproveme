import { deleteSchema, getAllPlans, getAllTask, getPlan, insertPlan } from "../Schema/schema";
import { getDateIDFromDate } from "../Util/util";

const convertUItoDBModal = ({hourlyInterval, overallTime, selectedDay}) => {
    const today = new Date()
    let day = today;
    if(selectedDay === 'tomorrow'){
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate()+1); 
        day = tomorrow;
    }
    const [wakeupTime, sleepTime] = overallTime;
    totalItems = (sleepTime-wakeupTime)/hourlyInterval;

    const totalRows = Array(totalItems).fill('');
    let hour = wakeupTime-hourlyInterval;
    const newRows = totalRows.map((row, i) => {
        hour += hourlyInterval;
        return {
            id: i,
            hour: `${hour}-${hour+hourlyInterval}`,
            ideal : '',
            actual: '',
            done: false,
        }
    });

    const modalObj = {
        id: getDateIDFromDate(day),
        date: day,
        wakeupTime : String(wakeupTime),
        sleepTime : String(sleepTime),
        interval: hourlyInterval,
        remarks: '',
        tasks: newRows
    }
    
    return modalObj;
}

const convertDBtoUIModal = (data) => {
    console.log(data);
    console.log(newD);
    const taskList = newD.tasks.map(d => {
        d.key = d.id;
        return d;
    })
    newD.tasks = taskList;
    return newD;
}

export const saveMyPlan = async planObj => {
    try{
        const planModalObj = convertUItoDBModal(planObj);
        const resp = await insertPlan(planModalObj);
        return {status: true, msg: resp};
    }catch(e){
        return {status: false, msg: e};
    }
    
}

export const getMyPlans = async (date) => {
    try{
        const dateId = getDateIDFromDate(date);
        let myPlansList = await getPlan(dateId);
        return myPlansList;
        // return convertDBtoUIModal(myPlansList);
    }catch(e){
        return { status: false, msg: e}
    }
}