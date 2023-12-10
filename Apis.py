from flask import Flask, request, jsonify
from my_function import calcuate_similarity
from search_results_fetch import get_res_usrqry
import json
from flask_cors import CORS
sustainable_keywords = [
    "Sustainability",
    "Green living",
    "Eco-friendly",
    "Renewable energy",
]

app = Flask(__name__)
CORS(app)

@app.route('/model', methods=['POST'])
def get_results():
    if request.method == 'POST':
        data = request.get_json()
        shopping_query = data.get('shopping_query', '')

        sorted_list = []
        for keyword in sustainable_keywords:
            usr_res = get_res_usrqry(keyword + " " + shopping_query)
            for res in usr_res:
                item = calcuate_similarity(res['title'])
                res["Carbon footprint"] = item.Intensity if len(item) > 0 else 999999
                sorted_list.append(res)

        sorted_list = sorted(sorted_list, key=lambda k: k['Carbon footprint'])
        response=jsonify(sorted_list)
        response.headers.add('Access-Control-Allow-Origin','*')
        return response

if __name__ == '__main__':
    app.run(debug=True)