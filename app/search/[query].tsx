import { View, Text, FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ChevronDownIcon, StarIcon, MagnifyingGlassIcon, HeartIcon, HomeIcon} from 'react-native-heroicons/outline'
import SearchInput from '../components/SearchInput'
import EmptyState from '../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { getAllFoodData, getDiningHalls, getJ2Food, getJCLFood, getKinsFood, searchPosts} from '@/lib/appwrite'
import FoodDataComponent from '../components/FoodDataComponent'
import FeaturedRow from '../components/FeaturedRow'
import { useGlobalContext } from '@/context/GlobalProvider'
import { router, useLocalSearchParams } from 'expo-router'

// import {images} from '../../constants'

const Search = () => {

  const { user } = useGlobalContext();
  const {query} = useLocalSearchParams();

  const {data: foods, refetch} = useAppwrite(searchPosts, [query]);  


  useEffect(() => {
    refetch()
  }, [query])

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true)
    //recall
    await refetch();
    setRefreshing(false)
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      
      <FlatList
        // data={[]}
        showsVerticalScrollIndicator={false}
        data = {foods} 
        keyExtractor={(item) => item.$id}
        renderItem={({item})=> (
          <FoodDataComponent foods={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search results
            </Text>
            
            <Text className="text-2xl font-psemibold text-white">
              {query}
            </Text>
              
            <View className='mt-6 mb-8'>
              <SearchInput initialQuery={query}/>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Food Found"
            subtitle="No food found for this search"
          />
        )}
        refreshControl={<RefreshControl refreshing = {refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Search