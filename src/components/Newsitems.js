import React, { Component } from 'react'

export default class Newsitems extends Component {

  render() {
    let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className='container my-3'>
        <div className="card" style={{}}>
          <div style={{
            display:'flex',
            justifyContent: 'flex-end',
            position:'absolute',
            right:0
          }}>
            <span className="badge rounded-pill bg-danger">
    {source}
  </span>
          </div>
        <img src={!imageUrl?"https://media.istockphoto.com/id/1301656823/photo/daily-papers-with-news-on-the-computer.jpg?b=1&s=170667a&w=0&k=20&c=Y0krx8wEAxLd7-ObYRSzLIA8XaSpA7bkuiCYbjR-ZTA=":imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} On {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
