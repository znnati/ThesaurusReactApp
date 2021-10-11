import React from "react";
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: [10, 13],
  };
  
  const delimiters = [...KeyCodes.enter, KeyCodes.comma];
 
  export default class Synonym extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            tags: [],
        };
        this.handleSave = this.handleSave.bind(this);
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({tags: tags.filter((tag, index) => index !== i)});
    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

    handleSave(){
        this.props.Save(this.state.tags);        
        this.setState({tags : []});
    }

    render(){
        const { tags } = this.state;
        var disabled = tags.length === 0;        
        
        return (
            <div className="form-group col-md-8 pt-3">
                <ReactTags
                    tags={tags}
                    inputFieldPosition="top"
                    autofocus={false}
                    handleDelete={this.handleDelete.bind(this)}
                    handleAddition={this.handleAddition.bind(this)}
                    delimiters={delimiters}
                    placeholder="Sysnonyms...  use enter or ',' to add"/>

                <div className="form-group text-left pl-3 fload-right">
                    <button className="btn btn-primary form-control" disabled={disabled}
                            onClick={this.handleSave} style={{width: 300}}>
                        Add synonyms to #{this.props.Word}
                    </button>
                </div>
            </div>
        )
    }
}
