const progressStatusType = {'open': 1, 'ongoing': 2, 'completed': 3};

export const ProgressSchema = {
    name: 'MyProgress',
    primaryKey: '_id',
    properties: {
      _id: "string",
      status: 'int',
      wakeupTime: 'int',
      sleepTime: 'int',
      interval:'int',
      remarks: 'string',
      tasks : 'int'
    },
  }