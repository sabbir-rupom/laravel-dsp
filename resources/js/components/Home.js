import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            campaigns : []
        };
    }

    componentDidMount() {
        axios.get('api/ad/campaigns')
            .then(response => {
                this.setState({
                    campaigns : response.data
                });
            }).catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h1>
                            All Advertise Campaigns
                            <Link to="/ad/campaign/new" className="btn btn-primary float-right">Add New</Link>
                        </h1>

                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Campaign Name</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Total Budget ($)</th>
                                        <th>Daily Budget ($)</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.campaigns !== null
                                            ? this.state.campaigns.map(ad => (
                                                <tr key={ad.id}> 
                                                    <td>{ ad.name }</td>
                                                    <td>{ ad.campaign_start }</td>
                                                    <td>{ ad.campaign_end }</td>
                                                    <td>{ ad.budget_total }</td>
                                                    <td>{ ad.budget_daily }</td>
                                                    <td>
                                                        <Link to={`/ad/campaign/${ad.id}/edit`} className="btn btn-primary btn-sm">edit</Link>
                                                    </td>
                                                </tr>
                                            )) : null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    
}

export default Home;