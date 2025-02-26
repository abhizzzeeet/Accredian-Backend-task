### Since render doesnt allow deploying MySQL DB for free, also I didnt found any service allowing to deploy MySQL DB for free so the DB was not connected to live backend .

### But I have shared a video below where full stack website including frontend, backend, MySQL DB is working fine in localhost.

## Setup backend locally

Step 1 : Provide the following environment variable keys with you own values , i have not git ignored the .env file

DATABASE_URL="mysql://root:abhijeet@123@localhost:3306/accredian_db" 

EMAIL_USER="abhijeetbasfore@gmail.com"

EMAIL_PASS = "tvyh axku jxyl uvwx"

Step2 : Run commands in order

`npm install`

`npm run prisma-generate`

For local development : `npm run prisma-migrate-dev`  OR  For production development:  `npm run prisma-migrate-deploy`

To run server locally :  `node .\index.js`

NOTE:  Deployed frontend URL : `https://accredian-frontend-task-blue-five.vercel.app/` will automatically connect to local backend running port 5000

https://github.com/user-attachments/assets/33938ca3-e59d-4714-8205-2593552207bd

