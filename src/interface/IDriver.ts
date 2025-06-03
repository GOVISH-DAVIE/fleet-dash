 
  
  export interface IDriver {
    id: number
    name: string
    phone: string
    email: string
    licensenumber: string
    licenseexpiry: string
    status: string
    rating: number
    hourslogged: number
    joindate: string
    address: string
    avatar: string
    trips: Trip[]
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
  