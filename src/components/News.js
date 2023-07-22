import React, { Component } from "react";
import Newsitems from "./Newsitems";
import Spinner from "./Spinner";
import propTypes from 'prop-types';

export default class News extends Component {
  static defaultProps={
    country: 'in',
    pageSize: 5,
    category: 'general'
  }

  static propTypes={
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string
  }

  constructor(){
    super();
    // console.log("Hello i am a constructor");
    this.state={
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=693a647111464fb2be57705cfdd48816&page=1&pagesize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data=await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults,loading: false});
  }

  handlePrevious=async()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=693a647111464fb2be57705cfdd48816&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({
      articles: parsedData.articles,
      page:this.state.page-1,
      loading: false
    })
  }
  handleNext=async()=>{
    if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else{
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=693a647111464fb2be57705cfdd48816&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({
      articles: parsedData.articles,
      page:this.state.page+1,
      loading: false
    })
    }
  }

  capitalizeFirsLetter=(e)=>{
    return e.charAt(0).toUpperCase()+e.slice(1);
  }
  render() {
    // document.body.style.backgroundColor="#042743"
    document.title=`${this.capitalizeFirsLetter(this.props.category)} - NewsVilla`
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{marginTop:'90px'}}>NewsVilla - Top {this.capitalizeFirsLetter(this.props.category)} Headlines</h1>  
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((e)=>{
            return <div className="col-md-4" key={e.url}>
            <Newsitems title={e.title?e.title:""} description={e.description?e.description:""} imageUrl={e.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt} source={e.source.name}/>
            {/* If we want limited characters we use e.title.slice(0,88) */}

          </div>
          })}
          <div className="d-flex justify-content-between">
              <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
              <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
          </div>
        </div>
      </div>
    );
  }
}
