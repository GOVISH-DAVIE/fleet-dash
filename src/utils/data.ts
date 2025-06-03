import { faker } from '@faker-js/faker';
import { addDays, subDays, format } from 'date-fns';

// Seed faker for consistent data
faker.seed(123);
// Create allowed series: KCA to KDT
const allowedPrefixes = Array.from({ length: 23 }, (_, i) => {
  const char = String.fromCharCode('A'.charCodeAt(0) + i); // A to W
  return `KC${char}`;
});
// Create mock vehicle data
export const vehicles = Array.from({ length: 200 }, (_, i) => {
  const status = faker.helpers.arrayElement(['active', 'maintenance', 'inactive']);
  const fuelLevel = faker.number.int({ min: 10, max: 100 });
  const lastServiced = faker.date.between({
    from: subDays(new Date(), 90),
    to: subDays(new Date(), 1)
  });

  const registrationPrefix = faker.helpers.arrayElement(allowedPrefixes);

  return {
    id: i + 1,
    registrationNumber: `${registrationPrefix} ${faker.number.int({ min: 100, max: 999 })}${faker.string.alpha({ length: 1, casing: 'upper' })}`,
    make: faker.helpers.arrayElement(['Toyota', 'Isuzu', 'Mitsubishi', 'Nissan', 'Ford', 'Mazda']),
    model: faker.vehicle.model(),
    type: faker.helpers.arrayElement(['Truck', 'Van', 'SUV', 'Pickup', 'Bus']),
    year: faker.number.int({ min: 2015, max: 2023 }),
    status,
    fuelLevel,
    fuelEfficiency: faker.number.float({ min: 8, max: 16, precision: 0.1 }),
    mileage: faker.number.int({ min: 10000, max: 150000 }),
    location: faker.helpers.arrayElement([
      'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Machakos',
    ]),
    assignedDriver: faker.person.fullName(),
    lastServiced,
    nextService: addDays(lastServiced, faker.number.int({ min: 60, max: 120 })),
    lastInspection: format(
      faker.date.between({
        from: subDays(new Date(), 30),
        to: new Date()
      }),
      'yyyy-MM-dd'
    ),
    image: faker.helpers.arrayElement([
      'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/12801262/pexels-photo-12801262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6271986/pexels-photo-6271986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ])
  };
});

// Create mock driver data
const kenyanFirstNames = [
  'James', 'John', 'Peter', 'Mary', 'Jane', 'Grace', 'Joseph', 'Esther',
  'Brian', 'Daniel', 'Sarah', 'David', 'Paul', 'Faith', 'Mercy'
];

const kenyanLastNames = [
  'Mwangi', 'Odhiambo', 'Wanjiku', 'Mutua', 'Ouma', 'Kamau', 'Njeri', 'Atieno',
  'Kiplagat', 'Were', 'Ndegwa', 'Chebet', 'Muthoni', 'Onyango', 'Cherono'
];

export const drivers = Array.from({ length: 15 }, (_, i) => {
  const status = faker.helpers.arrayElement(['available', 'on-duty', 'off-duty', 'on-leave']);
  
  const firstName = faker.helpers.arrayElement(kenyanFirstNames);
  const lastName = faker.helpers.arrayElement(kenyanLastNames);

  return {
    id: i + 1,
    name: `${firstName} ${lastName}`,
    phone: faker.phone.number('+254 7## ### ###'),
    email: faker.internet.email({ firstName, lastName }),
    licenseNumber: `K${faker.string.alphanumeric(8).toUpperCase()}`,
    licenseExpiry: format(
      faker.date.future({ years: 3 }),
      'yyyy-MM-dd'
    ),
    status,
    rating: faker.number.float({ min: 3, max: 5, precision: 0.1 }),
    trips: faker.number.int({ min: 20, max: 500 }),
    hoursLogged: faker.number.int({ min: 100, max: 3000 }),
    joinDate: format(
      faker.date.past({ years: 5 }),
      'yyyy-MM-dd'
    ),
    address: `${faker.location.streetAddress()}, ${faker.helpers.arrayElement([
      'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'
    ])}`,
    avatar: faker.image.avatar()
  };
});

// Create mock maintenance records
export const maintenanceRecords = Array.from({ length: 100 }, (_, i) => {
  const status = faker.helpers.arrayElement(['scheduled', 'in-progress', 'completed', 'cancelled']);
  const vehicle = vehicles[faker.number.int({ min: 0, max: vehicles.length - 1 })];
  const date = faker.date.between({
    from: subDays(new Date(), 90),
    to: addDays(new Date(), 30)
  });
  
  return {
    id: i + 1,
    vehicleId: vehicle.id,
    vehicleReg: vehicle.registrationNumber,
    type: faker.helpers.arrayElement([
      'Routine Service', 'Oil Change', 'Brake Repair', 'Tire Replacement',
      'Engine Repair', 'Transmission Service', 'Electrical System'
    ]),
    description: faker.lorem.sentence(),
    date: format(date, 'yyyy-MM-dd'),
    cost: faker.number.int({ min: 2000, max: 50000 }),
    status,
    facility: faker.helpers.arrayElement([
      'Central Garage', 'QuickFix Auto', 'Premium Motors', 'Fleet Service Center',
      'AutoMax Repairs', 'City Motors Workshop'
    ]),
    notes: faker.lorem.paragraph(),
    parts: Array.from(
      { length: faker.number.int({ min: 0, max: 3 }) },
      () => ({
        name: faker.helpers.arrayElement([
          'Oil Filter', 'Air Filter', 'Brake Pads', 'Spark Plugs',
          'Wiper Blades', 'Battery', 'Alternator', 'Fuel Pump'
        ]),
        quantity: faker.number.int({ min: 1, max: 4 }),
        cost: faker.number.int({ min: 500, max: 8000 })
      })
    )
  };
});

// Create mock fuel records
export const fuelRecords = Array.from({ length: 50 }, (_, i) => {
  const vehicle = vehicles[faker.number.int({ min: 0, max: vehicles.length - 1 })];
  const date = faker.date.recent({ days: 60 });
  
  return {
    id: i + 1,
    vehicleId: vehicle.id,
    vehicleReg: vehicle.registrationNumber,
    date: format(date, 'yyyy-MM-dd'),
    liters: faker.number.float({ min: 20, max: 80, precision: 0.01 }),
    costPerLiter: faker.number.float({ min: 130, max: 160, precision: 0.01 }),
    totalCost: function() {
      return +(this.liters * this.costPerLiter).toFixed(2);
    },
    odometer: faker.number.int({ min: 10000, max: 100000 }),
    station: faker.helpers.arrayElement([
      'Total Energies', 'Shell', 'KenolKobil', 'Gulf', 'Rubis', 'National Oil'
    ]),
    paymentMethod: faker.helpers.arrayElement(['Card', 'Cash', 'Fleet Account', 'M-Pesa']),
    notes: faker.helpers.arrayElement([
      '', '', '', 'Driver reported low tire pressure', 'Vehicle running smoothly', 'Check engine light on'
    ])
  };
});

// Create mock trip data
export const trips = Array.from({ length: 40 }, (_, i) => {
  const startDate = faker.date.recent({ days: 30 });
  const duration = faker.number.int({ min: 1, max: 10 });
  const endDate = addDays(startDate, duration);
  const vehicle = vehicles[faker.number.int({ min: 0, max: vehicles.length - 1 })];
  const driver = drivers[faker.number.int({ min: 0, max: drivers.length - 1 })];
  const distance = faker.number.int({ min: 50, max: 1000 });
  const fuelUsed = +(distance / vehicle.fuelEfficiency).toFixed(2);
  
  return {
    id: i + 1,
    vehicleId: vehicle.id,
    vehicleReg: vehicle.registrationNumber,
    driverId: driver.id,
    driverName: driver.name,
    startLocation: faker.helpers.arrayElement([
      'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Machakos'
    ]),
    endLocation: faker.helpers.arrayElement([
      'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Machakos',
      'Kericho', 'Malindi', 'Kitale', 'Garissa', 'Nyeri'
    ]),
    purpose: faker.helpers.arrayElement([
      'Delivery', 'Client Meeting', 'Site Visit', 'Staff Transport',
      'Equipment Transport', 'Materials Pickup', 'Corporate Event'
    ]),
    startDate: format(startDate, 'yyyy-MM-dd'),
    endDate: format(endDate, 'yyyy-MM-dd'),
    status: faker.helpers.arrayElement(['planned', 'in-progress', 'completed', 'cancelled']),
    distance,
    fuelUsed,
    fuelCost: +(fuelUsed * faker.number.float({ min: 130, max: 160, precision: 0.01 })).toFixed(2),
    notes: faker.lorem.sentence()
  };
});

// Dashboard statistics
export const dashboardStats = {
  totalVehicles: vehicles.length,
  activeVehicles: vehicles.filter(v => v.status === 'active').length,
  inMaintenance: vehicles.filter(v => v.status === 'maintenance').length,
  inactive: vehicles.filter(v => v.status === 'inactive').length,
  totalDrivers: drivers.length,
  availableDrivers: drivers.filter(d => d.status === 'available').length,
  totalTrips: trips.length,
  completedTrips: trips.filter(t => t.status === 'completed').length,
  scheduledMaintenance: maintenanceRecords.filter(m => m.status === 'scheduled').length,
  fuelExpenditure: fuelRecords.reduce((sum, record) => sum + record.totalCost(), 0),
  averageFuelEfficiency: +(vehicles.reduce((sum, v) => sum + v.fuelEfficiency, 0) / vehicles.length).toFixed(2),
  upcomingServices: maintenanceRecords.filter(m => 
    m.status === 'scheduled' && 
    new Date(m.date) > new Date() && 
    new Date(m.date) <= addDays(new Date(), 7)
  ).length
};

// Monthly distance data for chart
export const monthlyDistanceData = Array.from({ length: 6 }, (_, i) => {
  const month = subDays(new Date(), 30 * (5 - i));
  return {
    month: format(month, 'MMM'),
    distance: faker.number.int({ min: 5000, max: 15000 })
  };
});

// Monthly fuel consumption data for chart
export const monthlyFuelData = Array.from({ length: 6 }, (_, i) => {
  const month = subDays(new Date(), 30 * (5 - i));
  return {
    month: format(month, 'MMM'),
    consumption: faker.number.int({ min: 400, max: 1200 })
  };
});

// Vehicle types distribution for chart
export const vehicleTypesData = (() => {
  const typeCounts: Record<string, number> = {};
  vehicles.forEach(vehicle => {
    typeCounts[vehicle.type] = (typeCounts[vehicle.type] || 0) + 1;
  });
  
  return Object.entries(typeCounts).map(([type, count]) => ({
    type,
    count
  }));
})();

// Top routes data
export const topRoutesData = (() => {
  const routeCounts: Record<string, number> = {};
  
  trips.forEach(trip => {
    const route = `${trip.startLocation} - ${trip.endLocation}`;
    routeCounts[route] = (routeCounts[route] || 0) + 1;
  });
  
  return Object.entries(routeCounts)
    .map(([route, count]) => ({ route, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
})();

// Recent alerts
export const recentAlerts: Alert[] = [
  {
    id: 1,
    type: 'maintenance',
    message: 'Vehicle KBJ 435G is due for service in 2 days',
    time: '2 hours ago',
    priority: 'high'
  },
  {
    id: 2,
    type: 'fuel',
    message: 'Unusual fuel consumption detected for KCZ 110T',
    time: '5 hours ago',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'driver',
    message: 'Driver license expiring for John Kamau in 10 days',
    time: '1 day ago',
    priority: 'medium'
  },
  {
    id: 4,
    type: 'system',
    message: 'System update scheduled for Sunday, 8:00 PM',
    time: '2 days ago',
    priority: 'low'
  },
  {
    id: 5,
    type: 'vehicle',
    message: 'KDC 287Q reported check engine light on',
    time: '3 days ago',
    priority: 'high'
  }
];