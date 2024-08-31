import { View, Text, ScrollView,TouchableOpacity, Dimensions, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowPathIcon, ArrowRightIcon } from 'react-native-heroicons/outline'
import FoodDataComponent from './FoodDataComponent'
import { Link } from 'expo-router'
import {router} from 'expo-router'
import { FlashList } from '@shopify/flash-list'
import useAppwrite from '@/lib/useAppwrite'
import { getBestForUser } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import EmptyState from './EmptyState'

const SuggestedMealRow= ({location, description, locFoodData}) => {
  
  const { height } = Dimensions.get('window');


  const bestUser = locFoodData;

  const [displayedItems, setDisplayedItems] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  
  useEffect(() => {
    if (bestUser) {
      setDisplayedItems(bestUser.slice(0, 5));
    }
  }, [bestUser]);
  
  const renderItem = ({ item }) => <FoodDataComponent foods={item} />;
  const regenerateMeals = () => {
    setDisplayedItems(bestUser.slice(currIndex, currIndex + 5));
    setCurrIndex(currIndex + 5);
  }

  return (
    <View>
        <View className='mt-4 flex-row items-center justify-between px-4'>  
            <Text className='font-bold text-lg text-white'>{location}</Text>
            <View className='flex-row items-center'>
              <Text className='text-white mr-2'>Regenerate</Text>
              <TouchableOpacity onPress={regenerateMeals}>
                <ArrowPathIcon color={"#00CCBB"}/>
              </TouchableOpacity>
            </View>      
      </View>
        <Text className='text-xs text-white px-4'>{description}</Text>
        <View style={{ height: 200, width: Dimensions.get("screen").width }}>
          <FlatList
            data={displayedItems}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            initialNumToRender={5}

            ListEmptyComponent={() => (
              <EmptyState
                title="Sign in generate"
                subtitle="Input health data"
              />
            )}
          />
          </View>
    </View>
  )
}

export default SuggestedMealRow