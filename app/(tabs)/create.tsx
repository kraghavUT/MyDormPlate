import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton'
import { ArrowPathIcon } from 'react-native-heroicons/outline'
import FeaturedRow from '../components/FeaturedRow'
import useAppwrite from '@/lib/useAppwrite'
import { getLeastFat, getBestProtein, getUserData, getBestForUser } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import SuggestedMealRow from '../components/SuggestedMealRow'

const create = () => {
  const { user } = useGlobalContext();


  const {data: bestProt} = useAppwrite(getBestProtein, []);
  const {data: leastFat} = useAppwrite(getLeastFat, []);
  const {data: bestForUser} = useAppwrite(getBestForUser, [user]);



  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'
      showsVerticalScrollIndicator={false}>
          <Text className='items-center text-2xl text-white font-psemibold'>
            Generate Meals
          </Text>
            <SuggestedMealRow
              location={"For you"}
              description={"Based on your health goals"}
              locFoodData={bestForUser}
            />

            <SuggestedMealRow
              location={"Best protein"}
              description={"Highest protein dishes"}
              locFoodData={bestProt}
            />

            <SuggestedMealRow
              location={"Least Fat"}
              description={"Fat content <3g"}
              locFoodData={leastFat}
            />


          {/* <View className='items-end'>
            <ArrowPathIcon size={25}/>
          </View> */}
          
        </ScrollView>
    </SafeAreaView>
  )
}

export default create