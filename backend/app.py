from flask import Flask, request, jsonify
from flask_cors import CORS
from elasticsearch import Elasticsearch
import pandas as pd
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load environment variables
ELASTICSEARCH_HOST = os.getenv('ELASTICSEARCH_HOST', 'localhost')
ELASTICSEARCH_PORT = os.getenv('ELASTICSEARCH_PORT', '9200')
EMPLOYEE_DATA_FILE = os.getenv('EMPLOYEE_DATA_FILE', './data/Employee Sample Data 1.csv')

# Elasticsearch connection
es = Elasticsearch([{'host': ELASTICSEARCH_HOST, 'port': int(ELASTICSEARCH_PORT), 'scheme': 'http'}])


# Loading the data
try:
    df = pd.read_csv(EMPLOYEE_DATA_FILE, encoding='cp1252')
except UnicodeDecodeError:
    df = pd.read_csv(EMPLOYEE_DATA_FILE, encoding='utf-8', errors='ignore')

df.drop_duplicates(subset='Employee ID', keep='first', inplace=True)
df.replace({np.nan: None}, inplace=True)

index_name = "employees"

# Only create the index if it doesn't already exist
if not es.indices.exists(index=index_name):
    es.indices.create(index=index_name, ignore=400)
    print(f"Index {index_name} created.")
else:
    print(f"Index {index_name} already exists.")

# Indexing clean data with Employee ID as the Elasticsearch _id
for index, row in df.iterrows():
    document = row.to_dict()
    employee_id = document.get("Employee ID")
    try:
        es.index(index=index_name, id=employee_id, body=document)
    except Exception as e:
        print(f"Error indexing document {employee_id}: {e}")
        continue  # Log error and continue with other documents

# Endpoints go here...
# The rest of the endpoints (fetch_collections, createCollection, indexData, etc.) remain the same.


# Get available collections (indices)
@app.route('/getCollections', methods=['GET'])
def fetch_collections():  # Changed function name
    try:
        collections = es.indices.get_alias("*").keys()
        return jsonify(list(collections))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get available columns (fields) for a selected collection
@app.route('/getColumns', methods=['POST'])
def fetch_columns():  # Changed function name
    data = request.json
    collection_name = data.get('collection_name').lower()  # Convert to lowercase
    
    if not collection_name:
        return jsonify({"error": "Missing collection name"}), 400

    try:
        # Get field mappings for the selected collection
        mapping = es.indices.get_mapping(index=collection_name)
        fields = mapping[collection_name]['mappings']['properties'].keys()
        return jsonify(list(fields))
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/createCollection', methods=['POST'])
def create_collection():
    data = request.json
    collection_name = data.get('collection_name').lower()
    
    if es.indices.exists(index=collection_name):
        return jsonify({"message": f"Collection {collection_name} already exists."}), 400
    
    try:
        es.indices.create(index=collection_name, ignore=400)
        return jsonify({"message": f"Collection {collection_name} created successfully."}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/indexData', methods=['POST'])
def index_data():
    data = request.json
    collection_name = data.get('collection_name').lower()  # Convert to lowercase
    exclude_column = data.get('exclude_column')

    if not collection_name or not exclude_column:
        return jsonify({"error": "Missing collection name or column to exclude"}), 400

    for index, row in df.iterrows():
        document = row.to_dict()
        if exclude_column in document:
            document.pop(exclude_column)  # Exclude the specified column
        employee_id = document.get("Employee ID")

        try:
            es.index(index=collection_name, id=employee_id, body=document)
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"message": f"Data indexed into {collection_name}, excluding column {exclude_column}."})

@app.route('/searchByColumn', methods=['POST'])
def search_by_column():
    data = request.json
    collection_name = data.get('collection_name').lower()  # Convert to lowercase
    column_name = data.get('column_name')
    column_value = data.get('column_value')

    if not collection_name or not column_name or not column_value:
        return jsonify({"error": "Missing collection name, column name, or column value"}), 400

    try:
        response = es.search(
            index=collection_name,
            body={
                "query": {
                    "match": {
                        column_name: column_value
                    }
                }
            }
        )
        return jsonify(response['hits']['hits'])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/getEmpCount', methods=['POST'])
def get_emp_count():
    data = request.json
    collection_name = data.get('collection_name').lower()  # Convert to lowercase

    if not collection_name:
        return jsonify({"error": "Missing collection name"}), 400

    try:
        response = es.count(index=collection_name)
        emp_count = response['count']
        return jsonify({"employee_count": emp_count})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/delEmpById', methods=['POST'])
def delete_emp_by_id():
    data = request.json
    collection_name = data.get('collection_name').lower()  
    employee_id = data.get('employee_id')

    if not collection_name or not employee_id:
        return jsonify({"error": "Missing collection name or employee ID"}), 400

    try:
        response = es.delete(index=collection_name, id=employee_id)
        return jsonify({"message": f"Employee {employee_id} deleted successfully", "result": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/getFacet', methods=['POST'])
def get_facet():
    data = request.json
    collection_name = data.get('collection_name').lower()  
    facet_field = data.get('facet_field')  

    if not collection_name or not facet_field:
        return jsonify({"error": "Missing collection name or facet field"}), 400

    try:
        response = es.search(
            index=collection_name,
            body={
                "size": 0,  
                "aggs": {
                    "facet": {
                        "terms": {
                            "field": f"{facet_field}.keyword",
                            "size": 10  
                        }
                    }
                }
            }
        )

        facet_result = response['aggregations']['facet']['buckets']
        return jsonify(facet_result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 