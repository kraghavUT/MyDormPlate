import { View, Text, FlatList, RefreshControl, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../components/EmptyState'
import SearchInput from '../components/SearchInput'
import { ArrowLeftIcon, HomeIcon, StarIcon } from 'react-native-heroicons/outline'
import { getAllFoodData, getCategoriesList, getCategoryFood, getJ2Breakfast, getJ2Dinner, getJ2Food, getJ2Lunch } from '@/lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import FoodDataComponent from '../components/FoodDataComponent'
import { router, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router'
import DatePicker from 'react-native-date-picker'
import SwitchSelector from 'react-native-switch-selector'
import { FlashList } from '@shopify/flash-list'


const times = ['Breakfast', 'Lunch', 'Dinner'];



const J2 = () => {

  const {data: breakfast, refetch} = useAppwrite(getJ2Breakfast, []);
  const {data: lunch} = useAppwrite(getJ2Lunch, []);
  const {data: dinner} = useAppwrite(getJ2Dinner, []);

  const {data: categories_B} = useAppwrite(getCategoriesList, ["Breakfast", "J2"])
  const {data: categories_L} = useAppwrite(getCategoriesList, ["Lunch", "J2"])
  const {data: categories_D} = useAppwrite(getCategoriesList, ["Dinner", "J2"])

  

  const startingCategories = async () => {
    let date = new Date(Date.now());
    var hour = date.getHours()
    var min = date.getMinutes()
    if(hour < 10){
      return getCategoriesList("Breakfast", "J2");
    }
    else if(hour > 10 && hour < 15){
      return getCategoriesList("Lunch", "J2");
    }
    else{
      return getCategoriesList("Dinner", "J2");
    }    
  }

  const startingTime = () => {
    let date = new Date(Date.now());
    var hour = date.getHours()
    var min = date.getMinutes()
    if(hour < 10){
      return times[0];
    }
    else if(hour > 10 && hour < 15){
      return times[1];
    }
    else{
      return times[2];
    }    
  }

  const setBasedOnTime = async () =>{
    let date = new Date(Date.now());
    var hour = date.getHours()
    var min = date.getMinutes()
    if(hour < 10){
      return (await getJ2Breakfast());
    }
    else if(hour > 10 && hour < 15){
      return (await getJ2Lunch())
    }
    else{
      return (await getJ2Dinner())
    }    
  }

  useEffect(() => {
    const startUp = async () => {
      const fetchedBrek = await setBasedOnTime();
      setData(fetchedBrek);

      const startingCats = await startingCategories();
      setDisplayCategories(startingCats)
    };
  
    startUp();
  }, []);

  const [data, setData] = useState([]);
  
  const starTime = startingTime()  

  const [selectedTime, setSelectedTime] = useState(starTime);  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [displayCategories, setDisplayCategories] = useState([]);


  const getAllCategoryFoods = async (time) =>  {
    var addToMe;
    
    return addToMe
  }
  useEffect(() => {
      const fetchAndSet = async () => {
      if (selectedTime === 'Breakfast') {
        setData(breakfast)
      } else if (selectedTime === 'Lunch') {
        setData(lunch);
      } else if (selectedTime === 'Dinner') {
        setData(dinner);
      }
    }
    fetchAndSet();
  }, [selectedTime]);

  

  useEffect(() => {
      const renderData = async () => {
      if (selectedCategories.length > 0){
        if (selectedTime === 'Breakfast') {
          const foods = await getCategoryFood('Breakfast', "J2", selectedCategories);
          console.log('thisonee',foods)
          if(foods){
            setData(foods);
          }
        } else if (selectedTime === 'Lunch') {
          const foods = await getCategoryFood('Lunch', "J2", selectedCategories);
          if(foods){
            setData(foods);
          }
        } else if (selectedTime === 'Dinner') {
          const foods = await getCategoryFood('Dinner', "J2", selectedCategories);
          if(foods){
            setData(foods);
          }
        }
        
      } 
    }
    renderData();
  }, [selectedCategories]);

  const handleCategoryPress = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((item) => item !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  const updateDisplayCats = (item) => {
    if(item == "Breakfast"){
      setDisplayCategories(categories_B)
    }
    else if(item == "Lunch"){
      setDisplayCategories(categories_L)
    }
    else if(item == "Dinner"){
      setDisplayCategories(categories_D)
    }
  }


  const renderTime = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
          setSelectedTime(item)
          updateDisplayCats(item)
          setSelectedCategories([])
        }
      }
      className={(`py-2 px-4 rounded-lg mx-2 ${selectedTime === item ? 'bg-red-500' : 'bg-white'}`)}
    >
      <Text className={(`text-center ${selectedTime === item ? 'text-white' : 'text-gray-800'}`)}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCategoryPress(item)}
      className={(`py-2 px-4 rounded-lg mx-2 ${selectedCategories.includes(item) ? 'bg-red-500' : 'bg-white'}`)}
    >
      <Text className={(`text-center ${selectedCategories.includes(item) ? 'text-white' : 'text-gray-800'}`)}>
        {item}
      </Text>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView className='bg-primary h-full'>
      
      <FlashList
        // refreshControl={<RefreshControl refreshing = {refreshing} onRefresh={onRefresh}/>}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={500}
        data = {data} 
        keyExtractor={(item) => item.$id}
        renderItem={({item})=> (
          <FoodDataComponent foods= {item} />
        )}
        ListHeaderComponent={() => (

          <View className="flex my-6 px-4 space-y-6">

            <View className="flex justify-between items-start flex-row mb-6">

              <Text className="font-pmedium text-sm text-gray-100">
                  
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                Today's J2 Menu
                </Text>
              <TouchableOpacity onPress={router.back}>
                <View className="mt-1.5 items-end">
                  <HomeIcon size={35}/>
                </View>
              </TouchableOpacity>
            </View>
            <FlatList
              data={times}
              renderItem={renderTime}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <FlatList
              data={displayCategories}
              renderItem={renderCategory}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Dining Hall Closed"
            subtitle=""
          />
        )}
      />
    </SafeAreaView>
  );
};

export default J2