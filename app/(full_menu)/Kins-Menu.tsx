import { View, Text, FlatList, RefreshControl, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../components/EmptyState'
import SearchInput from '../components/SearchInput'
import { ArrowLeftIcon, HomeIcon, StarIcon } from 'react-native-heroicons/outline'
import {getKinsBreakfast, getKinsDinner, getJ2Food, getKinsLunch} from '@/lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import FoodItemCard from '../components/FoodItemCard'
import FoodDataComponent from '../components/FoodDataComponent'
import { router, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router'
import { Dropdown } from 'react-native-element-dropdown'
import DatePicker from 'react-native-date-picker'
import SwitchSelector from 'react-native-switch-selector'


  
const Kins = () => {
  

//   const {data: posts, refetch} = useAppwrite(getAllFoodData, []);

  const {data: breakfast} = useAppwrite(getKinsBreakfast, []);
  const {data: lunch} = useAppwrite(getKinsLunch, []);
  const {data: dinner} = useAppwrite(getKinsDinner, []);
  const [data, setData] = useState(breakfast);


  const options = [
    { label: "Breakfast", value: "0" },
    { label: "Lunch", value: "1" },
    { label: "Dinner", value: "2" }
  ];

  const setBasedOnTime = () =>{
    let date = new Date(Date.now());
    var hour = date.getHours()
    var min = date.getMinutes()
    if(hour < 10){
      return 0
    }
    else if(hour > 10 && hour < 15)
      return 1
    else
      return 2
  }


  const handlePress = (value) => {
    if(value == 2){
        setData(lunch)
    }
    else if(value == 3)
        setData(dinner)
    else
        setData(breakfast);
  }

  return ( 
    <SafeAreaView className='bg-primary h-full'>

      <FlatList 
        // data={[]}
        showsVerticalScrollIndicator={false}
        data = {data} 
        keyExtractor={(item) => item.$id}
        renderItem={({item})=> (
          <FoodDataComponent foods= {item}/>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            
            <View className="flex justify-between items-start flex-row mb-6">
              <Text className="font-pmedium text-sm text-gray-100">
                  
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                Today's Menu
                </Text>
              <TouchableOpacity onPress={router.back}>
                <View className="mt-1.5 items-end">
                  <HomeIcon size={35}/>
                </View>
              </TouchableOpacity>
            </View>

            <SwitchSelector
                  options={options}
                  hasPadding
                  initial={setBasedOnTime()}
                  onPress={value => handlePress(value)}
            />
          
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Dining Hall Closed"
            subtitle=""
          />
        )}
        // refreshControl={<RefreshControl refreshing = {refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Kins