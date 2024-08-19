import React, { ChangeEvent, FormEvent } from "react";
import axios from 'axios';

const backEndUrl = "http://localhost:8080";

// Define a type for the component state
interface State {
    name: string;
    title: string;
    description: string;
    price: number;
    type: string;
}

export default class AddProductPage extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            name: "",
            title: "",
            description: "",
            price: 0,
            type: ""
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const role = localStorage.getItem("role");
        if (role === "USER" || role === "ANON") {
            window.location.href = "/notAuthorized";
        }
    }

    onChangeName(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            description: e.target.value
        });
    }

    onChangePrice(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            price: parseFloat(e.target.value) // Convert value to number
        });
    }

    onChangeType(e: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            type: e.target.value
        });
    }

    onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Prevent form submission default behavior
        alert(this.state.type);
        axios.post(`${backEndUrl}/product/add`, {
            name: this.state.name,
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            type: this.state.type
        })
            .then((res) => {
                alert(res.status);
            })
            .catch((err) => {
                alert(err);
            });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h3>Add Product {this.state.title}</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input
                        value={this.state.name}
                        onChange={this.onChangeName}
                        id="name"
                        type="text"
                        className="form-control"
                        placeholder="Product name"
                    />
                </div>

                <div className="form-group">
                    <label>Title</label>
                    <input
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                        id="title"
                        type="text"
                        className="form-control"
                        placeholder="Product title"
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        id="description"
                        type="text"
                        className="form-control"
                        placeholder="Product description"
                    />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input
                        value={this.state.price}
                        onChange={this.onChangePrice}
                        id="price"
                        type="number"
                        className="form-control"
                        placeholder="Product price"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="type">Product Type</label>
                    <select
                        onChange={this.onChangeType}
                        className="form-control"
                        id="type"
                        value={this.state.type}
                    >
                        <option value="smartphone">smartphone</option>
                        <option value="laptop">laptop</option>
                        <option value="gaming">gaming</option>
                        <option value="pcpart">pcpart</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Add product</button>
            </form>
        );
    }
}
