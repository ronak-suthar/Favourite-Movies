import { movies } from "./GetMovies";
import React, { Component } from 'react';
import axios from 'axios';

export class Banner extends Component {
    constructor(){
        super();
        this.state={
            trendMovie : ''
        }
    }
    async componentDidMount(){
        //console.log("mounting started");

        const req = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=501dd1888e1b02788b4844626210f170&language=en-US&page=1`)

        //console.log(req.data)

        this.setState({
            trendMovie:req.data.results[// Returns a random integer from 0 to 10:
                Math.floor(Math.random() * 11)]
        })
    }

    render() {
        console.log('Movies Name : ',this.state.trendMovie.title);
        // let movie=''
        return (
            <>
            {   this.state.trendMovie === ''?
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                :
                <div className="card banner-card">
                <img src={`https://image.tmdb.org/t/p/original${this.state.trendMovie.backdrop_path}`}   alt={this.state.trendMovie.title} className="card-img-top banner-img"/>
                {/* <div className="card-body"> */}
                    <h1 className="card-title banner-title">{this.state.trendMovie.title}</h1>
                    <p className="card-text banner-text">{this.state.trendMovie.overview}</p>
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                {/* </div> */}
                </div>

                
            }
            </>
            
        )
    }
}

export default Banner
