
import React from "react";
import Word from './word';
import WordList from './wordList';
import axios from "axios";
import logo from './logo.svg';

export default class ThesaursService extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            thesaurusWords: [],            
            take: 100,
            skip: 0,
            nbrPages: 0,
            words : [],
            searchText: "",
            selectedWord: "",
            synonyms : [],
            errorMessage: "",
        };
        this.Search = this.Search.bind(this);
        this.Update = this.Update.bind(this);
        this.SelectWord = this.SelectWord.bind(this);
    }

    async componentDidMount(){
        var take = this.state.take;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        try 
        {    
            var response = await axios.get('http://127.0.0.1:5000/api/thesaurus/getAll', headers);
            const words = response.data;
            
            this.setState({thesaurusWords: words});
            this.setState({words: words});
        }
        catch (error) {
            console.error('There was an error in fetching data!', error);
        };
        
       // handle success
           
         

        var nbrPages = this.state.thesaurusWords.length / take;
        this.setState({nbrPages: nbrPages});
    }
    
    Search(event){
        var args = event.target.value;
        this.setState({searchText: args});
        this.setState({words: this.state.thesaurusWords.filter(w => 
            w.word.toLowerCase().startsWith(args.toLowerCase()))});
    }

    Update(w, args){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(args)
            };
        fetch('http://localhost:5000/api/thesaurus/post?word=' + w, requestOptions)
          .then(response => { 
                response.json();
                this.setState({synonyms: [...this.state.synonyms, ...args]});
        });
    }

    SelectWord(args){ 
        this.setState({synonyms: []});
        fetch("http://localhost:5000/api/thesaurus/get?word=" + args)
        .then(response => response.json())
        .then(data => {
            this.setState({selectedWord: args, synonyms: data});
        });
    }

    AddWord(){
        this.setState({synonyms: []});
        this.setState({selectedWord: this.state.searchText});
    }

    render(){
        return (
            <div className="row">
            <img src={logo} className="App-logo" alt="logo" /> 
                
                <div className="col-md-3">
                    <input className="form-control col-md-8" value={this.state.searchText} 
                           onChange={this.Search} placeholder="Search..." />
                
                    <WordList Words={this.state.words} Select={this.SelectWord} Search={this.Search}/>
                    {
                   this.state.words.length === 0 ? 
                        (<div className="form-group text-left pl-3 fload-right">
                            <button className="btn btn-primary form-control" 
                                    onClick={() => this.AddWord()}>
                            Add #{this.state.searchText} to dictionary</button>
                        </div>)
                       :(<div></div>)
                    }
                </div>

                <div className="col-md-8 row pl-5 text-center">
                    <Word Word={this.state.selectedWord} Synonyms={this.state.synonyms} Update={this.Update} />
                </div>
        </div>
        );
    }
}

  
