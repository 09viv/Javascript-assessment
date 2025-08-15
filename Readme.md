This project contains a JavaScript function that takes a dictionary where:
- **Key**: A date in the format `YYYY-MM-DD`
- **Value**: An integer

The function returns a new dictionary where:
1. Keys are **day names** (`Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`).
2. Values are the **sum of integers** for all dates that fall on that day of the week.
3. If a day has **no values** in the input, it is filled with the **mean** of the nearest previous and next days with values.

---

## 🛠 Features
- Aggregates values based on the day of the week.
- Handles missing days by filling them with an average of neighboring days.
- Works for date ranges within **1970-01-01 to 2100-01-01**.
- Includes **unit tests** to validate the implementation.