## Database Design

The database is designed to store user inputs and calculated premium values.

### Tables

#### 1. Members
 Column           | Type                  | Description       
 MemberId        | int (PK, Identity)    | Unique member ID 
 Name            | nvarchar(100)         | Member name 
 AgeNextBirthday | int                   | Age next birthday 
 DateOfBirth     | date                  | Date of birth 
 OccupationId    | int (FK)              | Linked to OccupationRatings table 
 DeathSumInsured | decimal(18,2)         | Insured amount 
 MonthlyPremium  | decimal(18,2)         | Calculated monthly premium 
 CreatedDate     | datetime              | Record created timestamp 

#### 2. OccupationRatings
 Column          | Type          | Description 
 OccupationId    | int (PK)      | Unique ID |
 OccupationName  | nvarchar(50)  | Name of the occupation |
 RatingFactor    | decimal(5,2)  | Factor used in premium formula |

### Relationship
- Each member belongs to one occupation.
- OccupationRatingFactor used in calculation formula:
      Death Premium =(DeathSumInsured * Rating Factor * AgeNextBirthDay) /1000 * 12
