import { View, Text , FlatList, ScrollView, Image, TouchableOpacity} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLocalSearchParams, useGlobalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon, StarIcon } from 'react-native-heroicons/outline';
import NutrientInfoRow from './components/NutrientInfoRow';
import { getImage } from '@/lib/appwrite';



const MoreInfoFoodScreen = () => {
    const {Title, Category, modifiedTagList, modifiedIngredientsList, Time, Calories, Fat,	Saturated_Fat,	Trans_Fat,	Cholesterol, Sodium, 
        Carbohydrates,	Dietary_Fiber,	Total_Sugars, Added_Sugars, Protein, 
        Vitamin_D,	Calcium, Iron, Potassium, Ingredients_List, ImageURL, Location} = useLocalSearchParams();
    const navigation = useNavigation();
     
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])


    return (
        <ScrollView>
            <View className='relative'>
                <Image source={{uri: ImageURL}}
                    className='w-full h-56 bg-gray-300 p-4'
                />

                <TouchableOpacity 
                    onPress={navigation.goBack} 
                    className='absolute top-14 left-5 p-2 bg-gray-200 rounded-full'>
                    <ArrowLeftIcon size={35} color={'#00CCBB'} />
                </TouchableOpacity>
            </View>

            <View className='bg-white'>
                <View className='px-4 pt-4'>
                    <Text className='text-3xl font-bold'>{Title}</Text>
                     
                    <View className='flex-row space-x-2 my-1'>

                        <View className='flex-row items-center space-1'> 
                            {/* <StarIcon color={'green'} size={22} opacity={0.5}/>  */}
                            <Text className='text-xs text-gray-500'>
                                Contains: {modifiedIngredientsList} 
                                
                                {'\n'}
                                
                                Tags: {modifiedTagList}
                            </Text>
                            
                        </View>
                    </View>
                </View>
            

            </View>
        
            <View>
                <Text className='px-4 pt-6 mb-3 font-bold text-xl'> Nutrient Information</Text>
                <NutrientInfoRow
                    title={"Calories"}
                    value={Calories}
                    units={'kcal'}
                />
                <NutrientInfoRow
                    title={"Fat"}
                    value={Fat}
                    units={'grams'}
                />
                <NutrientInfoRow
                    title={"Saturated Fat"}
                    value={Saturated_Fat}
                    units={'grams'}
                />
                <NutrientInfoRow
                    title={"Trans Fat"}
                    value={Trans_Fat}
                    units={'grams'}
                />
                <NutrientInfoRow
                    title={"Saturated Fat"}
                    value={Saturated_Fat}
                    units={'grams'}
                />
                <NutrientInfoRow
                    title={"Cholesterol"}
                    value={Cholesterol}
                    units={'mg'}
                />
                <NutrientInfoRow
                    title={"Sodium"}
                    value={Sodium}
                    units={'mg'}
                />
                <NutrientInfoRow
                    title={"Carbohydrates"}
                    value={Carbohydrates}
                    units={'grams'}
                />
                <NutrientInfoRow
                    title={"Dietary Fiber"}
                    value={Dietary_Fiber}
                    units={'grams'}
                />
                <NutrientInfoRow
                    title={"Saturated Fat"}
                    value={Saturated_Fat}
                    units={'grams'}
                />
                <NutrientInfoRow
                    title={"Total Sugars"}
                    value={Total_Sugars}
                    units={'grams'}
                />
                <NutrientInfoRow
                    title={"Added Sugars"}
                    value={Added_Sugars}
                    units={'grams'}
                />
                <NutrientInfoRow
                    title={"Protein "}
                    value={Protein}
                    units={'grams'}
                />
                <NutrientInfoRow
                    title={"Vitamin D"}
                    value={Vitamin_D}
                    units={'mcg'}
                />
                <NutrientInfoRow
                    title={"Calcium"}
                    value={Calcium}
                    units={'mg'}
                />
                <NutrientInfoRow
                    title={"Iron"}
                    value={Iron}
                    units={'mg'}
                />
                <NutrientInfoRow
                    title={"Potassium"}
                    value={Potassium}
                    units={'mg'}
                />
                <NutrientInfoRow
                    title={"Ingredients List"}
                    value={Ingredients_List}
                    units={'All Ingredients'}
                />

            </View>


        </ScrollView>
    )

}



export default MoreInfoFoodScreen