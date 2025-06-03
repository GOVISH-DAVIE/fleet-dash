// utils/api.ts
import {
    Car,
    Droplets,
    Truck
} from 'lucide-react';
import { useEffect, useState } from 'react';
import StatsCard from './dashboard/StatsCard';
export const fetchFuelRecordsThisMonth = async ({
    page = 1,
    limit = 10
}: {
    page?: number;
    limit?: number;
}) => {
    try {
        const query = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString()
        });

        const res = await fetch(`https://fleet.intelligentso.com/api/v1/fuelRecord/thismonth?${query.toString()}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch fuel records: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        return {
            success: true,
            data: data.data || [],
            total: data.total || 0,
            page: data.page || 1,
            totalPages: data.totalPages || 1,
            totalFuelCost: data.totalFuelCost || 0
        };
    } catch (error) {
        console.error('fetchFuelRecordsThisMonth error:', error);
        return {
            success: false,
            error: (error as Error).message
        };
    }
};

export const fetchVehicles = async ({
    page = 1,
    limit = 10,
    search = ''
}: {
    page?: number;
    limit?: number;
    search?: string;
}) => {
    try {
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        if (search) queryParams.append('search', search);

        const res = await fetch(`https://fleet.intelligentso.com/api/v1/vehicle?${queryParams.toString()}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch vehicles: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        return {
            success: true,
            data: data.data || [],
            total: data.total || 0,
            page: data.page || 1,
            totalPages: data.totalPages || 1
        };
    } catch (error) {
        console.error(error);
        return { success: false, error: (error as Error).message };
    }
};
export const fetchActiveDrivers = async ({
    page = 1,
    limit = 10
}: {
    page?: number;
    limit?: number;
}) => {
    try {
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        const res = await fetch(`https://fleet.intelligentso.com/api/v1/driver/active?${queryParams.toString()}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch active drivers: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        return {
            success: true,
            data: data.data || [],
            total: data.total || 0,
            page: data.page || 1,
            totalPages: data.totalPages || 1
        };
    } catch (error) {
        console.error('fetchActiveDrivers error:', error);
        return {
            success: false,
            error: (error as Error).message
        };
    }
};



export const TotalVehicles = () => {
    const [totalVehicles, setTotalVehicles] = useState<number | null>(null);

    useEffect(() => {
        const loadTotal = async () => {
            const result = await fetchVehicles({ page: 1, limit: 1 });
            if (result.success) {
                setTotalVehicles(result.total);
            }
        };

        loadTotal();
    }, []);


    return <StatsCard
        title="Total Vehicles"
        value={totalVehicles !== null ? totalVehicles : '...'}
        icon={Car}
        change={{ value: 5, type: 'positive' }} // example change data
    />

}
export const ActiveDriver = () => {
    const [totalVehicles, setTotalVehicles] = useState<number | null>(null);

    useEffect(() => {
        const loadTotal = async () => {
            const result = await fetchActiveDrivers({ page: 1, limit: 1 });
            if (result.success) {
                setTotalVehicles(result.total);
            }
        };

        loadTotal();
    }, []);


    return <StatsCard
        title="Active Drivers"
        value={totalVehicles !== null ? totalVehicles : '...'}
        icon={Car}
        change={{ value: 5, type: 'negative' }} // example change data
    />

}


export const MonthlyFuelRecord = () => {
    const [fuelCount, setFuelCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFuelRecords = async () => {
            try {
                const result = await fetchFuelRecordsThisMonth({ page: 1, limit: 1 });
                if (result.success) {
                    setFuelCount(Math.round(result.totalFuelCost));
                }
            } catch (error) {
                console.error('Failed to fetch fuel records:', error);
            } finally {
                setLoading(false);
            }
        };

        loadFuelRecords();
    }, []);

    return (
        <StatsCard
            title="Fuel Records (This Month)"
            value={loading ? '...' : new Intl.NumberFormat('en-KE', {
                style: 'currency',
                currency: 'KES',
                maximumFractionDigits: 0,
            }).format(parseInt(`${fuelCount}`)) ?? 0}
            icon={Droplets}
            change={{ value: 3, type: 'positive' }} // Replace with real change if available
        />
    );
};

export const MonthlyCompletedTrips = () => {
    const [tripCount, setTripCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCompletedTrips = async () => {
            try {
                const response = await fetch('https://fleet.intelligentso.com/api/v1/trip/completed');
                const result = await response.json();
                console.log('====================================');
                console.log(result.data.count);
                console.log('====================================');
                if (result) {
                    setTripCount(result.data.count);
                } else {
                    console.warn('Unexpected API response:', result);
                }
            } catch (error) {
                console.error('Failed to fetch completed trips:', error);
            } finally {
                setLoading(false);
            }
        };

        loadCompletedTrips();
    }, []);

    return (
        <StatsCard
            title="Completed Trips (Last Month)"
            value={loading ? '...' : tripCount ?? 0}
            icon={Truck}
            change={{ value: 3, type: 'positive' }} // Replace with real change if available
        />
    );
}
