# Nutrition+

Nutrition+ encourages users to have a balanced diet and analyze meals during the COVID-19 pandemic.

To explore our app, visit [here](https://nutritionplus.herokuapp.com/).

## Acknowledgement

Thank you to [React Bootstrap](https://react-bootstrap.github.io/), [React Icons](https://www.npmjs.com/package/react-icons), ColorLib 404 v3, [Lukehaas's CSS Loading Spinners](https://lukehaas.me/projects/), and [Icons8](icons8.com/icons) for helping in designing our app.

Nutrition+ uses [Health Canada's table of daily values](https://www.canada.ca/en/health-canada/services/technical-documents-labelling-requirements/table-daily-values/nutrition-labelling.html#p1) to create your daily result.

## Third-Party APIs

Thank you to the following third party APIs for helping us build the features of our application:

- [U.S. Department of Agriculture (USDA) FoodData Central (FDC) API](https://fdc.nal.usda.gov/api-guide.html) - for searching grocery items
- [EDAMAM Recipe Search API](https://developer.edamam.com/edamam-docs-recipe-api) - for searching recipes
- [News API](https://newsapi.org/) - for displaying news feed related to COVID-19/health issues
- [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial) - for finding nearby grocery stores

API Keys for each API are provided in [apiKey.js](https://github.com/rickywychoi/COMP-2800-Team-BBY-32-NutritionPlus/blob/master/apiKey.js).

## The Team

Nutrition+ was created by BBY-32 for COMP 2800 Projects 2. We are a group of term 1 and term 2 BCIT CST students. Our team members are:

- [Ricky Choi](https://github.com/rickywychoi)
- [Brian Seo](https://github.com/seoabunga)
- [Jason Cheung](https://github.com/jasc618)
- [Jimmy Lu](https://github.com/lujianming000)

For more information about our team and mission statement, visit the About Us page on our site.

## Main Features

The main features our app includes are:

- a questionnaire analyzing individual nutrition requirements,
- a search engine to find grocery items,
- another search engine to find recipes,
- adding grocery items to My Cart,
- create a virtual shopping list tracking items from each store,
- tracking past orders made from Order History,
- archiving recipes to My Meals,
- searching recipes from grocery items in My Cart,
- displaying nutrition composition chart of selected grocery items/meals,
- and COVID-19 related news feed.

## Testing

The testing for any of these features can be found [here](https://docs.google.com/spreadsheets/d/1vb4LZBETcOYADizoW4aevlNQqGlVx-JA/edit#gid=993138938).

## File Structure

<details>
<summary>Click to open project hierarchy</summary>
  
```
    The top level contains these files:
    ├── .gitignore                               # gitignore file
    ├── apiKey.js                                # Contains all the keys for third-party APIs
    ├── firebaseConfig.js                        # Firebase configuration
    |__ server.js                                # Server configuration to run next app on top of it
    |
    ├── .next                                    # next.js folder
    ├── components                               # Stateless components (classes and/or functions)
    │   └── DateFormatter                        # Folder for DateFormatter
    │            DateFormatter.js                # formats the timestamp to readable format
    │   └── ErrorPage                            # Folder for Error page
    │            ErrorPage.js                    # Error page
    │   └── Map                                  # Folder for Map
    │            Map.js                          # Shows grocery store and your location on map
    │   └── NewsFeed                             # Folder for News Feed.
    │            NewsFeed.js                     # The News Feed on landing page
    │   └── SocialMedia                          # Folder for Social Media
    │            SocialMedia.js                  # Allows for logging in to social media and sharing app
    │   └── UI                                   # Folder for anything related to UI
    │            Layout.js                       # Creates the basic layout for app
    │            NavBar.js                       # NavBar for app
    │            PopOver.js                      # Creates the popover for physical activity level
    │            Spinner.js                      # Loading spinner
    │            WelcomeBanner.js                # Welcome banner on the landing page
    ├── containers                               # Components with their own states
    │   └── Chart                                # Folder for Charts
    │            GroceryChart.js                 # Nutrient Satisfaction chart for groceries
    |            MyMeals.js                      # Nutrient Satisfaction chart for My Meals
    │            RecipeChart.js                  # Nutrient Satisfaction chart for recipes
    │   └── QuestionnaireResult                  # Folder for QuestionnaireResults
    │            dailyValue.json                 # File for daily values of each age group
    │            QuestionnaireResult.js          # Daily value results for each user
    │   DeleteAccount.js                         # Delete an account
    │   GroceryStores.js                         # View grocery stores
    │   ItemSearch.js                            # Search up grocery items
    │   MyCart.js                                # View your cart
    │   MyMeals.js                               # View your meals
    │   MyOrder.js                               # View my orders
    │   OrderHistory.js                          # Shows a history of orders the user has made
    │   Questionnaire.js                         # Basic questionnaire
    │   RecipeSearch.js                          # Search a recipe
    │   YourDailyValue.js                        # Shows the user their daily recommended values
    ├── node_modules                             # packages installed by npm
    ├── pages                                    # folder for pages
    │   └── myaccount                            # Folder for my account
    │   │       index.js                         # loads the my account page
    │   └── mycart                               # Folder for my cart
    │   │       index.js                         # loads the my cart page
    │   └── mymeals                              # Folder for my meals
    │   │       index.js                         # loads the my meals page
    │   └── myorder                              # Folder for my order
    │   │   └── history                          # Folder for order history
    │   │         [orderId].js                   # order history file
    │   │         index.js                       # loads the order history page
    │   │       index.js                         # loads the my order page
    │   └── questionnaire                        # Folder for questionnaire
    │   └── recipe                               # Folder for recipe
    │   └── search                               # Folder for search
    │   └── yourdailyvalue                       # Folder for yourdailyvalue
    │   _app.js                                  # top-level app
    │   aboutus.js                               # about us page
    │   index.js                                 # landing page
    │   login.js                                 # login page
    ├── public                                   # files containing images and icons
    │   └── images                               # images folder.
    │   │       account-placeholder.jpg          # account placeholder image
    │   │       brian_pic.jpg                    # brian image
    │   │       coffin-guys.png                  # coffin guys meme for easter egg
    │   │       favicon2.png                     # favicon for app name
    │   │       jason_pic.jpg                    # jason image
    │   │       jimmy_pic.png                    # jimmy image
    │   │       nutrition.jpg                    # image for banner
    │   │       person.png                       # 
    │   │       ricky_pic.jpg                    # ricky image
    │   │       shopping.png                     # store location
    │   │   favicon2.ico                         # favicon
    ├── store                                    # folder for actions/reducer (sharing states)
    │       actions                              # actions sending data from app to store
    │       reducer                              # describe state management (current state, new state)
    ├── styles                                   # folder for CSS
    │       About.module.css                     # CSS for About Us
    │       AccountPage.module.css               # CSS for My Account
    │       buttons.module.css                   # CSS for buttons
    │       global.css                           # global CSS for app
    │       GroceryStores.module.css             # CSS for Grocery Store
    │       ItemDetailsPage.module.css           # CSS for Item Details
    │       ItemSearch.module.css                # CSS for Item Search
    │       login.module.css                     # CSS for Logging in
    │       mainHome.module.css                  # CSS for Main Home
    │       menuQuestionnaire.module.css         # CSS for Recipe Search
    │       MyCart.module.css                    # CSS for My Cart
    │       MyOrder.module.css                   # CSS for My Order
    │       NavBar.module.css                    # CSS for the Navbar
    │       NewsFeed.module.css                  # CSS for News Feed
    │       OrderHistory.module.css              # CSS for Order History
    │       PopOver.module.css                   # CSS for Popovers
    │       Questionnaire.module.css             # CSS for Questionnaire page
    │       QuestionnaireResult.module.css       # CSS for QuestionnaireResult page
    │       RecipeDetails.module.css             # CSS for Recipe Details
    │       SearchList.module.css                # CSS for Search
    │       Spinner.module.css                   # CSS for Loading Spinner
    │       WelcomeBanner.module.css             # CSS for Welcome Banner
```
</details>

## Developed using Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## IDE

You can choose any development environment you would like.

However, to maximize your work performance, we encourage you to use [Visual Studio Code](https://code.visualstudio.com/).

## Accessing Database

Our app uses [Firebase](https://firebase.google.com/) to store and manage data populated in the app.

To access the database, visit [here](https://console.firebase.google.com/u/0/project/nutrition-plus-45c57/overview) or contact [cchaff0105@gmail.com](mailto:cchaff0105@gmail.com) to request permissions.

## For Developers: Getting Started

After you've cloned our repository on your local machine,

- First, install all the dependencies:

```bash
npm install
# or
yarn install
```

- Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
