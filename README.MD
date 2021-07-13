# Welcome to K-Store

**Project Link** - https://v-mart.vercel.app/

- K-Store, or the name in app is V-mart (requested by my girlfriend), is an online market for top quality animal product.

- The web app is fully responsive so you can get your meat from any device.

- Powered by NextJS, you'll get the feel of React App while still SEO optimized using Next's Server Side Rendering.

- If you want to checkout with Credit Card, use card number 4242 4242 4242 (Stripe test card)

## Table of contents

1. [Installation](#installation-zap)
2. [Tech Stack](#tech-stack-)
3. [API](#api-)
4. [Screenshots](#screenshots-)

## Installation :zap:

### Steps to follow:

1. Clone this repo by running the following command:

```bash
git clone https://github.com/khanhhua165/k-store
```

2. Now install all the required packages:

```bash
cd server && npm install
```

```bash
cd client && npm install
```

3. Create a `nodemon.json` file in the 'server' folder and copy the format of `nodemon-sample.json` file.  
   You have to have your own Mongodb database, Sendgrid, and Stripe api key to run this app.

4. Create a `env.local` file in 'client' folder and copy the format of `env.local.sample` file.

5. Start node server first and then react by running the following commands in separate prompts:

```bash
cd server && npm run watch
```

```bash
cd server && npm run dev
```

```bash
cd client && npm run dev
```

5. 🎉 Open your browser and go to `https://localhost:3000`

## Tech Stack &#128640;

### Frontend

- [ReactJs](https://reactjs.org/)
- [NextJs](https://nextjs.org/)
- [TailwindCss](https://tailwindcss.com/)
- [Unstated-next](https://github.com/jamiebuilds/unstated-next)
- [React-hook-form](https://react-hook-form.com/)

### Backend

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [JWT](https://jwt.io/)

## API &#128421;

- [Sendgrid](https://sendgrid.com/)
- [Stripe](https://stripe.com/)

## Screenshots &#128248;

### Landing Page

![home-1](https://user-images.githubusercontent.com/63698721/125415926-d0cb7066-ed0c-45f9-a312-a5822a14f91c.png)
![home-2](https://user-images.githubusercontent.com/63698721/125416157-9f676535-b666-48b4-99e4-dd2a2e9be17d.png)

### Our Mission Page

![mission](https://user-images.githubusercontent.com/63698721/125416506-f2955527-b599-415a-bbc5-256288b6ff4b.png)

### Meat Shopping Page

![shop-1](https://user-images.githubusercontent.com/63698721/125416312-523bfc68-094e-4fd4-ae4c-0949788cb769.png)
![shop-2](https://user-images.githubusercontent.com/63698721/125416428-1cd129e3-de2d-4850-8c84-70e0439aebf6.png)

### Product Detail Page

![product-1](https://user-images.githubusercontent.com/63698721/125416918-b24507b0-e491-436b-83d5-3d11d992c5cf.png)
![product-2](https://user-images.githubusercontent.com/63698721/125417008-ed5ecd61-7f8c-4182-ba7c-a3003ca0058f.png)

### Cart Modal

![cart](https://user-images.githubusercontent.com/63698721/125416691-4aaeb177-a457-49f2-8379-93450d378850.png)

### Checkout Page

![checkout-1](https://user-images.githubusercontent.com/63698721/125417243-99353205-6d00-4913-89a3-f3892035e50e.png)
![checkout-2](https://user-images.githubusercontent.com/63698721/125417768-2c809bab-0f69-4f94-a588-8c7ac4b2954d.png)

### Order Page

![order](https://user-images.githubusercontent.com/63698721/125428880-0d3b8f58-b6e1-4ab9-851c-70a5b16f60af.png)

### Admin Dashboard

![admin-1](https://user-images.githubusercontent.com/63698721/125417991-bce6c669-2793-4cf1-816f-60b0c12a465f.png)
![admin-2](https://user-images.githubusercontent.com/63698721/125418095-79980a69-a7ea-49d2-bb69-510cf62b0135.png)
![admin-3](https://user-images.githubusercontent.com/63698721/125418228-3f511d09-a994-464e-a2ee-38f331ddc914.png)
