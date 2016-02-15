import MainPageConstants from './../constants/MainPageConstants.js';
import AppDispatcher from './../AppDispatcher.js';
import api from './../constants/APIRoutes.js';
import BaseStore from './BaseStore.js';
import _ from 'underscore';

var EventEmitter = require('events').EventEmitter;


function getProductVariants(productId) {
    api.request({
        method: 'GET',
        url: `${api.PRODUCTS}/${productId}/variants`,
        success: function (res) {
            VariantStore.selectedVariants = res.variants;
            VariantStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function createVariant(variant) {
    api.request({
        method: 'POST',
        url: api.VARIANTS,
        data: variant,
        success: function (res) {
            //VariantStore.selectedVariants.push(res.variant);
            //VariantStore.emitChange();
            getProductVariants(variant.product);
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function removeVariant(variantId) {
    api.request({
        method: 'DELETE',
        url: `${api.VARIANTS}/${variantId}`,
        success: function (res) {
            VariantStore.selectedVariants = _.reject(VariantStore.selectedVariants, {id: variantId});
            VariantStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function updateAttribute(variantAttr) {
    api.request({
        method: 'PUT',
        url: `${api.VARIANT_ATTRIBUTES}/${variantAttr.id}`,
        data: variantAttr,
        success: function (res) {
            var attr = res.attribute,
                variant = _.findWhere(VariantStore.selectedVariants, {id: attr.variant}),
                variantAttr = _.findWhere(variant.attributes, {id: attr.id});
            variantAttr.value = attr.value;
            VariantStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

var VariantStore = Object.assign({}, BaseStore, EventEmitter.prototype, {
    variant: null,
    selectedVariants: []
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case MainPageConstants.GET_PRODUCT_VARIANTS:
            getProductVariants(action.productId);
            break;
        case MainPageConstants.CREATE_VARIANT:
            createVariant(action.variant);
            break;
        case MainPageConstants.REMOVE_VARIANT:
            removeVariant(action.variantId);
            break;
        case MainPageConstants.UPDATE_VARIANT_ATTRIBUTE:
            updateAttribute(action.variantAttr);
            break;
    }
});

export default VariantStore
