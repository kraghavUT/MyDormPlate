import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ChevronDownIcon, StarIcon, MagnifyingGlassIcon, HeartIcon} from 'react-native-heroicons/outline'
import SearchInput from '../components/SearchInput'
import EmptyState from '../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { getAllFoodData, getDiningHalls, getJ2Food, getJCLFood, getKinsFood} from '@/lib/appwrite'
import FoodDataComponent from '../components/FoodDataComponent'
import FeaturedRow from '../components/FeaturedRow'
import { useGlobalContext } from '@/context/GlobalProvider'
import { router } from 'expo-router'

// import {images} from '../../constants'

const Home = () => {

  const { user } = useGlobalContext();

  const {data: J2Food, refetch} = useAppwrite(getJ2Food, []);  

  const {data: JCLFood} = useAppwrite(getJCLFood, []);  

  const {data: KinsFood} = useAppwrite(getKinsFood, []);  

  if(user == null)
    router.replace('/sign-in')

  // const{data: halls} = useAppwrite(getDiningHalls);

  // console.log(J2Food)


  // const {data: pizza, refetch} = useAppwrite(getPizzaStation);

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
                  {user.username}
                </Text>
              </View>
              <View className="mt-0.5">
              <View className="w-10 h-10 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{uri: user?.avatar}}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
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