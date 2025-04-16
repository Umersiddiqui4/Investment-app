export const installmentsData = [
    {
      id: 1,
      name: "Tech Innovations",
      customer: {
        id: 101,
        name: "Alex Johnson",
        email: "alex@techinnovations.com",
        image:
          "https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1lbiUyMHBvcnRyYWl0fGVufDB8fDB8fHww",
      },
      totalAmount: 250000,
      currency: "USD",
      status: "paid",
      startDate: "2025-01-15",
      endDate: "2025-07-15",
      duration: 6,
      completedMonths: 6,
      investors: [
        {
          id: 1,
          name: "John Smith",
          image:
            "https://static.vecteezy.com/system/resources/thumbnails/032/712/071/small/a-young-african-american-man-in-a-brown-t-shirt-poses-against-a-gray-background-man-looking-at-camera-ai-generative-photo.jpg",
          contribution: 150000,
          percentage: 60,
        },
        {
          id: 2,
          name: "Sarah Johnson",
          image:
            "https://media.istockphoto.com/id/1081381240/photo/young-smiling-african-american-man-over-white-background.jpg?s=612x612&w=0&k=20&c=T2Mq5yJ93H5jvbI87tC5RjXuGcmDdTH4GzcyOL_WRl4=",
          contribution: 100000,
          percentage: 40,
        },
      ],
      payments: [
        {
          month: 1,
          date: "2025-02-15",
          amount: 41666,
          status: "paid",
        },
        {
          month: 2,
          date: "2025-03-15",
          amount: 41666,
          status: "paid",
        },
        {
          month: 3,
          date: "2025-04-15",
          amount: 41666,
          status: "paid",
        },
        {
          month: 4,
          date: "2025-05-15",
          amount: 41666,
          status: "paid",
        },
        {
          month: 5,
          date: "2025-06-15",
          amount: 41666,
          status: "paid",
        },
        {
          month: 6,
          date: "2025-07-15",
          amount: 41670,
          status: "paid",
        },
      ],
    },
    {
      id: 2,
      name: "Green Energy",
      customer: {
        id: 102,
        name: "Maria Garcia",
        email: "maria@greenenergy.com",
        image: "/placeholder.svg?height=80&width=80",
      },
      totalAmount: 180000,
      currency: "USD",
      status: "active",
      startDate: "2025-02-01",
      endDate: "2025-08-01",
      duration: 6,
      completedMonths: 2,
      investors: [
        {
          id: 3,
          name: "Michael Chen",
          image: "/placeholder.svg?height=60&width=60",
          contribution: 90000,
          percentage: 50,
        },
        {
          id: 4,
          name: "Emma Williams",
          image: "/placeholder.svg?height=60&width=60",
          contribution: 90000,
          percentage: 50,
        },
      ],
      payments: [
        {
          month: 1,
          date: "2025-03-01",
          amount: 30000,
          status: "paid",
        },
        {
          month: 2,
          date: "2025-04-01",
          amount: 30000,
          status: "paid",
        },
        {
          month: 3,
          date: "2025-05-01",
          amount: 30000,
          status: "due",
        },
        {
          month: 4,
          date: "2025-06-01",
          amount: 30000,
          status: "pending",
        },
        {
          month: 5,
          date: "2025-07-01",
          amount: 30000,
          status: "pending",
        },
        {
          month: 6,
          date: "2025-08-01",
          amount: 30000,
          status: "pending",
        },
      ],
    },
    {
      id: 3,
      name: "Quantum labs",
      customer: {
        id: 103,
        name: "David Brown",
        email: "david@quantumlabs.com",
        image: "/placeholder.svg?height=80&width=80",
      },
      totalAmount: 350000,
      currency: "USD",
      status: "active",
      startDate: "2025-03-10",
      endDate: "2026-03-10",
      duration: 12,
      completedMonths: 1,
      investors: [
        {
          id: 5,
          name: "Lisa Garcia",
          image: "/placeholder.svg?height=60&width=60",
          contribution: 140000,
          percentage: 40,
        },
        {
          id: 6,
          name: "Robert Taylor",
          image: "/placeholder.svg?height=60&width=60",
          contribution: 105000,
          percentage: 30,
        },
        {
          id: 7,
          name: "Jennifer Lee",
          image: "/placeholder.svg?height=60&width=60",
          contribution: 105000,
          percentage: 30,
        },
      ],
      payments: [
        {
          month: 1,
          date: "2025-04-10",
          amount: 29166,
          status: "paid",
        },
        {
          month: 2,
          date: "2025-05-10",
          amount: 29166,
          status: "due",
        },
        {
          month: 3,
          date: "2025-06-10",
          amount: 29166,
          status: "pending",
        },
        // More payments...
      ],
    },
    {
      id: 4,
      name: "Startup 4",
      customer: {
        id: 104,
        name: "Customer 4",
        email: "customer4@example.com",
        image: "/placeholder.svg?height=80&width=80"
      },
      totalAmount: 200000,
      currency: "USD",
      status: "paid",
      startDate: "2025-04-01",
      endDate: "2025-10-01",
      duration: 6,
      completedMonths: 4,
      investors: [
        {
          id: 10,
          name: "Investor 1",
          image: "/placeholder.svg?height=60&width=60",
          contribution: 50000,
          percentage: 50
        },
        {
          id: 11,
          name: "Investor 2",
          image: "/placeholder.svg?height=60&width=60",
          contribution: 50000,
          percentage: 50
        }
      ],
      payments: [
        {
          month: 1,
          date: "2025-04-01",
          amount: 33333,
          status: "paid"
        },
        {
          month: 2,
          date: "2025-05-01",
          amount: 33333,
          status: "paid"
        },
        {
          month: 3,
          date: "2025-05-31",
          amount: 33333,
          status: "due"
        },
        {
          month: 4,
          date: "2025-06-30",
          amount: 33333,
          status: "pending"
        },
        {
          month: 5,
          date: "2025-07-30",
          amount: 33333,
          status: "pending"
        },
        {
          month: 6,
          date: "2025-08-29",
          amount: 33333,
          status: "pending"
        }
      ]
    },
    {
      id: 5,
      name: "Startup 5",
      customer: {
        id: 105,
        name: "Customer 5",
        email: "customer5@example.com",
        image: "/placeholder.svg?height=80&width=80"
      },
      totalAmount: 150000,
      currency: "USD",
      status: "due",
      startDate: "2025-04-01",
      endDate: "2025-12-01",
      duration: 8,
      completedMonths: 4,
      investors: [
        {
          id: 10,
          name: "Investor 1",
          image: "/placeholder.svg?height=60&width=60",
          contribution: 50000,
          percentage: 50
        },
        {
          id: 11,
          name: "Investor 2",
          image: "/placeholder.svg?height=60&width=60",
          contribution: 50000,
          percentage: 50
        }
      ],
      payments: [
        {
          month: 1,
          date: "2025-04-01",
          amount: 18750,
          status: "paid"
        },
        {
          month: 2,
          date: "2025-05-01",
          amount: 18750,
          status: "paid"
        },
        {
          month: 3,
          date: "2025-05-31",
          amount: 18750,
          status: "due"
        },
        {
          month: 4,
          date: "2025-06-30",
          amount: 18750,
          status: "pending"
        },
        {
          month: 5,
          date: "2025-07-30",
          amount: 18750,
          status: "pending"
        },
        {
          month: 6,
          date: "2025-08-29",
          amount: 18750,
          status: "pending"
        },
        {
          month: 7,
          date: "2025-09-28",
          amount: 18750,
          status: "pending"
        },
        {
          month: 8,
          date: "2025-10-28",
          amount: 18750,
          status: "pending"
        }
      ]
    },
    {
      id: 6,
      name: "Startup 6",
      customer: {
        id: 106,
        name: "Customer 6",
        email: "customer6@example.com",
        image: "/placeholder.svg?height=80&width=80"
      },
      totalAmount: 150000,
      currency: "USD",
      status: "paid",
      startDate: "2025-04-01",
      endDate: "2025-12-01",
      duration: 8,
      completedMonths: 6,
      investors: [
        {
          id: 10,
          name: "Investor 1",
          image: "/placeholder.svg?height=60&width=60",
          contribution: 50000,
          percentage: 50
        },
        {
          id: 11,
          name: "Investor 2",
          image: "/placeholder.svg?height=60&width=60",
          contribution: 50000,
          percentage: 50
        }
      ],
      payments: [
        {
          month: 1,
          date: "2025-04-01",
          amount: 18750,
          status: "paid"
        },
        {
          month: 2,
          date: "2025-05-01",
          amount: 18750,
          status: "paid"
        },
        {
          month: 3,
          date: "2025-05-31",
          amount: 18750,
          status: "paid"
        },
        {
          month: 4,
          date: "2025-06-30",
          amount: 18750,
          status: "paid"
        },
        {
          month: 5,
          date: "2025-07-30",
          amount: 18750,
          status: "paid"
        },
        {
          month: 6,
          date: "2025-08-29",
          amount: 18750,
          status: "paid"
        },
        {
          month: 7,
          date: "2025-09-28",
          amount: 18750,
          status: "pending"
        },
        {
          month: 8,
          date: "2025-10-28",
          amount: 18750,
          status: "pending"
        }
      ]
    }
    
  ];

export const userData =  {
  username: "Imran Tauqeer",
  email: "owner@gmail.com",
  contact: "0333-1234567",
  cnicNumber: "42201-1234567-1",
  password: "owner123",
  cnicFront: "https://im.indiatimes.in/facebook/2017/Nov/pakistan-began-issuing-citizenship-to-chinese-people_1509706416_1509706428.jpg?w=1200&h=900&cc=1&webp=1&q=75",
  cnicBack: "https://online.theunitedinsurance.com/Admin_files/Images/cnic-back-side.jpg",
  profile: "https://laqpnneqguatxachbvsw.supabase.co/storage/v1/object/public/restaurant-images/images/WhatsApp%20Image%202025-04-16%20at%2011.33.20.jpeg",
}

export const sellItemsData = [
  {
    id: 1,
    itemName: "Quantum Computing Server",
    itemImage: "/placeholder.svg?height=100&width=100",
    customerName: "Alex Johnson",
    customerImage: "/placeholder.svg?height=60&width=60",
    investorName: "Sarah Williams",
    investorImage: "/placeholder.svg?height=60&width=60",
    date: "2025-04-10",
    rate: 12.5,
    status: "active",
    guarantors: [
      {
        id: 101,
        name: "Michael Chen",
        image: "/placeholder.svg?height=60&width=60",
        role: "Primary Guarantor",
      },
      {
        id: 102,
        name: "Emma Davis",
        image: "/placeholder.svg?height=60&width=60",
        role: "Secondary Guarantor",
      },
    ],
    investors: [
      {
        id: 201,
        name: "Sarah Williams",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 150000,
        percentage: 60,
      },
      {
        id: 202,
        name: "David Brown",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 100000,
        percentage: 40,
      },
    ],
    totalAmount: 250000,
    currency: "USD",
    description:
      "Next-generation quantum computing server with advanced cooling system and quantum bit stabilization.",
    installments: [
      {
        month: 1,
        date: "2025-01-10",
        amount: 62500,
        status: "paid",
      },
      {
        month: 2,
        date: "2025-02-10",
        amount: 62500,
        status: "paid",
      },
      {
        month: 3,
        date: "2025-03-10",
        amount: 62500,
        status: "late",
      },
      {
        month: 4,
        date: "2025-04-10",
        amount: 62500,
        status: "late",
      },
    ],
    completedPayments: 2,
    totalPayments: 4,
  },
  {
    id: 2,
    itemName: "Neural Interface Headset",
    itemImage: "/placeholder.svg?height=100&width=100",
    customerName: "Maria Garcia",
    customerImage: "/placeholder.svg?height=60&width=60",
    investorName: "Robert Taylor",
    investorImage: "/placeholder.svg?height=60&width=60",
    date: "2025-03-22",
    rate: 15.8,
    status: "active",
    guarantors: [
      {
        id: 103,
        name: "James Wilson",
        image: "/placeholder.svg?height=60&width=60",
        role: "Primary Guarantor",
      },
      {
        id: 104,
        name: "Sophia Lee",
        image: "/placeholder.svg?height=60&width=60",
        role: "Secondary Guarantor",
      },
    ],
    investors: [
      {
        id: 203,
        name: "Robert Taylor",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 200000,
        percentage: 70,
      },
      {
        id: 204,
        name: "Jennifer Martinez",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 85000,
        percentage: 30,
      },
    ],
    totalAmount: 285000,
    currency: "USD",
    description:
      "Advanced neural interface headset for direct brain-computer interaction with haptic feedback.",
    installments: [
      {
        month: 1,
        date: "2025-04-22",
        amount: 71250,
        status: "paid",
      },
      {
        month: 2,
        date: "2025-05-22",
        amount: 71250,
        status: "due",
      },
      {
        month: 3,
        date: "2025-06-22",
        amount: 71250,
        status: "pending",
      },
      {
        month: 4,
        date: "2025-07-22",
        amount: 71250,
        status: "pending",
      },
    ],
    completedPayments: 1,
    totalPayments: 4,
  },
  {
    id: 3,
    itemName: "Fusion Energy Reactor",
    itemImage: "/placeholder.svg?height=100&width=100",
    customerName: "Daniel Kim",
    customerImage: "/placeholder.svg?height=60&width=60",
    investorName: "Lisa Garcia",
    investorImage: "/placeholder.svg?height=60&width=60",
    date: "2025-02-15",
    rate: 18.2,
    status: "completed",
    guarantors: [
      {
        id: 105,
        name: "Thomas Anderson",
        image: "/placeholder.svg?height=60&width=60",
        role: "Primary Guarantor",
      },
      {
        id: 106,
        name: "Olivia Smith",
        image: "/placeholder.svg?height=60&width=60",
        role: "Secondary Guarantor",
      },
    ],
    investors: [
      {
        id: 205,
        name: "Lisa Garcia",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 300000,
        percentage: 50,
      },
      {
        id: 206,
        name: "William Johnson",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 300000,
        percentage: 50,
      },
    ],
    totalAmount: 600000,
    currency: "USD",
    description:
      "Compact fusion energy reactor with sustainable plasma containment and efficient energy conversion.",
      installments: [
        {
          month: 1,
          date: "2025-04-01", // 👈 late
          amount: 62500,
          status: "paid",
        },
        {
          month: 2,
          date: "2025-06-05",
          amount: 62500,
          status: "paid",
        },
        {
          month: 3,
          date: "2025-07-05",
          amount: 62500,
          status: "paid",
        },
        {
          month: 4,
          date: "2025-08-05",
          amount: 62500,
          status: "paid",
        },
      ],
    completedPayments: 2,
    totalPayments: 6,
  },
  {
    id: 4,
    itemName: "Autonomous Drone Fleet",
    itemImage: "/placeholder.svg?height=100&width=100",
    customerName: "Emily Wilson",
    customerImage: "/placeholder.svg?height=60&width=60",
    investorName: "Michael Chen",
    investorImage: "/placeholder.svg?height=60&width=60",
    date: "2025-04-05",
    rate: 14.3,
    status: "active",
    guarantors: [
      {
        id: 107,
        name: "Ryan Park",
        image: "/placeholder.svg?height=60&width=60",
        role: "Primary Guarantor",
      },
      {
        id: 108,
        name: "Ava Thompson",
        image: "/placeholder.svg?height=60&width=60",
        role: "Secondary Guarantor",
      },
    ],
    investors: [
      {
        id: 207,
        name: "Michael Chen",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 175000,
        percentage: 70,
      },
      {
        id: 208,
        name: "Samantha Lee",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 75000,
        percentage: 30,
      },
    ],
    totalAmount: 250000,
    currency: "USD",
    description:
      "Fleet of autonomous drones with advanced AI for coordinated operations and real-time data processing.",
    installments: [
      {
        month: 1,
        date: "2025-05-05",
        amount: 62500,
        status: "paid",
      },
      {
        month: 2,
        date: "2025-06-05",
        amount: 62500,
        status: "due",
      },
      {
        month: 3,
        date: "2025-07-05",
        amount: 62500,
        status: "pending",
      },
      {
        month: 4,
        date: "2025-08-05",
        amount: 62500,
        status: "pending",
      },
    ],
    completedPayments: 1,
    totalPayments: 4,
  },
  {
    id: 5,
    itemName: "Bioprinting System",
    itemImage: "/placeholder.svg?height=100&width=100",
    customerName: "James Thompson",
    customerImage: "/placeholder.svg?height=60&width=60",
    investorName: "Emma Williams",
    investorImage: "/placeholder.svg?height=60&width=60",
    date: "2025-03-18",
    rate: 16.7,
    status: "completed",
    guarantors: [
      {
        id: 109,
        name: "Noah Garcia",
        image: "/placeholder.svg?height=60&width=60",
        role: "Primary Guarantor",
      },
      {
        id: 110,
        name: "Isabella Kim",
        image: "/placeholder.svg?height=60&width=60",
        role: "Secondary Guarantor",
      },
    ],
    investors: [
      {
        id: 209,
        name: "Emma Williams",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 220000,
        percentage: 55,
      },
      {
        id: 210,
        name: "Jacob Martinez",
        image: "/placeholder.svg?height=60&width=60",
        contribution: 180000,
        percentage: 45,
      },
    ],
    totalAmount: 400000,
    currency: "USD",
    description:
      "Advanced bioprinting system for tissue and organ fabrication with integrated bioreactor and monitoring.",
    installments: [
      {
        month: 1,
        date: "2025-04-18",
        amount: 100000,
        status: "paid",
      },
      {
        month: 2,
        date: "2025-05-18",
        amount: 100000,
        status: "paid",
      },
      {
        month: 3,
        date: "2025-06-18",
        amount: 100000,
        status: "paid",
      },
      {
        month: 4,
        date: "2025-07-18",
        amount: 100000,
        status: "paid",
      },
    ],
    completedPayments: 4,
    totalPayments: 4,
  },
];