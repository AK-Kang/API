from flask import Flask, request, jsonify
from flask_cors import CORS 
import rpy2.robjects as robjects
import pdfkit
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

app = Flask(__name__)
CORS(app)

@app.route('/api/send', methods=['POST'])
def send_email():
    data = request.json
    
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
    
    # generate PDF using data

    pdf_content = f"""
    <h1>Details</h1>
    <p>Name: {data['firstName']} {data['lastName']}</p>
    <p>Age: {age}</p>
    <p>Day of the Week of Birth: {day_of_week}</p>
    """

    pdf_path = "output.pdf"
    pdfkit.from_string(pdf_content, pdf_path)

    # Email pdf
    sender_email = "akang620@gmail.com"
    password = "445182694"  
    receiver_email = data['email']

    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = "PDF"

    with open(pdf_path, "rb") as attachment:
        part = MIMEBase("application", "octet-stream")
        part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header(
            "Content-Disposition",
            f"attachment; filename= {pdf_path}",
        )
        message.attach(part)

    text = message.as_string()

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server: # Using Gmail SMTP for this example
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, text)

    return jsonify({
        'age': age,
        'day_of_week': day_of_week,
        'message': 'Email sent successfully'
    })

if __name__ == '__main__':
    app.run(debug=True)
