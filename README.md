# Shopping Cart: ReactJS + Woocommerce

## Description
This project aims to be a web/mobile interfase to enhance user experience on Woocommerce platform. It is a ReactJS application that uses the Rest API provided by Woocommerce to display categories, products, and create orders.

![Screenshot](https://user-images.githubusercontent.com/624592/47965141-0314ba00-e022-11e8-81e9-c825dad7722c.png)

## Installation
You need to have a Woocommerce instance running and also created a ``client_id`` and ``client_secret`` from the Wocommerce Interfase. [Check this link for extra information](https://docs.woocommerce.com/document/woocommerce-rest-api/#section-3)

- Clone this repository
- Run ``npm install``
- Copy default config file ``cp .env.default .env``
- Edit ``.env`` and fill with your generated API keys
- Save and run ``npm start``

## Development
This is a free time project so it's currently on development. Not ready for production.
If you want to participate, feel free to contact me.

## Woocommerce Notes

In order to avoid problems like :

```
Access to XMLHttpRequest at 'https://HOST/wp-json/wc/v3/products/categories?per_page=100' from origin 'http://localhost:3000' has been blocked by CORS policy: Request header field X-XSRF-TOKEN is not allowed by Access-Control-Allow-Headers in preflight response.

```

You should add you the Woocommerce headers this line:

```
header('Access-Control-Allow-Headers: Content-Type, x-xsrf-token, x_csrftoken');
```
