
![CI Pipeline](https://github.com/omarhaj1122/digital-property-registry/actions/workflows/ci.yml/badge.svg)


## 🗄️ Domain Repository Interfaces
- `IUserRepository`: Contract for user operations (lookup by ID, Email, National ID).
- `IPropertyRepository`: Contract for property operations and GIS parcel lookups.


## ⚙️ Application Layer (Use Cases & DTOs)
- `PropertyDTOs`: Defines contracts for property creation and ownership transfer requests.
- `CreatePropertyUseCase`: Validates parcel uniqueness and persists new property entities.
- `TransferPropertyUseCase`: Verifies current owner permissions and executes secure ownership transfer.

## ⚙️ Application Layer (Use Cases & DTOs)
- `PropertyDTOs`: Defines contracts for property creation and ownership transfer requests.
- `CreatePropertyUseCase`: Validates parcel uniqueness and persists new property entities.
- `TransferPropertyUseCase`: Verifies current owner permissions and executes secure ownership transfer.


## 🌐 Live API Endpoints
- `POST /api/v1/properties`: Register a new property with GIS polygon data.
- `POST /api/v1/properties/transfer`: Securely transfer property ownership.
- `GET /health`: System core sanity check.

## 🐳 Containerization & Database Setup
- `docker-compose.yml`: Provisions PostGIS container (`postgis/postgis:15-3.3`) for spatial queries.
- `.env`: Environment configurations for database credentials and server setup.

