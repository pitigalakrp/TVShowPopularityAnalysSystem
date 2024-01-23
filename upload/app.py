from flask import Flask, render_template, request, jsonify, redirect
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import storage

app = Flask(__name__)

cred = credentials.Certificate('tv-show.json')
st = firebase_admin.initialize_app(cred, {
    'storageBucket': 'tv-show-6a544.appspot.com'
})
bucket = storage.bucket()
db = firestore.client()


@app.route('/')
def hello_world():  # put application's code here
    return render_template('index.html')


@app.route('/upload', methods=['POST', 'GET'])
def upload_file():
    if request.method == 'POST':
        title = request.form['title']
        tagline = request.form['tagline']
        description = request.form['description']
        genre = request.form['genre']
        rate = request.form['rate']
        duration = request.form['duration']
        week = request.form['week']
        channel = request.form['channel']
        channel_logo = request.files['channel_logo']
        poster_path = request.files['poster_path']
        backdrop_path = request.files['backdrop_path']

        channel_logo_url = ""
        poster_path_url = ""
        backdrop_path_url = ""

        if channel_logo:
            filepath = f'static/channel_logo/{channel_logo.filename}'
            channel_logo.save(filepath)
            bucket.blob(f'channel_logo/{title}_{channel_logo.filename}').upload_from_filename(filepath)
            bucket.blob(f'channel_logo/{title}_{channel_logo.filename}').make_public()
            channel_logo_url = bucket.blob(f'channel_logo/{title}_{channel_logo.filename}').public_url

        if poster_path:
            filepath = f'static/tv-show/{title}_{poster_path.filename}'
            poster_path.save(filepath)
            bucket.blob(f'poster_path/{title}_{poster_path.filename}').upload_from_filename(filepath)
            bucket.blob(f'poster_path/{title}_{poster_path.filename}').make_public()
            poster_path_url = bucket.blob(f'poster_path/{title}_{poster_path.filename}').public_url

        if backdrop_path:
            filepath = f'static/tv-show/{title}_{backdrop_path.filename}'
            backdrop_path.save(filepath)
            bucket.blob(f'backdrop_path/{title}_{backdrop_path.filename}').upload_from_filename(filepath)
            bucket.blob(f'backdrop_path/{title}_{backdrop_path.filename}').make_public()
            backdrop_path_url = bucket.blob(f'backdrop_path/{title}_{backdrop_path.filename}').public_url

        doc_ref = db.collection('tvshow').document(request.form['title'])
        doc_ref.set({
            'title': title,
            'tagline': tagline,
            'description': description,
            'genre': genre,
            'rating': rate,
            'duration': duration,
            'week': week,
            'channel': channel,
            'channel_logo_url': channel_logo_url,
            'poster_path_url': poster_path_url,
            'backdrop_path_url': backdrop_path_url
        })
        return redirect('/')


if __name__ == '__main__':
    app.run(debug=True)
