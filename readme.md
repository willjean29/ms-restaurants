# MICROSERVICES RESTAURANTS API

![Diagrama de componentes](https://user-images.githubusercontent.com/61263958/162535170-e7deacba-ba26-4f53-b242-b65d233a146c.png)

# Description

Application to manage food dishes, storage and recipes built under a microservices architecture

## Component Diagram

- 👉 [Diagram](https://user-images.githubusercontent.com/61263958/162535170-e7deacba-ba26-4f53-b242-b65d233a146c.png)

## Demo Website

- 👉 AWS : MS GATEWAY [http://3.82.162.195:8000](http://3.82.162.195:8000/)

- 👉 AWS - MS STORE : [http://3.82.162.195:8000/store](http://3.82.162.195:8000/store)
- 👉 AWS - MS RECIPE: [http://3.82.162.195:8000/recipe](http://3.82.162.195:8000/recipe)
- 👉 AWS - MS ORDERS : [http://3.82.162.195:8000/orders](http://3.82.162.195:8000/orders)

## Documentation

- 👉 Swagger - MS STORE : [http://3.82.162.195:5000/store/document](http://3.82.162.195:5000/store/document)
- 👉 Swagger - MS RECIPE : [http://3.82.162.195:5000/recipe/document](http://3.82.162.195:5000/recipe/document)
- 👉 Swagger - MS ORDERS : [http://3.82.162.195:5000/orders/document](http://3.82.162.195:5000/orders/document)

## Technologies

- NodeJs and Express for server
- Javascript: ES6+, Array Functions, Rendering System
- Database: Mongoose Odm and MongoDB
- Development: ESLint, Babel, Git, Github
- Deployment: AWS, Docker, Docker Compose

# Features

1. Server and Database
2. Endpoints for Store
3. Endpoints for Recipe
4. Endpoints for Orders
5. Proxy
6. Error Handler
7. ODM and models
8. Shopping Cart
9. Environment Variables
10. Javascript

## Run Project

```
# Git clone https://github.com/willjean29/ms-restaurants.git
# Run Docker Container
  docker-compose build
  docker-compose up -d
```
