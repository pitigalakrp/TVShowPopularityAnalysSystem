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
    return jsonify({'top_rated_movies': top_rated_movies})


# def getMoviesByGenre(genre):
#     pass
#
# def getMoviesByRating(movieRating):
#     pass
#
# def getSuggestMovies(movieGenre, movieRating):
#     pass

if __name__ == '__main__':
    app.run(debug=True)
