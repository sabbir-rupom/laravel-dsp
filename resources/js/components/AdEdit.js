import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class AdEdit extends Component {

    constructor(props) {
        super(props);
        let curDate = new Date().toJSON().slice(0, 10);

        this.state = {
            id: null,
            campaign_name: '',
            start_date: curDate,
            end_date: curDate,
            total_budget: 0.0,
            daily_budget: 0.0,
            banner_images: [],
            banner_ids: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMediaChange = this.handleMediaChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        axios.get('/' + `api/ad/campaign/${id}/get`).then(response => {
            let data = response.data.result;
            this.setState({
                id: data.id,
                campaign_name: data.name,
                start_date: data.campaign_start,
                end_date: data.campaign_end,
                total_budget: data.budget_total,
                daily_budget: data.budget_daily,
                banner_images: data.banner_images,
                banner_ids: data.banner_ids,
            });
        });
    }

    handleInputChange(event) {
        let id = event.target.id;

        if(id.includes('name')) {
            this.setState({ campaign_name : event.target.value });
        } else if(id.includes('start')) {
            let t1 = new Date(event.target.value);
            let t2 = new Date(this.state.end_date);
            if(t1 < t2) {
                this.setState({ start_date : event.target.value });
            }
        } else if(id.includes('end')) {
            let t1 = new Date(this.state.start_date);
            let t2 = new Date(event.target.value);
            if(t1 < t2) {
                this.setState({ end_date : event.target.value });
            }
        } else if(id.includes('total')) {
            this.setState({ total_budget : parseFloat(event.target.value) });
        } else if(id.includes('daily')) {
            this.setState({ daily_budget : parseFloat(event.target.value) });
        }
    }
    
    handleMediaChange(e) {
        if (e.target.files) {

            // const clearNode = document.getElementById("media_preview_block");
            // clearNode.innerHTML = '';

            /* Get files in array form */
            const files = Array.from(e.target.files);

            files.forEach((file) => {
                let reader = new FileReader();
                reader.onloadend = () => {
                    this.setState({    
                        banner_images : [...this.state.banner_images, reader.result]
                    });
                }
                reader.readAsDataURL(file);
            });
        }
    }
    
    handleFormSubmit(event) {
        event.preventDefault();
        axios.put('/' + `api/ad/campaign/${this.state.id}/update`, {
            id: this.state.id,
            name: this.state.campaign_name,
            date_start: this.state.start_date,
            date_end: this.state.end_date,
            budget_total: this.state.total_budget,
            budget_daily: this.state.daily_budget,
            banner_images: this.state.banner_images,
        }).then(response => {

            if(response.data.success) {
                
            } else {
                console.log(response);
            }

        }).catch(err => console.log(err));
    }

    buildImgTag(){
        
        return(
            <div className="photo-container">
            { 
                this.state.banner_images.map(imageURI => 
                (<img className="preview-banner" src={imageURI} alt="Preview Banner Images"/>)) 
            }
            </div>
            
        );
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h1>Edit Campaign</h1>

                        <form id="update_form" onSubmit={this.handleFormSubmit}>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Name</label>
                                <div className="col-sm-9">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="input_campaign_name" 
                                        value={this.state.campaign_name}
                                        onChange={this.handleInputChange}
                                        required
                                        placeholder="enter campaign name" 
                                     />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Start Date</label>
                                <div className="col-sm-3">
                                    <input 
                                        type="date" 
                                        className="form-control" 
                                        id="input_start_date" 
                                        value={this.state.start_date}
                                        onChange={this.handleInputChange}
                                    />
                                </div>

                                <label className="col-sm-3 col-form-label">End Date</label>
                                <div className="col-sm-3">
                                    <input 
                                        type="date" 
                                        className="form-control" 
                                        id="input_end_date" 
                                        value={this.state.end_date}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Total Budget</label>
                                <div className="col-sm-3">
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="input_total_budget" 
                                        step="any" 
                                        value={this.state.total_budget}
                                        onChange={this.handleInputChange}
                                    />
                                </div>

                                <label className="col-sm-3 col-form-label">Daily Budget</label>
                                <div className="col-sm-3">
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="input_daily_budget" 
                                        step="any" 
                                        value={this.state.daily_budget}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Banners</label>
                                <div className="col-sm-9">
                                    <div className="custom-file">
                                        <input 
                                            type="file" 
                                            className="custom-file-input" 
                                            id="input_medias" 
                                            accept="image/x-png,image/gif,image/jpeg" 
                                            onChange={this.handleMediaChange}
                                            multiple
                                        />
                                        <label className="custom-file-label">Choose image</label>
                                    </div>
                                </div>
                                <div id="media_preview_block">
                                    {
                                        this.buildImgTag()
                                    }
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <button className="btn btn-success btn-lg mr-2">
                                        Update
                                    </button>
                                    <Link to='/' className="btn btn-warning btn-lg">Show List</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );

    }

}

export default AdEdit;