import Realm from 'realm';

// const mockData = {
//     id: 'unique',
//   date: '04-04-2022',
//   status: 'open',
//   wakeupTime: '5:30',
//   sleepTime: '23',
//   interval: '1',
//   remarks: 'today was a productive day, I went out on a date with my gf also did a lot of work. I am happy with my day.',
//   tasks: { 
//     '6-7' : {
//       ideal: 'string',
//       actual: 'string',
//       done: 'boolean' 
//       },
//     '7-8' : {
//       ideal: 'string',
//       actual: 'string',
//       done: 'boolean' 
//     },
//     '8-9' : {
//       ideal: 'string',
//       actual: 'string',
//       done: 'boolean' 
//     }
//   }}

export const MYPLAN_SCHEMA = 'MyPlan';
export const TASKS_SCHEMA = 'MyTasks';

export const MyPlanSchema = {
    name: MYPLAN_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'string', //'dd-mm-yyyy'
        date: 'date',
        wakeupTime: 'string',
        sleepTime: 'string',
        interval: 'int',
        remarks: 'string',
        tasks: {type: 'list', objectType: TASKS_SCHEMA}
    }
}

export const TaskSchema = {
    name: TASKS_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        hour: {type: 'string'},
        ideal: {type: 'string'},
        actual: {type: 'string'},
        done: {type: 'bool', default: false}
    }
}

const databaseOption = {
    path: 'MProveme',
    schema: [TaskSchema, MyPlanSchema],
    schekaVersion: 0
}

export const insertTask = newTask => new Promise((resolve, reject) => {
    Realm.open(databaseOption).then(realm => {
        realm.write(() => {
            realm.create(TASKS_SCHEMA, newTask);
            resolve(newTask)
        })
    }).catch(e => reject(e));
})

export const updateTask = myNewTask => new Promise((resolve, reject) => {
    Realm.open(databaseOption).then(realm => {
        realm.write(() => {
            let updatedTask = realm.objectForPrimaryKey(TASKS_SCHEMA, myNewTask.id);
            updatedTask = {...updatedTask, ...myNewTask};
            resolve(updatedTask);
        })
    }).catch(e => reject(e))
})

export const deleteTask = myTaskId => new Promise((resolve, reject) => {
    Realm.open(databaseOption).then(realm => {
        realm.write(() => {
            let myTask = realm.objectForPrimaryKey(TASKS_SCHEMA, myTaskId);
            realm.delete(myTask);
            resolve(true)
        })
    }).catch(e => reject(e))
})

export const deleteAllTask = () => new Promise((resolve, reject) => {
    Realm.open(databaseOption).then(realm => {
        realm.write(() => {
            let allTask = realm.objects(TASKS_SCHEMA);
            realm.delete(allTask);
            resolve(true)
        })
    }).catch(e => reject(e))
})

export const getAllTask = () => new Promise((resolve, reject) => {
    Realm.open(databaseOption).then(realm => {
        let allTask = realm.objects(TASKS_SCHEMA);
        resolve(allTask)
    }).catch(e => reject(e))
})

export const getTask = myTaskId => new Promise((resolve, reject) => {
    Realm.open(databaseOption).then(realm => {
        let myTask = realm.objectForPrimaryKey(TASKS_SCHEMA, myTaskId);
        resolve(myTask)
    }).catch(e => reject(e))
})

export const insertPlan = myNewPlan => new Promise((resolve, reject) => {
    Realm.open(databaseOption).then(realm => {
        realm.write(() => {
            realm.create(MYPLAN_SCHEMA, myNewPlan);
            resolve(myNewPlan)
        })
    }).catch(e => reject(e));
})

export const updatePlan = myNewPlan => new Promise((resolve, reject) => {
    Realm.open(databaseOption).then(realm => {
        realm.write(() => {
            let updatedPlan = realm.objectForPrimaryKey(MYPLAN_SCHEMA, myNewPlan.id);
            updatedPlan = {...updatedPlan, ...myNewPlan};
            resolve(updatedPlan);
        })
    }).catch(e => reject(e))
})

export const deletePorgress = myPlanId => new Promise((resolve, reject) => {
    Realm.open(databaseOption).then(realm => {
        realm.write(() => {
            let myPlan = realm.objectForPrimaryKey(MYPLAN_SCHEMA, myPlanId);
            realm.delete(myPlan);
            resolve(true)
        })
    }).catch(e => reject(e))
})

export const deleteAllPorgress = () => new Promise((resolve, reject) => {
    Realm.open(databaseOption).then(realm => {
        realm.write(() => {
            let allPlan = realm.objects(MYPLAN_SCHEMA);
            realm.delete(allPlan);
            resolve(true)
        })
    }).catch(e => reject(e))
})

export const getAllPlans = () => new Promise((resolve, reject) => {
    Realm.open(databaseOption).then(realm => {
        let allPlan = realm.objects(MYPLAN_SCHEMA);
        resolve(allPlan)
    }).catch(e => reject(e))
})

export const getPlan = myPlanId => new Promise((resolve, reject) => {
    Realm.open(databaseOption).then(realm => {
        let myPlan = realm.objectForPrimaryKey(MYPLAN_SCHEMA, myPlanId);
        resolve(myPlan)
    }).catch(e => reject(e))
})

export const deleteSchema = () => {
    Realm.deleteFile(databaseOption);
}

export default new Realm(databaseOption);