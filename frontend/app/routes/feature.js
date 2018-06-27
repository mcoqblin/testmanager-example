import Route from '@ember/routing/route';

export default Route.extend({
    model(params) {
        return this.get('store').findRecord('feature', params.feature_id, { include: 'tests'});
    },

    actions: {
        error(error) {
            if ((error.errors[0].status === '404')
                || (error.errors[0].status === '500')) {
                this.replaceWith('features');
            }
            else {
                return true;
            }
        }
    }
});
