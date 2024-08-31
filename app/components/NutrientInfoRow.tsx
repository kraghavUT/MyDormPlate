import { View, Text } from 'react-native'
import React from 'react'

const NutrientInfoRow = ({
    title, value, units
}) => {


  return (
    <View>

      <Text className='text-lg mb-1'>{title} ({units}) </Text>
      <Text className='text-grey-400'> {value}</Text>
    </View>
  )
}

// NutrientInfoRow.defaultProps = {
//     Calories: 'N/A', 
//     Fat: 'N/A', 
//     Saturated_Fat: 'N/A', 
//     Trans_Fat: 'N/A',	
//     Cholesterol: 'N/A', 
//     Sodium: 'N/A', 
//     Carbohydrates: 'N/A',	
//     Dietary_Fiber: 'N/A', 
//     Total_Sugars: 'N/A', 
//     Added_Sugars: 'N/A', 
//     Protein: 'N/A', 
//     Vitamin_D: 'N/A',	
//     Calcium: 'N/A', 
//     Iron: 'N/A', 
//     Potassium: 'N/A', 
//     Ingredients_List: 'N/A',
    
//   };
  

export default NutrientInfoRow