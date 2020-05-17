# Nutrition+

Nutrition+ is the app that encourages users to intake balanced nutrients and to not skip meals during the COVID-19 pandemic.

The main features our app includes are:
- a questionnaire for analyzing individual nutrition requirements,
- a search engine to find grocery items,
- another search engine to find recipes,
- adding grocery items to My Cart,
- making an order to nearby grocery stores,
- tracking past orders made from Order History,
- archiving recipes to My Meals,
- searching recipes from selected grocery items in My Cart,
- displaying nutrition composition chart of selected grocery items/meals,
- and COVID-19 news feed.

To explore more features of our app, visit [here](https://nutritionplus.herokuapp.com/).

## For Developers: Getting Started

After you cloned our repository on your local machine,

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

## Developed using Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Accessing Database

Our team is using [Firebase](https://firebase.google.com/) to store and manage data populated in the app.

To access the database, visit [here](https://console.firebase.google.com/u/0/project/nutrition-plus-45c57/overview) or contact [cchaff0105@gmail.com](mailto:cchaff0105@gmail.com) to request permission.

## Third-Party APIs

Third-party APIs we are using are as following:

- [U.S. Department of Agriculture (USDA) FoodData Central (FDC) API](https://fdc.nal.usda.gov/api-guide.html) - for searching grocery items
- [EDAMAM Recipe Search API](https://developer.edamam.com/edamam-docs-recipe-api) - for searching recipes
- [News API](https://newsapi.org/) - for displaying news feed related to COVID-19/health issues

API Keys for corresponding API have already been provided in [apiKey.js](https://github.com/rickywychoi/COMP-2800-Team-BBY-32-NutritionPlus/blob/master/apiKey.js).

## IDE

You can choose any kind of development environment on your taste.

However, to maximize your work performance, we encourage you to use [Visual Studio Code](https://code.visualstudio.com/).