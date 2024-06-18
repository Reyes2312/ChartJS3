import yfinance as yf
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/bmv_sp500')
def get_bmv_sp500():
    bmv = yf.Ticker("^MXX")
    sp500 = yf.Ticker("^GSPC")
    
    bmv_hist = bmv.history(period="1mo")
    sp500_hist = sp500.history(period="1mo")
    
    data = {
        "bmv": bmv_hist['Close'].tolist(),
        "sp500": sp500_hist['Close'].tolist(),
        "dates": bmv_hist.index.strftime('%Y-%m-%d').tolist()
    }
    
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
