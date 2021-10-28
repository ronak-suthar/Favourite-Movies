import React, { Component } from 'react'
import { movies } from './GetMovies'

export class Favourite extends Component {

    constructor() {
        super();

        this.state = {
            genres: ['All Genres'],
            currGenre : 'All Genres'
        }
    }

    changeGenres=(genre)=>{
        this.setState({
            currGenre : genre
        })
    }

    render() {
        const allMovies = JSON.parse(localStorage.getItem("movies-data") || "[]");

        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };

        allMovies.forEach((movie) => {
            if (!this.state.genres.includes(genreids[movie.genre_ids[0]])) {
                this.setState({
                    genres: [...this.state.genres, genreids[movie.genre_ids[0]]]
                })
            }
        })

        return (
            <div>
                <>
                    <div className="container" style={{ margin: '2rem' }}>
                        <h4>Favourite Genres</h4>
                        <div className="row">
                            <div className="col-2">
                                <ul className="list-group" style={{cursor:'pointer'}}>
                                    {this.state.genres.map((genre) => (
                                        // <li className="list-group-item">{genre}</li>
                                        this.state.currGenre===genre ? <li className="list-group-item" style={{background:'blue',color:'white',fontWeight:'strong'}}>{genre}</li>:
                                        <li className="list-group-item" onClick={()=>this.changeGenres(genre)}>{genre}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-10">
                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text" id="addon-wrapping">Search</span>
                                    <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />
                                </div>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col">Popularity</th>
                                            <th scope="col">Rating</th>
                                            <th scope="col">Remove From Favourite</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allMovies.map(function(movie){
                                                if(this.state.currGenre=='All Genres' || genreids[movie.genre_ids[0]]===this.state.currGenre){
                                                                               
                                                    return <tr>
                                                    <td>{movie.id}</td>
                                                    <td>
                                                        {<img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} style={{ width: '7rem', margin: '1rem' }} />}
                                                        {movie.original_title}
                                                    </td>
                                                    <td>{genreids[movie.genre_ids[0]]}</td>
                                                    <td>{movie.popularity}</td>
                                                    <td>{movie.vote_average}</td>
                                                    <td><button type="button" className="btn btn-danger">Remove</button></td>

                                                </tr>;
                         
                                                }
                                            }.bind(this))
                                        }
                                    </tbody>
                                </table>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        )
    }
}

export default Favourite;
