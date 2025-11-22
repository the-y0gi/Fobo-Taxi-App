// export const drivers = [
//   {
//     id: "DR001",
//     name: "Rakesh Kumar",
//     phone: "9876543210",
//     email: "rakesh@taxiapp.com",
//     status: "online",
//     employeeId: "EMP-101",
//     profileImage: "/images/driver1.png",

//     vehicle: {
//       name: "Toyota",
//       model: "Innova",
//       numberPlate: "MH 12 AB 4432",
//       type: "3-8",
//       color: "White",
//     },

//     stats: {
//       totalTrips: 180,
//       totalHours: 320,
//       todayTrips: 6,
//       todayEarnings: 1250,
//       cancellationRate: 4, // %
//     },

//     workingToday: {
//       activeTime: "5h 20m",
//       rideTime: "3h 45m",
//       breakTime: "1h 35m",
//     },

//     currentLocation: "Baner Road, Pune",
//     isDisabled: false,
//   },

//   {
//     id: "DR002",
//     name: "Imran Khan",
//     phone: "9988776655",
//     email: "imran@taxiapp.com",
//     status: "offline",
//     employeeId: "EMP-102",
//     profileImage: "/images/driver2.png",

//     vehicle: {
//       name: "Maruti",
//       model: "Dzire",
//       numberPlate: "MH 14 XY 9823",
//       type: "3-8",
//       color: "Silver",
//     },

//     stats: {
//       totalTrips: 92,
//       totalHours: 120,
//       todayTrips: 2,
//       todayEarnings: 430,
//       cancellationRate: 7,
//     },

//     workingToday: {
//       activeTime: "2h 10m",
//       rideTime: "1h 05m",
//       breakTime: "1h 05m",
//     },

//     currentLocation: "Hadapsar, Pune",
//     isDisabled: false,
//   },
// ];


export const drivers = [
  {
    id: "DR001",
    name: "Rakesh Kumar",
    phone: "9876543210",
    email: "rakesh@taxiapp.com",
    status: "online",
    employeeId: "EMP-101",
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    vehicle: {
      name: "Toyota",
      model: "Innova",
      numberPlate: "MH 12 AB 4432",
      type: "SUV",
      color: "White",
      capacity: "6-7",
    },

    stats: {
      totalTrips: 180,
      totalHours: 320,
      todayTrips: 6,
      todayEarnings: 1250,
      totalEarnings:1000,
      cancellationRate: 4,
    },

    workingToday: {
      activeTime: "5h 20m",
      rideTime: "3h 45m",
      breakTime: "1h 35m",
    },

    currentLocation: "Baner Road, Pune",
    isDisabled: false,
    lastActive: "2 mins ago",
  },

  {
    id: "DR002",
    name: "Imran Khan",
    phone: "9988776655",
    email: "imran@taxiapp.com",
    status: "offline",
    employeeId: "EMP-102",
    profileImage: "https://images.unsplash.com/photo-1583692331501-5339b76cbf1e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    vehicle: {
      name: "Maruti",
      model: "Dzire",
      numberPlate: "MH 14 XY 9823",
      type: "Sedan",
      color: "Silver",
      capacity: "4",
    },

    stats: {
      totalTrips: 92,
      totalHours: 120,
      todayTrips: 2,
      todayEarnings: 430,
      cancellationRate: 7,
            totalEarnings:1030,

    },

    workingToday: {
      activeTime: "2h 10m",
      rideTime: "1h 05m",
      breakTime: "1h 05m",
    },

    currentLocation: "Hadapsar, Pune",
    isDisabled: false,
    lastActive: "5 hours ago",
  },

  {
    id: "DR003",
    name: "Priya Sharma",
    phone: "8877665544",
    email: "priya@taxiapp.com",
    status: "on-ride",
    employeeId: "EMP-103",
    profileImage: "https://images.unsplash.com/photo-1527593167147-e9c94a5883e6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    vehicle: {
      name: "Hyundai",
      model: "Creta",
      numberPlate: "MH 12 CD 7788",
      type: "SUV",
      color: "Red",
      capacity: "5",
    },

    stats: {
      totalTrips: 245,
      totalHours: 420,
      todayTrips: 8,
      todayEarnings: 2100,
      cancellationRate: 2,
            totalEarnings:7000,

    },

    workingToday: {
      activeTime: "6h 45m",
      rideTime: "4h 20m",
      breakTime: "2h 25m",
    },

    currentLocation: "Koregaon Park, Pune",
    isDisabled: false,
    lastActive: "Now",
  },
];