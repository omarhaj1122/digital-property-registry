# Enterprise Database Schema - Digital Property Registry

## 1. Spatial Database Overview
The system utilizes PostgreSQL enhanced with the PostGIS extension to handle geographic coordinate data (Spatial Polygons for property boundaries, SRID: 4326).

## 2. ER Diagram Structure

```text
+-------------------+       +-----------------------+       +------------------------+
|       users       | 1---< |      properties       | 1---< |   ownership_history    |
+-------------------+       +-----------------------+       +------------------------+
| id (PK)           |       | id (PK)               |       | id (PK)                |
| national_id       |       | parcel_number         |       | property_id (FK)       |
| full_name         |       | owner_id (FK)         |       | previous_owner_id      |
| email             |       | area_sqm              |       | new_owner_id           |
| password_hash     |       | geom (PostGIS Polygon)|       | deed_hash              |
| role              |       | status                |       | transfer_date          |
+-------------------+       +-----------------------+       +------------------------+
                                        | 1
                                        |
                                        v
                            +-----------------------+
                            |   digital_contracts   |
                            +-----------------------+
                            | id (PK)               |
                            | property_id (FK)      |
                            | seller_id             |
                            | buyer_id              |
                            | digital_signature     |
                            | status                |
                            +-----------------------+