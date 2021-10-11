import React from "react";
import Synonym from './synonym';

export default class Word extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            word: "",
            synonyms: [],
        }; 
        this.renderSynonym = this.renderSynonym.bind(this);   
        this.updateSynonyms = this.updateSynonyms.bind(this);
    }

    renderSynonym(){        
        var list = this.props.Synonyms.map(function(element){
                    return element && <li key={element} className="list-group-item"
                               style={{textTransform: 'capitalize'}}>{element}</li>
        });

        return (
            <div className="col-md-4">
                <h1 className="text-center mb-5 text-capitalize">{this.props.Word}</h1>
                <ul className="list-group "> { list } </ul>
            </div>
        );
    }

    updateSynonyms(args){    
       this.props.Update(this.props.Word, args.map(t => t.text));
    }


    render(){
        return (
            <div className="col-md-12 row">
                {this.renderSynonym()}
                
                {this.props.Word && <Synonym Word={this.props.Word} Save={this.updateSynonyms}/>}
            </div>
        );
    }
}
