import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";


export interface Car {
    id: string;
    make: string;
    model: string;
    price: number;
    year: number
    image: string;
    seat: number;
    availability: boolean;
    description: string;
}

export const useCars = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const carCollection = collection(db, "cars");
                const carSnapshot = await getDocs(carCollection);
                const carList = carSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()

                })) as Car[];
                setCars(carList);


            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    return { cars, loading };
};


export const useCar = (id: string | undefined) => {
    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchCar = async () => {
            try {
                const carRef = doc(db, "cars", id);
                const carSnap = await getDoc(carRef);
                if (carSnap.exists()) {
                    setCar({ ...(carSnap.data() as Car), id: carSnap.id });
                }


            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false);
            }


        };
        fetchCar();

    }, [id]);

    return { car, loading };

}