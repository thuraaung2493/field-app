export const DBConfig = {
  name: 'FieldAppDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'clients',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'phone', keypath: 'phone', options: { unique: false } },
        { name: 'nrc', keypath: 'nrc', options: { unique: true } },
        { name: 'address', keypath: 'address', options: { unique: false } },
      ],
    },
    {
      store: 'interviews',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'loanInfo', keypath: 'loanInfo', options: { unique: false } },
        {
          name: 'clientInfo',
          keypath: 'clientInfo',
          options: { unique: false },
        },
        {
          name: 'personalDetail',
          keypath: 'personalDetail',
          options: { unique: false },
        },
        {
          name: 'householdDetail',
          keypath: 'householdDetail',
          options: { unique: false },
        },
        {
          name: 'businessProfile',
          keypath: 'businessProfile',
          options: { unique: false },
        },
        {
          name: 'approvalStatus',
          keypath: 'approvalStatus',
          options: { unique: false },
        },
      ],
    },
  ],
};
