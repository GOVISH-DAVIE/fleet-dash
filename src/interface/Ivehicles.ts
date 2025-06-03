 
  export interface IVehicles {
    id: number
    registrationnumber: string
    make: string
    model: string
    type: string
    year: number
    status: string
    fuellevel: number
    fuelefficiency: number
    mileage: number
    location: string
    assigneddriver: string
    lastserviced: string
    nextservice: string
    lastinspection: string
    image: string
    fuelrecords: Fuelrecord[]
    maintenancerecords: Maintenancerecord[]
    trips: Trip[]
  }
  
  export interface Fuelrecord {
    id: number
    vehicleid: number
    date: string
    liters: number
    costperliter: number
    odometer: number
    station: string
    paymentmethod: string
    notes: string
  }
  
  export interface Maintenancerecord {
    id: number
    vehicleid: number
    type: string
    description: string
    date: string
    cost: number
    status: string
    facility: string
    notes: string
    parts: Parts
  }
  
  export interface Parts {
    parts: string[]
  }
  
  export interface Trip {
    id: number
    vehicleid: number
    driverid: number
    startlocation: string
    endlocation: string
    purpose: string
    startdate: string
    enddate: string
    status: string
    distance: number
    fuelused: number
    fuelcost: number
    notes: string
  }
  