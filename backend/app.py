import pickle

from flask import Flask, jsonify
import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate('tv-show.json')
firebase_admin.initialize_app(cred)

db = firestore.client()


# Your existing code

@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/api/getallmovies', methods=['GET'])
def getAllMovies():
    try:
        doc_show_ref = db.collection('tvshow')
        doc_genre_ref = db.collection('genre')
        doc_show = doc_show_ref.get()
        doc_genre = doc_genre_ref.get()

        shows = [doc.to_dict() for doc in doc_show]
        genres = [doc.to_dict() for doc in doc_genre]

        return jsonify(shows), 200

    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred"}), 500


@app.route('/api/movie/<movieTitle>', methods=['GET'])
def getMovieByTitle(movieTitle):
    doc_show_ref = db.collection('tvshow').document(movieTitle)
    doc = doc_show_ref.get()

    return jsonify(doc.to_dict()), 200


@app.route('/api/movie/toprated', methods=['GET'])
def getTopRatedMovies():
    top_rated_movies = []

    # Query Firestore to get movies with a rating greater than 7.0
    doc_show_ref = db.collection('tvshow')
    query = doc_show_ref.where('rating', '>', '7.0').stream()

    # Iterate over the query results and build the response
    for doc in query:
        movie_data = doc.to_dict()
        top_rated_movies.append({
            'title': movie_data['title'],
            'rating': movie_data['rating'],
            'description': movie_data['description'],
            'poster_path_url': movie_data['poster_path_url'],
            'backdrop_path_url': movie_data['backdrop_path_url'],
            # Add other relevant fields as needed
        })

    # Return the top-rated movies as JSON
    return jsonify({'top_rated_movies': top_rated_movies}), 200


@app.route('/api/suggest/<age>/<gender>/<location>', methods=['GET'])
def getMoviesByState(age, gender, location):
    with open('./static/decision_tree.pkl', 'rb') as file:
        decision_tree = pickle.load(file)
    feature_names = ['age', 'gender', 'location']
    predict_data = [[age, gender, location]]
    prediction = decision_tree.predict(predict_data)
    print(prediction)

    # Replace the following line with your actual Firestore collection and field names
    doc_show_ref = db.collection('tvshow')
    query = doc_show_ref.where('genre', '==', prediction[0]).stream()

    # Create a list to store the results
    movies = []
    for doc in query:
        movies.append(doc.to_dict())

    return jsonify({'movies': movies}), 200
#
# def getMoviesByRating(movieRating):
#     pass
#
# def getSuggestMovies(movieGenre, movieRating):
#     pass

if __name__ == '__main__':
    app.run(debug=True)
