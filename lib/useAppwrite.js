import {useEffect, useState } from "react";
import { Alert } from 'react-native';

const useAppwrite = (fn, params) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fn(...params);
            setData(response)
        } catch (error) {
            Alert.alert('Error', error.message)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const refetch = () => fetchData();

    return {data, isLoading, refetch}
}
export default useAppwrite
// import { useEffect, useState } from 'react';
// import { Alert } from 'react-native';

// const useAppwrite = (fn, params = []) => {
//     const [data, setData] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     const fetchData = async () => {
//         setIsLoading(true);
//         try {
//             const response = await fn(...params);
//             setData(response);
//         } catch (error) {
//             Alert.alert('Big error', error.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, [params]); // Dependencies array includes params to refetch data when they change

//     const refetch = () => fetchData();

//     return { data, isLoading, refetch };
// };

// export default useAppwrite;