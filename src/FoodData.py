
class FoodNutritionData:
    def __init__(self, title, calories, fat, saturated_fat, trans_fat,
                 cholesterol, sodium, carbs, dietary_fibers, total_sugars, added_sugars, protein, vit_D, calcium,
                 iron, potassium, ingredients_list):
        self.title = title
        self.calories = calories
        self.fat = fat
        self.trans_fat = trans_fat
        self.cholesterol = cholesterol
        self.sodium = sodium
        self.carbs = carbs
        self.dietary_fibers = dietary_fibers
        self.total_sugars = total_sugars
        self.added_sugars = added_sugars
        self.protein = protein
        self.vit_D = vit_D
        self.calcium = calcium
        self.iron = iron
        self.saturated_fat = saturated_fat
        self.potassium = potassium
        self.ingredients_list = ingredients_list
    
    def get_title(self):
        return self.title

    def get_calories(self):
        return float(self.calories)

    def get_fat(self):
        return float(self.fat)

    def get_trans_fat(self):
        return float(self.trans_fat)

    def get_cholesterol(self):
        return float(self.cholesterol)

    def get_sodium(self):
        return float(self.sodium)

    def get_carbs(self):
        return float(self.carbs)

    def get_dietary_fibers(self):
        return float(self.dietary_fibers)

    def get_total_sugars(self):
        return float(self.total_sugars)

    def get_added_sugars(self):
        return float(self.added_sugars)

    def get_protein(self):
        return float(self.protein)

    def get_vit_D(self):
        return float(self.vit_D)

    def get_calcium(self):
        return float(self.calcium)

    def get_iron(self):
        return float(self.iron)

    def get_saturated_fat(self):
        return float(self.saturated_fat)

    def get_potassium(self):
        return float(self.potassium)

    def get_ingredients_list(self):
        return str(self.ingredients_list)

    def __str__(self):
        return f"Food: {self.title}, Cal: {self.calories}, Fat: {self.fat}, Chol: {self.cholesterol}, Sodium: {self.sodium}, Carbs: {self.carbs}, Fibers: {self.dietary_fibers}, Tot_sugs: {self.total_sugars}"


class FoodData:
    

    def __init__(self, title, category, labels, time, location):
        self.title = title
        self.category = category
        self.labels = labels
        self.time = time
        self.location = location
    def __str__(self):
        return f"Food: {self.title}, Category: {self.category}, Labels: {self.labels}, Time: {self.time}"
    
    def getTitle(self):
        return f"{self.title}"
    def getCat(self):
        return f"{self.category}"
    def getLabels(self):
        return self.labels
    def getTime(self):
        return f"{self.time}"
    def getLoc(self):
        return f"{self.location}"
    
