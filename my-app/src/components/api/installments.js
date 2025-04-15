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