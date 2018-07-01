import Component from '@ember/component';
import { computed, observer } from '@ember/object';

export default Component.extend({
    classNames: ['log-window'],
    classNameBindings: ['logStatusClassName','showLog:show-log:hide-log'],

    showLog: false,

    logStatusClassName: computed('logger.logStatus', function() {
        let logger = this.get('logger');
        if (logger.isStatusSuccess())
            return 'log-success';
        if (logger.isStatusFailure())
            return 'log-failure';
        return 'log-log';
    }),

    onLogMessageChanged: observer('logger.logMessage', function() {
        this.set('showLog', true);
    }),

    actions: {
        onHide() {
            this.set('showLog', false);
        }
    }
});
