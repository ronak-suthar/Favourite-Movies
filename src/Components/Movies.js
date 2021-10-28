import React, { Component } from 'react'
// import { movies } from './GetMovies'
import axios from 'axios';

export default class Movies extends Component {
    constructor(){
        super();
        this.state={
            hover : '',
            parr:[1],
            currPage : 1,
            movies : [],
            favourites : [...JSON.parse(localStorage.getItem("movies-data") || "[]").map((movie)=>(movie.id))]
        }
    }

    async componentDidMount(){
        //console.log("mounting started");

        const req = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=501dd1888e1b02788b4844626210f170&language=en-US&page=${this.state.currPage}`)

        //console.log(req.data)

        this.setState({
            movies:[...req.data.results]
        })
    }

    nextPage=()=>{

        this.setState(
            {
                parr : [...this.state.parr,this.state.currPage+1],
                currPage : this.state.currPage+1
            }
        ,this.changeMovies)
    }

    changeMovies = async()=>{
        const req = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=501dd1888e1b02788b4844626210f170&language=en-US&page=${this.state.currPage}`)

        //console.log(req.data)

        this.setState({
            movies:[...req.data.results]
        })
    }
    prevPage=()=>{
        if(this.state.currPage!==1){
            this.setState({
                parr : [...this.state.parr.slice(0,this.state.currPage-1)],
                currPage : this.state.currPage-1
            },this.changeMovies)
        }
    }

    handleFav = async (movie)=>{
        let moviesData = JSON.parse(localStorage.getItem("movies-data") || "[]") 
        if(this.state.favourites.includes(movie.id)){//movie already in fav
            moviesData = moviesData.filter((m)=>m.id!==movie.id)
            await this.setState({
                favourites : [...this.state.favourites.filter((id)=>id!==movie.id)]
            },()=>{
                localStorage.setItem("movies-data",JSON.stringify(moviesData));
                //console.log(JSON.parse(localStorage.getItem("movies-data") || "[]"));
                //console.log(this.state.favourites)
            })
        }else{//movie not in favourite
            moviesData.push(movie)
            await this.setState({
                favourites : [...this.state.favourites,movie.id]
            },()=>{
                localStorage.setItem("movies-data",JSON.stringify(moviesData));
                //console.log(JSON.parse(localStorage.getItem("movies-data") || "[]"));
                //console.log(this.state.favourites)
            })
        }
    }

    render() {
        //console.log("Render",this.state.favourites);

        // let this.state.movies = movies.results;

        return (
            <>
                <h4 style={{ textAlign: 'center' }}><strong>Trending Movies</strong></h4>

                {this.state.movies.length === 0 ? <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                    :
                    <div className="movies-list">
                        {
                            this.state.movies.map((movie) => (
                                <div className="card movies-card" onMouseEnter={()=>this.setState({hover:movie.id})} on onMouseLeave={()=>this.setState({hover:''})}>
                                    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} className="card-img-top banner-img" />
                                    {/* <div className="card-body"> */}
                                    <h5 className="movies-title"><strong>{movie.original_title}</strong></h5>
                                    {/* <p class="card-text banner-text">{movie.overview}</p> */}
                                    <div className="movies-button-wrapper">
                                        {
                                            this.state.hover === movie.id && <a class="btn btn-primary movies-button" onClick={()=>this.handleFav(movie)}>{this.state.favourites.includes(movie.id)?"Remove":"Add"}</a>
                                        }
                                    </div>
                                    {/* </div> */}
                                </div>
                            ))
                        }
                    </div>
                }
                <div className="paginationStyle">
                    <nav>
                        <ul className="pagination" style={{cursor:'pointer'}}>
                            <li className="page-item"><a className="page-link" onClick={this.prevPage}>Previous</a></li>
                            {/* <li className="page-item"><a className="page-link">1</a></li> */}
                            {
                                this.state.parr.map((page)=>(
                                    <li className="page-item"><a className="page-link">{page}</a></li>
                                ))
                            }
                            <li className="page-item"><a className="page-link" onClick={this.nextPage} href="#">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </>
        )
    }
}

