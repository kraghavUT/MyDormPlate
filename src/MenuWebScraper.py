import re
import os
import time
import requests
from FoodData import FoodNutritionData, FoodData
from bs4 import BeautifulSoup
from pygoogle_image import image as pi
import imghdr
from PIL import Image



class MenuWebScraper:   


    def collectMenuData(self, dayMenuURL, location):
        html = requests.get(dayMenuURL)
        s = BeautifulSoup(html.content, 'html.parser')

        checkEmpty = s.find("div", class_ = "shortmenuinstructs")
        if(checkEmpty.text == 'No Data Available'):
            print("Empty data list")
            return []

        # Printing Time of day, category, food title, labels
        div_classes = ["shortmenurecipes", "shortmenucats", "shortmenumeals"]
        img_alt_texts = ["Beef Icon", "Eggs Icon", "Fish Icon", "Peanuts Icon", "Pork Icon", 
                        "Shellfish Icon", "Soy Icon", "Tree_Nuts Icon", "Vegan Icon", 
                        "Veggie Icon", "Halal Icon", "Sesame Icon", "Milk Icon", "Wheat Icon"]

        elements = s.find_all(lambda tag: 
                                (tag.name == 'div' and any(cls in tag.get('class', []) for cls in div_classes)) or
                                (tag.name == 'img' and tag.get('alt') in img_alt_texts))

        # test1 = s.find_all("div", class_ = ["shortmenurecipes"])
        # print("Len", len(test1))
        # Printing Time of day, category, food title, labels
        # for element in elements:
        #     if element.name == 'div':
        #         text = element.get_text(strip=True)
        #         if text:
        #             print(text)
        #     elif element.name == 'img':
        #         src = element.get('src')
        #         if src:
        #             print(src)

        FoodDataSheet = []
        currTime = "Breakfast"
        currCat = ""
        currTitle = ""
        listOfLabels = []

        count = 14

        while count < len(elements):
            element = elements[count]
            count = count + 1

            if element.name == 'div':
                text = element.get_text(strip=True)
                if(text == "Breakfast"):
                    continue
                elif(text == "Lunch"):
                    foody = FoodData(currTitle, currCat, listOfLabels, currTime, location)
                    FoodDataSheet.append(foody)
                    # currCat = ""
                    listOfLabels = []
                    currTitle = ""
                    currTime = "Lunch"
                    continue
                elif(text == "Dinner"):
                    foody = FoodData(currTitle, currCat, listOfLabels, currTime, location)
                    FoodDataSheet.append(foody)
                    # currCat = ""
                    listOfLabels = []
                    currTitle = ""
                    currTime = "Dinner"

                    continue
                elif(text.startswith('-')):
                    if currTitle == "":
                        tempStr = text.replace("-", "")
                        currCat = tempStr
                    else:
                        foody = FoodData(currTitle, currCat, listOfLabels, currTime, location)
                        FoodDataSheet.append(foody)
                        # currCat = ""
                        listOfLabels = []
                        tempStr = text.replace("-", "")
                        currCat = tempStr
                        currTitle = ""
                    
                else:
                    if(currTitle == ""):
                        currTitle = text
                    else:
                        foody = FoodData(currTitle, currCat, listOfLabels, currTime, location)
                        FoodDataSheet.append(foody)
                        # currCat = ""
                        listOfLabels = []
                        currTitle = text

            elif element.name == "img":
                    # src = element.get('src')
                    alt = element.get('alt')
                    modif = alt.replace(" Icon", "")
                    listOfLabels.append(modif)
        
        foody = FoodData(currTitle, currCat, listOfLabels, currTime, location)
        FoodDataSheet.append(foody)

        # for food in FoodDataSheet:
        #     print(food)
        
        return FoodDataSheet

    #returns all label links in a day's menu
    def scrapeLandingPage(self, dayMenuURL, FoodDataSheet):
        
        namesOnly = []
        for foods in FoodDataSheet:
            namesOnly.append(foods.getTitle())
        
        html = requests.get(dayMenuURL)
        s = BeautifulSoup(html.content, 'html.parser')

        linkers = s.find_all("a")
        counter = 0

        halfLinks = []
        for link in linkers:
            # time.sleep(1)
            src = link.get('href')
            if src:
                if 'longmenu' not in src:
                    continue
                # print("Link: ", src)
                halfLinks.append(src)
                counter = counter +1

        breakfastLink= "".join(["https://hf-foodpro.austin.utexas.edu/foodpro/", halfLinks[0]])
        lunchLink = "".join(["https://hf-foodpro.austin.utexas.edu/foodpro/", halfLinks[1]])
        dinnerLink = "".join(["https://hf-foodpro.austin.utexas.edu/foodpro/", halfLinks[2]])

        html2 = requests.get(breakfastLink)
        html3 = requests.get(lunchLink)
        html4 = requests.get(dinnerLink)

        scrape_B = BeautifulSoup(html2.content, 'html.parser')
        scrape_L = BeautifulSoup(html3.content, 'html.parser')
        scrape_D = BeautifulSoup(html4.content, 'html.parser')

        allLabelLinks = []

        divs_B = scrape_B.find_all("div", class_="longmenucoldispname")
        divs_L = scrape_L.find_all("div", class_="longmenucoldispname")
        divs_D = scrape_D.find_all("div", class_="longmenucoldispname")
        counter2 = 0
        
        for div in divs_B:

            links = div.find_all('a')
            
            for link in links:
                if link:
                    href = link.get('href')
                    if(self.checkInList(link.text, namesOnly)):
                        allLabelLinks.append("".join(["https://hf-foodpro.austin.utexas.edu/foodpro/", href]))
                        counter2 = counter2 +1
        
        for div in divs_L:
            links = div.find_all('a')
            for link in links:
                if link:
                    href = link.get('href')
                    if(self.checkInList(link.text, namesOnly)):
                        allLabelLinks.append("".join(["https://hf-foodpro.austin.utexas.edu/foodpro/", href]))
                        counter2 = counter2 +1
                    # print(link.text)
                    # print("Link: ", src)
                    # counter2 = counter2 +1
        # counter2 = 0
        for div in divs_D:
            links = div.find_all('a')
            for link in links:
                if link:
                    href = link.get('href')
                    if(self.checkInList(link.text, namesOnly)):
                        allLabelLinks.append("".join(["https://hf-foodpro.austin.utexas.edu/foodpro/", href]))
                        counter2 = counter2 +1
                    # print(link.text)
                    # print("Link: ", src)
                    # counter2 = counter2 +1
                
        # print(counter2)
        # for link in allLabelLinks:
        #     print("Link: ", link)

        return allLabelLinks
    
    def checkInList(self, checkMe, FoodList):
        for food in FoodList:
            if(food == checkMe):
                return True
        return False

    def downloadImage(self, title):
        fixedTitle1 = title.replace(',', '').replace('"', '').replace('/', '').replace("'", "")
        fixedTitle = fixedTitle1.replace(' ', '_')
        fixedTitle = fixedTitle.replace('/', '')
        fixedTitle = fixedTitle.replace('"', '').replace("'", "")
        # print(fixedTitle)
        save_dir= f'images/{fixedTitle}'
        pi.download(keywords=fixedTitle1, limit=1)
        # time.sleep(3)
        for filename in os.listdir(save_dir):
            # print(f'File found: {filename}')
            return os.path.join(save_dir, filename)

        # fixedTitle = fixedTitle1.replace(' ', '_')
        
        # fixedTitle = fixedTitle.replace('/', '')
        # fixedTitle = fixedTitle.replace('"', '')
        
        # search_directory = f'images/{fixedTitle}'
        # initialSave = f'{fixedTitle1}{"_1"}'

        # extension = self.get_image_extension(search_directory)
        # file_name = f'{initialSave}.{extension}'
        
        # file_path = self.find_file(file_name, search_directory)
        # if file_path:
        #     print(f'File found: {file_path}')
        #     return file_path
        # else:
        #     print('File not found')



    
    def find_file(self, file_name, search_directory):
        for root, dirs, files in os.walk(search_directory):
            if file_name in files:
                return os.path.join(root, file_name)
        return None
    
    def get_image_extension(self, file_path):
    # First, try to use imghdr to detect the image type
        extension = imghdr.what(file_path)
        if extension is not None:
            return extension

        # If imghdr fails, try using Pillow
        try:
            with Image.open(file_path) as img:
                return img.format.lower()
        except Exception as e:
            print(f"Failed to determine image type using Pillow: {e}")
            return None

    def collectNutrientInfo(self, urlFoodNutrientFacts): 
        # print(urlFoodNutrientFacts)
        response = requests.get(urlFoodNutrientFacts)
        html_content = response.text
        soup = BeautifulSoup(html_content, 'html.parser')
        foodTitle = soup.find("div", class_="labelrecipe")
        # print(soup.prettify)

        labelNotAvail = soup.find("div", class_='labelnotavailable')
        if(labelNotAvail):
            foodyInfo = FoodNutritionData(foodTitle.text, -1, -1, -1, -1, -1,
                                      -1, -1, -1, -1, -1, -1,
                                      -1, -1, -1, -1, 'No Nutrition Info Available')
            return foodyInfo

        tableOfStuff = soup.find('table', attrs={
                'border': "0",
                'cellpadding': "0",
                'cellspacing': "0",
                'width': '100%',
                'align': "left"
            })
        # print(tableOfStuff)
        nutrifacts = tableOfStuff.find_all("span", class_="nutfactstopnutrient")

        pattern = r'\d+\.\d+|\d+'
        infoList = []
        counter = 0

        while counter < len(nutrifacts):
            fact = nutrifacts[counter]
            text = fact.get_text(strip=True)
            # print(text)
            # print(text)
            matches = re.search(pattern, text)
            if matches:
                val = matches.group()
                numeric_value = float(val) if '.' in val else int(val)

                infoList.append(numeric_value)
                # print (numeric_value)  # Output: 4.4
            else:
                infoList.append(0)
            counter = counter +1
        
        # print(infoList)
        # print(len(infoList))
        


        calories = infoList[0]
        fat= infoList[2]
        saturated_fat= infoList[4]
        trans_fat= infoList[6]
        cholesterol= infoList[8] 
        sodium= infoList[10]
        carbs= infoList[12] 
        dietary_fibers= infoList[14] 
        total_sugars= infoList[16]
        added_sugars= infoList[18] 
        protein= infoList[20] 
        vit_D= infoList[22] 
        calcium= infoList[24]
        iron = infoList[26]
        potassium= infoList[28] 
        
        #ingredients list
        ingredientsList = soup.find("span", class_="labelingredientsvalue")
        # print("Ingredients List: ", ingredientsList.text)

        # ingListy = ingredientsList.text.split(',')
        # print(ingListy)

        #allergens list
        # allergensList = soup.find("span", class_="labelallergensvalue")
        # print("Allergens List: ", allergensList.text)

        foodyInfo = FoodNutritionData(foodTitle.text, calories, fat, saturated_fat, trans_fat, cholesterol,
                                      sodium, carbs, dietary_fibers, total_sugars, added_sugars, protein,
                                      vit_D, calcium, iron, potassium, ingredientsList.text)
        # print(foodyInfo)
        return foodyInfo