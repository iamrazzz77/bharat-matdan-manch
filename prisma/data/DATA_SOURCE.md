# India Geographic Master Dataset - Data Source & Governance Documentation

## Overview
This directory contains the official geographic master data for the **Bharat Matdan Manch - India Digital Election Platform**. 
It defines the complete administrative and electoral hierarchy across all 28 States and 8 Union Territories of India.

---

## Hierarchy Specification

```
India (National Level)
└── State / Union Territory (28 States + 8 UTs)
    └── District (Administrative District)
        └── Parliamentary / Assembly Constituency (Electoral Boundaries)
            └── Polling Station (Physical / Digital Voting Locations)
                └── Polling Booth (Specific Booth Units)
```

---

## Dataset Details & Sources

| Attribute | Specification / Standard |
| :--- | :--- |
| **Dataset Version** | ECI-INDIA-GEO-2026.V1 |
| **Master Source** | Election Commission of India (ECI) Delimitation Orders & Ministry of Panchayati Raj Local Government Directory (LGD) |
| **State / UT Coverage** | **36 Total** (28 States, 8 Union Territories) |
| **ISO / ST Code Standard** | 2-Letter ISO 3166-2:IN & ECI Standard Codes (e.g., `MH`, `UP`, `DL`, `AN`, `PY`) |
| **Bilingual Support** | English (Official) & Hindi (हिन्दी) Master Field Translations |
| **Constituency Types** | `PARLIAMENTARY` (Lok Sabha) & `ASSEMBLY` (Vidhan Sabha) |

---

## Master State & Union Territory List

### States (28)
1. **Andhra Pradesh** (`AP`) - 25 LS Seats
2. **Arunachal Pradesh** (`AR`) - 2 LS Seats
3. **Assam** (`AS`) - 14 LS Seats
4. **Bihar** (`BR`) - 40 LS Seats
5. **Chhattisgarh** (`CG`) - 11 LS Seats
6. **Goa** (`GA`) - 2 LS Seats
7. **Gujarat** (`GJ`) - 26 LS Seats
8. **Haryana** (`HR`) - 10 LS Seats
9. **Himachal Pradesh** (`HP`) - 4 LS Seats
10. **Jharkhand** (`JH`) - 14 LS Seats
11. **Karnataka** (`KA`) - 28 LS Seats
12. **Kerala** (`KL`) - 20 LS Seats
13. **Madhya Pradesh** (`MP`) - 29 LS Seats
14. **Maharashtra** (`MH`) - 48 LS Seats
15. **Manipur** (`MN`) - 2 LS Seats
16. **Meghalaya** (`ML`) - 2 LS Seats
17. **Mizoram** (`MZ`) - 1 LS Seat
18. **Nagaland** (`NL`) - 1 LS Seat
19. **Odisha** (`OD`) - 21 LS Seats
20. **Punjab** (`PB`) - 13 LS Seats
21. **Rajasthan** (`RJ`) - 25 LS Seats
22. **Sikkim** (`SK`) - 1 LS Seat
23. **Tamil Nadu** (`TN`) - 39 LS Seats
24. **Telangana** (`TG`) - 17 LS Seats
25. **Tripura** (`TR`) - 2 LS Seats
26. **Uttar Pradesh** (`UP`) - 80 LS Seats
27. **Uttarakhand** (`UK`) - 5 LS Seats
28. **West Bengal** (`WB`) - 42 LS Seats

### Union Territories (8)
1. **Andaman and Nicobar Islands** (`AN`) - 1 LS Seat
2. **Chandigarh** (`CH`) - 1 LS Seat
3. **Dadra and Nagar Haveli and Daman and Diu** (`DN`) - 1 LS Seat
4. **Delhi (NCT)** (`DL`) - 7 LS Seats
5. **Jammu and Kashmir** (`JK`) - 5 LS Seats
6. **Ladakh** (`LA`) - 1 LS Seat
7. **Lakshadweep** (`LD`) - 1 LS Seat
8. **Puducherry** (`PY`) - 1 LS Seat

---

## Updating Geographic Data

When official ECI boundaries or LGD district codes change:
1. Update `prisma/seedData/indiaMasterGeo.ts` with updated district names, codes, or constituency counts.
2. Run database migration and re-seeding command:
   ```bash
   npx prisma db seed
   ```
3. API endpoints (`/api/geography/*`) will automatically deliver updated master records to all frontend components without requiring code edits in frontend pages.
