
# [Parchi [PWA]](https://parchiapp.vercel.app/)

Record management solution for medical records.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)



### installation
- you need to create a ```.env``` file with following keys
```
SERVER_PORT
SECRET
DBURI
HASH
JWT
FINALSTRAW
CORSORIGIN
```
- then for both Frontend and Backend folders, do 
```
npm i 
```
- Now you are good to start the project
```
npm run dev 
```

## Flow:
- create user [patient / doctor]
- login
- upload medical respord [images/ pdf]
- patients choose doctors who will be provided access to the resource

## Techstack
### Frontend
  - Next.js
  - next-PWA
  - tailwind

### Backend
- Express.js
- Jwt
- MongoDB
- Grid-fs
- Multer

### Current issues
While the app workd fine on laptops/ compuetrs, viewing files on mobile devices downloads the file instead of preview, which woudl require a bit more work to see what's causing the issue. Tried approached included, ```embed,object and iframe ``` tags




## Demo

https://parchiapp.vercel.app/
## Contributing

For this particular project, outside contributions are **not welcomed** as this project is needed for college evaluation.

