import Ember from 'ember';

export default Ember.Route.extend({
    flashMessages: Ember.inject.service(),

    model(params) {
        return this.store.find('crate', params.crate_id).catch(e => {
            if (e.errors.any(e => e.detail === 'Not Found')) {
                this.get('flashMessages').show(`Crate '${params.crate_id}' does not exist`);
                return;
            }
        });
    },

    afterModel(model) {
        if (typeof model.get === 'function') {
            this.setHeadTags(model);
        }
    },

    setHeadTags(model) {
        let headTags = [{
            type: 'meta',
            tagId: 'meta-description-tag',
            attrs: {
                name: 'description',
                content: model.get('description') || 'A package for Rust.'
            }
        }];

        this.set('headTags', headTags);
    }
});
