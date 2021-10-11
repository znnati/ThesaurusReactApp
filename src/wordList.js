
import React from "react";

export default class WordList extends React.Component{
 
    constructor(props){
        super(props);
        this.state = {
            list: [],
            searchText: "",
        }

        this.select = this.select.bind(this);
    }

    select(args){
        this.props.Select(args);
    }

    render(){
        return(
            <div className="form-group">
                <ul className="list-group col-md-10">
                    {
                        this.props.Words.map(element => {
                            return (element &&
                            <li key={element.word} className="list-group-item" style={{border: 'none'}}>
                                <a href="#" className="list-group-item list-group-item-action"
                                   onClick={() => this.select(element.word)} 
                                   style={{textTransform: 'capitalize'}}>
                                        {element.word}
                                    <span className="badge badge-primary badge-pill float-right">
                                        {[...element.synonyms ?? []]?.length}
                                    </span>
                                </a>                                
                            </li>)
                        })
                    }
                </ul>
            </div>
        );
    }
}
