import { View, Text, ScrollView,TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import FoodDataComponent from './FoodDataComponent'
import { Link } from 'expo-router'
import {router} from 'expo-router'
import { FlashList } from '@shopify/flash-list'
import EmptyState from './EmptyState'

const FeaturedRow= ({location, description, locFoodData}) => {
  
  const { height } = Dimensions.get('window');

  const renderItem = ({ item }) => <FoodDataComponent foods={item} />;

  return (
    <View>
        <View className='mt-4 flex-row items-center justify-between px-4'>
          <Text className='font-bold text-lg text-white'>{location} Dining</Text>
          <View className='flex-row items-center'>
            <Text className='text-white mr-2'>View Full Menu</Text>
            <TouchableOpacity onPress={() => router.push(`/(full_menu)/${location}-Menu`)}>
              <ArrowRightIcon color={"#00CCBB"}/>
            </TouchableOpacity>
          </View>
        </View>
        <Text className='text-xs text-white px-4'>{description}</Text>
        <View style={{ height: 200, width: Dimensions.get("screen").width }}>
 
          <FlashList
            data={locFoodData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={item => item.$id}
            estimatedItemSize={303}
            // estimatedListSize={{ height: 36, width: 80 }}
            ListEmptyComponent={
            <EmptyState
              title="Dining Hall Closed"
              subtitle="Check later today"
              />
            }
          />
          </View>
    </View>
  )
}

export default FeaturedRow