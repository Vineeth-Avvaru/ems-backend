# API Specification Document

## 1. User Login
**Description:** Authenticates the user. <br/>
**Url:** /login <br/>
**Method:** POST <br/>
**Request**
```json
{
    "role": "Admin",
    "id": "A01",
    "password": "White"
}
```

**Response**
```json
{
    "name": "Dana",
    "isUserAuthentic": true
}
```

## 2. Fetch Employees
**Description:** Fetches the List of employees <br/>
**Url:** /fetchEmployees <br/>
**Method:** GET <br/>
**Response**
```json
{
    "employeesData": [
        {
            "ID": "E01",
            "Name": "Okada",
            "Role": "Current Champion",
            "Description": "Defends his belt"
        },
        {
            "ID": "E02",
            "Name": "Kenny",
            "Role": "Western",
            "Description": "Fighter"
        }
    ]
}
```
## 3. Add Employee
**Description:** Adds the employee to Employees table <br/>
**Url:** /addEmployee <br/>
**Method:** PUT <br/>
**Request**
```json
{
    "id": "E07",
    "name": "John",
    "password": "Cena",
    "role": "Invisible",
    "description": "You cant see him"
}
```

**Response**
```json
{
    "message": "Employee Added"
}
```

## 4. Delete Employee
**Description:** Deletes Employee from the Table <br/>
**Url:** /deleteEmployee<br/>
**Method:** DELETE <br/>
**Request**
```json
{
    "id": "E07"
}
```

**Response**
```json
{
    "message": "Employee Removed"
}
```

## 5. Update Employee
**Description:** Updates Employee from the Table <br/>
**Url:** /updateEmployee<br/>
**Method:** PATCH <br/>
**Request**
```json
{
    "id": "E07",
    "role": "Secret Spy",
    "description": "Sent to spy on the competitors"
}
```

**Response**
```json
{
    "message": "E07 Updated"
}
```
## 6. Fetch Employee By ID
**Description:** Fetches the Employee Information given ID <br/>
**Url:** /fetchEmployeeByID<br/>
**Method:** POST <br/>
**Request**
```json
{
    "id": "E07"
}
```

**Response**
```json
{
    "ID": "E07",
    "Name": "John",
    "Password": "Cena",
    "Role": "Secret Spy",
    "Description": "Sent to spy on the competitors"
}
```
## 7. Add Review
**Description:** Adds Review to the Employee in Reviews Table<br/>
**Url:** /addReview<br/>
**Method:** PUT <br/>
**Request**
```json
{
    "givenBy": "A01",
    "givenTo": "E07",
    "review": "Excellant Job"
}
```

**Response**
```json
{
    "message": "Review Added"
}
```
## 8. Update Review
**Description:** Updates Review of the Employee in Reviews Table<br/>
**Url:** /updateReview<br/>
**Method:** PATCH <br/>
**Request**
```json
{
    "givenBy": "A01",
    "givenTo": "E07",
    "review": "Hard Working"
}
```

**Response**
```json
{
    "message": "Review Updated"
}
```

## 9. Fetch Review
**Description:** Fetches Review of the Employee in Reviews Table<br/>
**Url:** /fetchReview<br/>
**Method:** POST <br/>
**Request**
```json
{
    "givenBy": "A01",
    "givenTo": "E07"
}
```

**Response**
```json
{
    "review": "Hard Working"
}
```

## 10. Fetch Employee Reviews
**Description:** Fetches all the reviews given to the employee<br/>
**Url:** /fetchEmpReviews <br/>
**Method:** POST <br/>
**Request**
```json
{
    "eID": "E07"
}
```

**Response**
```json
{
    "reviewsData": [
        {
            "givenBy": "A01",
            "givenTo": "E07",
            "review": "Hard Working"
        }
    ]
}
```

## 11. Fetch Employee Reviews
**Description:** Fetches all the reviews given to the employee<br/>
**Url:** /fetchEmpReviews <br/>
**Method:** POST <br/>
**Request**
```json
{
    "eID": "E07"
}
```

**Response**
```json
{
    "reviewsData": [
        {
            "givenBy": "A01",
            "givenTo": "E07",
            "review": "Hard Working"
        }
    ]
}
```

## 12. Add Feedback
**Description:** Adds the feedback given by Employee to Feedbacks Table<br/>
**Url:** /addFeedback<br/>
**Method:** PUT <br/>
**Request**
```json
{
    "givenBy": "E07",
    "givenTo": "A01",
    "feedback": "Will work more Harder!!"
}
```

**Response**
```json
{
    "message": "Feedback Added"
}
```

## 13. Fetch Feedback
**Description:** Fetches the feedback given by Employee<br/>
**Url:** /fetchFeedback <br/>
**Method:** POST <br/>
**Request**
```json
{
    "givenBy": "E07",
    "givenTo": "A01"
}
```

**Response**
```json
{
    "feedback": "Will work more Harder!!"
}
```

## 14. Update Feedback
**Description:** Updates the feedback given by Employee<br/>
**Url:** /updateFeedback<br/>
**Method:** PATCH <br/>
**Request**
```json
{
    "givenBy": "E07",
    "givenTo": "A01",
    "feedback": "Thanks Boss!!"
}
```

**Response**
```json
{
    "message": "Feedback Updated"
}
```
