# Microservices Backend with Node.js, Express, JWT, and Kafka

## Overview
This project is a microservices-based backend architecture built using Node.js and Express. It includes authentication, order management, and catalog services, leveraging Kafka for event-driven communication. JWT (JSON Web Token) is used for authentication and authorization.

## Microservices
### 1. User Authentication Service (`user_service`)
- Handles user registration and authentication
- Issues JWT tokens for authenticated users
- Manages user roles and permissions

### 2. Order Service (`order-service`)
- Processes customer orders
- Listens for events from `catalog_service` (e.g., product availability updates)
- Emits events for successful or failed order processing

### 3. Catalog Service (`catalog_service`)
- Manages product listings and availability
- Publishes product updates and stock changes to Kafka topics
- Listens for order events to update inventory

