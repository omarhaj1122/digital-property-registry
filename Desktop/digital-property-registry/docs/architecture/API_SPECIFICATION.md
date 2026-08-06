# API Specifications - Digital Property Registry System

## Base URL
`/api/v1`

---

## 1. Authentication & Identity (`/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register new user / citizen | Public |
| `POST` | `/auth/login` | Authenticate user & get JWT token | Public |
| `GET` | `/auth/me` | Fetch current authenticated user profile | Authenticated |

---

## 2. Property Management & GIS (`/properties`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/properties` | Query properties (supports spatial bounding box filters) | Public / Citizen |
| `GET` | `/properties/:id` | Get specific property details & boundary coordinates | Citizen / Govt |
| `POST` | `/properties` | Register a new parcel with GIS Polygon geometry | Govt Officer / Admin |
| `GET` | `/properties/:id/history` | Retrieve full ownership history logs | Citizen / Govt |

---

## 3. Digital Contracts & Ownership Transfers (`/contracts`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/contracts` | Initiate property transfer contract | Property Owner |
| `POST` | `/contracts/:id/sign` | Sign contract electronically | Buyer / Seller |
| `POST` | `/contracts/:id/approve` | Final government verification & seal | Govt Officer |

---

## 4. Fraud Detection & Security Audit (`/audit`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/audit/logs` | View system security and transaction audit trail | Admin Only |