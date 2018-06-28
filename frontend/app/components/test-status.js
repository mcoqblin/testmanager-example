import Component from '@ember/component';

export default Component.extend({
    actions: {
        testStatusChanged(testId, value) {
            this.get('testStatusChanged')(testId,value);
        }
    }
});
