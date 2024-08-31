import requests
from bs4 import BeautifulSoup

url =  'https://hf-foodpro.austin.utexas.edu/foodpro/shortmenu.aspx?sName=University+Housing+and+Dining&locationNum=12&locationName=J2+Dining&naFlag=1'
html = requests.get(url)


s = BeautifulSoup(html.content, 'html.parser')

# Printing Time of day, category, food title, labels
div_classes = ["shortmenurecipes", "shortmenucats", "shortmenumeals"]
img_alt_texts = ["Beef Icon", "Eggs Icon", "Fish Icon", "Peanuts Icon", "Pork Icon", 
                 "Shellfish Icon", "Soy Icon", "Tree_Nuts Icon", "Vegan Icon", 
                 "Veggie Icon", "Halal Icon", "Sesame Icon", "Milk Icon", "Wheat Icon"]

elements = s.find_all(lambda tag: 
                         (tag.name == 'div' and any(cls in tag.get('class', []) for cls in div_classes)) or
                         (tag.name == 'img' and tag.get('alt') in img_alt_texts))

# Printing Time of day, category, food title, labels
# for element in elements:
#     if element.name == 'div':
#         text = element.get_text(strip=True)
#         if text:
#             print(text)
#     elif element.name == 'img':
#         alt = element.get('alt')
#         if alt:
#             print(alt)


# Printing nutrient information

url2 = 'https://hf-foodpro.austin.utexas.edu/foodpro/label.aspx?locationNum=12&locationName=J2+Dining&dtdate=06%2f13%2f2024&RecNumAndPort=400328*1'

html2 = requests.get(url2)
soup = BeautifulSoup(html2.content, 'html.parser')

table = soup.find("table")

servingfacts = table.find_all("div")
sizefacts = table.find_all("td", class_=["nutfactscalories", "nutfactscaloriesval"])

for sizefact in sizefacts:
    servingfacts.append(sizefact)

for fact in servingfacts:
    print(fact.text)



nutrifacts = table.find_all("span", class_="nutfactstopnutrient")

for nutrifact in nutrifacts:
    print(nutrifact.text)

#ingredients list

ingredientsList = soup.find("span", class_="labelingredientsvalue")
print("Ingredients List: ", ingredientsList.text)

#allergens list

allergensList = soup.find("span", class_="labelallergensvalue")
print("Allergens List: ", allergensList.text)


