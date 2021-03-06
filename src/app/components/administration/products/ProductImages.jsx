import React from 'react';
import {VariantStore, ProductTypeStore} from './../../../stores';
import {VariantActions} from './../../../actions';
import _ from 'underscore';
import classnames from 'classnames';
import api from './../../../constants/APIRoutes.js';


class ProductVariants extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            variants: [],
            product: {},
            productAttributes: [],
            newImages: {}
        };

    }

    componentDidMount() {
        VariantStore.addChangeListener(this._onVariantsChange);
    }

    componentWillUnmount() {
        VariantStore.removeChangeListener(this._onVariantsChange);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            project: newProps.project,
            product: newProps.product,
            productAttributes: newProps.productAttributes,
            variants: newProps.variants
        });
    }

    render() {
        var { variants, newImages } = this.state,
            self = this;
        return (
            <div className="panel-body">
                {variants.map(function (variant) {
                    newImages[variant.id] = newImages[variant.id] || {};
                    return (
                        <div key={variant.id} className="panel panel-default">
                            <div className="panel-heading bg-white">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="input-group m-b">
                                            <span className="input-group-addon">SKU</span>
                                            <input type="text"
                                                   className="form-control"
                                                   value={variant.sku}
                                                   disabled/>
                                        </div>
                                    </div>
                                    <div
                                        className="label blue col-sm-2">{variant.isMaster ? 'Master variant' : false}</div>
                                </div>
                                <div className="row">
                                    <form className="form-inline" role="form"
                                          onSubmit={self._addImage.bind(self, variant)}>
                                        <div className="form-group">
                                            <input type="text"
                                                   value={newImages[variant.id].uri}
                                                   onChange={self._onNewImageChange.bind(self, 'uri', variant.id)}
                                                   className="form-control"
                                                   placeholder="Url"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text"
                                                   value={newImages[variant.id].label}
                                                   onChange={self._onNewImageChange.bind(self, 'label', variant.id)}
                                                   className="form-control"
                                                   placeholder="Label"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text"
                                                   value={newImages[variant.id].width}
                                                   onChange={self._onNewImageChange.bind(self, 'width', variant.id)}
                                                   className="form-control"
                                                   placeholder="Width"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text"
                                                   value={newImages[variant.id].height}
                                                   onChange={self._onNewImageChange.bind(self, 'height', variant.id)}
                                                   className="form-control"
                                                   placeholder="Height"/>
                                        </div>
                                        <button
                                            type="submit"
                                            className="pull-right btn btn-icon btn-default waves-effect">
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </form>
                                </div>
                                <div className="row">
                                    <form encType="multipart/form-data">
                                        <input
                                            onChange={self._uploadImage.bind(self, variant)}
                                            onDrop={self._uploadImage.bind(self, variant)}
                                            className="dropzone"
                                            type="file"
                                            name="image"/>
                                    </form>
                                </div>
                            </div>
                            <div className="panel-body">
                                {variant.images.map(function (img) {
                                    return (
                                        <div key={img.id} className="inline well">
                                            <img src={img.uri} className="b p-xs img-rounded" width="150"
                                                 height="110"/>
                                            <a onClick={self._removeImage.bind(self, img.id)}
                                               className="glyphicon glyphicon-remove vtop"></a>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    )
                })}
            </div>
        )
    }

    _onVariantsChange() {

    }

    _onNewImageChange(field, variantId, e) {
        var newImages = this.state.newImages;
        newImages[variantId][field] = e.target.value;
        this.setState({newImages: newImages});
    }

    _addImage(variant, e) {
        var newImages = this.state.newImages,
            image = newImages[variant.id];
        image.variant = variant.id;
        image.product = variant.product;
        VariantActions.addImage(image);
        e.preventDefault();
    }

    _uploadImage(variant, e) {
        var file,
            image = new FormData();
        if (e.dataTransfer) {
            file = e.dataTransfer.files[0];
        } else {
            file = e.target.files[0];
        }
        image.append('image', file);
        VariantActions.uploadImage(image, variant);
        e.preventDefault();
    }

    _removeImage(imageId) {
        VariantActions.removeImage(imageId);
    }

}

export default ProductVariants
