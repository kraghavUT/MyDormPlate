import { View, Text, FlatList, RefreshControl, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from './components/EmptyState'
import SearchInput from './components/SearchInput'
import { ArrowLeftIcon, HomeIcon, StarIcon } from 'react-native-heroicons/outline'
import { getAllFoodData, getBreakfast, getDinner, getLunch } from '@/lib/appwrite'
import useAppwrite from '../lib/useAppwrite'
import FoodItemCard from './components/FoodItemCard'
import FoodDataComponent from './components/FoodDataComponent'
import { router, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router'
import { Dropdown } from 'react-native-element-dropdown'
import DatePicker from 'react-native-date-picker'
import SwitchSelector from 'react-native-switch-selector'


  
const FullMenu = () => {
  
  const [foodData, setFoodData] = useState([]);


  const {data: posts, refetch} = useAppwrite(getAllFoodData, []);

  const {data: breakfast} = useAppwrite(getBreakfast, []);
  const {data: lunch} = useAppwrite(getLunch, []);

  const {data: dinner} = useAppwrite(getDinner, []);

    
  // const [refreshing, setRefreshing] = useState(false)
  //   const onRefresh = async () => {
  //     setRefreshing(true)
  //     //recall
  //     await refetch();
  //     setRefreshing(false)
  //   }

  const options = [
      { label: "Breakfast", value: "1" },
      { label: "Lunch", value: "2" },
      { label: "Dinner", value: "3" }
  ];

  setFoodData(breakfast)

  const handlePress = (value) => {
    if(value == 1){
      setFoodData(breakfast)
    }
    else if(value == 2)
      setFoodData(lunch)
    else
      setFoodData(dinner)
  };


  return ( 
    <SafeAreaView className='bg-primary h-full'>

      
      
    
      <FlatList
        // data={[]}
        showsVerticalScrollIndicator={false}
        data = {foodData} 
        keyExtractor={(item) => item.$id}
        renderItem={({item})=> (

          <FoodDataComponent foods= {item} img={'https://links.papareact.com/gn7'}/>
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
                  initial={0}
                  onPress={() => handlePress}
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

export default FullMenu