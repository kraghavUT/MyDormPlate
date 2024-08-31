import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ChevronDownIcon, StarIcon, MagnifyingGlassIcon, HeartIcon} from 'react-native-heroicons/outline'
import SearchInput from '../components/SearchInput'
import useAppwrite from '../../lib/useAppwrite'
import { getAllFoodData, getDiningHalls, getJ2Food, getJCLFood, getKinsFood} from '@/lib/appwrite'
import FoodDataComponent from '../components/FoodDataComponent'
import FeaturedRow from '../components/FeaturedRow'
import { useGlobalContext } from '@/context/GlobalProvider'
import { router } from 'expo-router'

const Home = () => {

  const {data: J2Food, refetch} = useAppwrite(getJ2Food, []);  

  const {data: JCLFood} = useAppwrite(getJCLFood, []);  

  const {data: KinsFood} = useAppwrite(getKinsFood, []);  


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
        data = {[]} 
        keyExtractor={(item) => item.$id}
        renderItem={({item})=> (
          <View>

          </View>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Guest
                </Text>
              </View>
              <View className="mt-0.5">
              
              </View>

            </View>

            <SearchInput
              initialQuery={''}
              />

            <View className="w-full flex-1 pt-5 pb-8">
              {/* <Text className="text-lg font-pregular text-gray-100 mb-3">
                Popular items [coming soon]
              </Text> */}
 
                <FeaturedRow
                  location={"J2"}
                  description={""}
                  locFoodData={J2Food}
                  // imgURL={'https://links.papareact.com/gn7'}
                />

                <FeaturedRow
                  location={"Kins"}
                  description={""}
                  locFoodData={KinsFood}
                  // imgURL={'https://links.papareact.com/gn7'}
                />

                <FeaturedRow
                  location={"JCL"}
                  description={""}
                  locFoodData={JCLFood}
                  // imgURL={'https://links.papareact.com/gn7'}
                />
            </View>
          </View>
        )}
        // ListEmptyComponent={() => (
        //   // <EmptyState
        //   //   title="No Videos Found"
        //   //   subtitle="No videos created yet"
        //   // />
        // )}
        refreshControl={<RefreshControl refreshing = {refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Home