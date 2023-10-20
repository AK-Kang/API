
from flask import Flask, request, jsonify
import rpy2.robjects as robjects

app = Flask(__name__)

@app.route("/calculate-age", methods=["POST"])

def calculate_age():
    data = request.get_json()
    # apply R functions to get age and day of week
    r_func = robjects.r("""
        function(dob) {
            age <- as.integer(difftime(Sys.Date(), as.Date(dob), units = "weeks")/52.25)
            day_of_week <- weekdays(as.Date(dob))
            return(list(age = age, day_of_week = day_of_week))
        }
    """)
    result = r_func(data['dob'])
    age = result.rx('age')[0][0]
    day_of_week = result.rx('day_of_week')[0][0]
    return jsonify({"age": age, "day of week": day_of_week})

if __name__ == "__main__":
    app.run(debug=True)
