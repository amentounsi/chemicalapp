# 🚀 Complete Setup Guide for Chemical App

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **Java** (v17 or higher)
- **Maven** (v3.6 or higher)
- **Angular CLI** (`npm install -g @angular/cli`)

## 🔧 Backend Setup (Spring Boot)

### 1. Navigate to Backend Directory
```bash
cd "package com.example.demo"
```

### 2. Build and Run Backend
```bash
mvn clean install
mvn spring-boot:run
```

### 3. Verify Backend is Running
- Open: http://localhost:8080/produits
- You should see a JSON array with sample products
- H2 Console: http://localhost:8080/h2-console

## 🎨 Frontend Setup (Angular)

### 1. Open New Terminal and Navigate to Frontend
```bash
cd src
```

### 2. Install Dependencies (if not already done)
```bash
npm install
```

### 3. Run Frontend
```bash
ng serve
```

### 4. Access Frontend
- Open: http://localhost:4200
- Navigate to the Products section

## ✅ Testing the "Ajouter un produit" Functionality

1. **Start both applications** (backend on port 8080, frontend on port 4200)
2. **Navigate to Products page** in the frontend
3. **Click "Ajouter un produit"** button
4. **Fill the form** with:
   - Nom: "Test Product"
   - Description: "Test Description"
   - Domaine: "Test Domain"
   - Contact: "Test Contact"
5. **Click "Ajouter le produit"**
6. **Verify** the product appears in the table
7. **Check H2 Console** to see the product in the database

## 🔍 Troubleshooting

### Backend Issues:
- **Port 8080 already in use**: Change port in `application.properties`
- **Java version error**: Ensure Java 17+ is installed
- **Maven not found**: Install Maven or use IDE

### Frontend Issues:
- **Port 4200 already in use**: Angular will automatically use next available port
- **CORS errors**: Backend has CORS enabled for all origins
- **API connection failed**: Ensure backend is running on port 8080

### Database Issues:
- **H2 Console not accessible**: Check if backend is running
- **No data showing**: Check DataInitializer is working

## 📁 Project Structure

```
chemicalApp/
├── src/                          # Angular Frontend
│   ├── app/
│   │   ├── produit/              # Product component
│   │   ├── services/             # API services
│   │   └── ...
│   └── ...
└── package com.example.demo/     # Spring Boot Backend
    ├── entities/                 # JPA entities
    ├── repositories/             # Data repositories
    ├── services/                 # Business logic
    ├── controllers/              # REST controllers
    └── ...
```

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/produits` | Get all products |
| GET | `/produits/{id}` | Get product by ID |
| POST | `/produits` | Create new product |
| PUT | `/produits/{id}` | Update product |
| DELETE | `/produits/{id}` | Delete product |

## 🔄 Data Flow

1. **Frontend** → User fills form
2. **Angular Service** → Sends HTTP request to backend
3. **Spring Controller** → Receives request
4. **Spring Service** → Processes business logic
5. **JPA Repository** → Saves to database
6. **Response** → Returns to frontend
7. **UI Update** → Table refreshes with new data

## 🎉 Success Indicators

- ✅ Backend starts without errors
- ✅ Frontend compiles successfully
- ✅ Products load in the table
- ✅ "Ajouter un produit" form appears
- ✅ New products are saved to database
- ✅ Products persist after page refresh
