const chatbotSteps = [
    {
      id: '0',
      message: 'Hello!',
      trigger: '1',
    },
    {
      id: '1',
      message: 'Please write your username',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}, how can I help you?',
      trigger: '4',
    },
    {
      id: '4',
      options: [
        { value: 3, label: 'Browse products', trigger: '8' }, 
        { value: 4, label: 'Check my order status', trigger: '13' }, 
        { value: 5, label: 'Update my account information', trigger: '14' }, 
      ],

    },
    
    {
      id: '5',
      message: 'I can assist you with various tasks related to shopping. How can I assist you today?',
      trigger: '6',
    },
    {
      id: '6',
      options: [
        { value: 3, label: 'Browse products' },
        { value: 4, label: 'Check my order status' },
        { value: 5, label: 'Update my account information' },
       
      ],
      trigger: '7',
    },
    {
      id: '7',
      message: 'Sure, let me help you with that. Please select one of the following options:',
      trigger: '6',
    },
    {
      id: '8',
      message: 'You selected "Browse products." What type of products are you looking for?',
      trigger: '9',
    },
    {
      id: '9',
      user: true,
      trigger: '10',
    },
    {
      id: '10',
      message: 'Great! Here are some products matching your search:',
      trigger: '11',
    },
    {
      id: '11',
      options: [
        { value: 3, label: 'MObile' },
        { value: 4, label: 'Electronic' },
        { value: 5, label: 'Clothes' },
       
      ],
      trigger: '12',
    },
    {
      id: '12',
      message: 'If you would like to see more details or make a purchase, please select a product.',
      trigger: '11',
    },
    
    {
      id: '13',
      message: 'You selected "Check my order status." Please provide your order number:',
      trigger: '14',
    },
    {
      id: '14',
      user: true,
      trigger: '15',
    },
    {
      id: '15',
      message: 'I found your order with number {previousValue}. It is currently in transit and expected to arrive within 2 days.',
      trigger: '7',
    },
    
  ];
  
  export default chatbotSteps;
  
  