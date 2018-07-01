import Service from '@ember/service';

const LOG_STATUS_LOG =      0;
const LOG_STATUS_SUCCESS =  1;
const LOG_STATUS_FAILURE =  2;

export default Service.extend({
    logStatus: LOG_STATUS_LOG,
    logMessage: '',
    
    setStatusToLog() {
        this.set('logStatus', LOG_STATUS_LOG);
    },
    
    setStatusToSuccess() {
        this.set('logStatus', LOG_STATUS_SUCCESS);
    },
    
    setStatusToFailure() {
        this.set('logStatus', LOG_STATUS_FAILURE);
    },

    isStatusLog() {
        return (this.get('logStatus') === LOG_STATUS_LOG);
    },

    isStatusSuccess() {
        return (this.get('logStatus') === LOG_STATUS_SUCCESS);
    },

    isStatusFailure() {
        return (this.get('logStatus') === LOG_STATUS_FAILURE);
    },

    log(message) {
        console.log(message);
        this.setStatusToLog();
        this.set('logMessage', message);
    },
    
    success(message) {
        console.log(message);
        this.setStatusToSuccess();
        this.set('logMessage', message);
    },
    
    failure(message) {
        console.error(message);
        this.setStatusToFailure();
        this.set('logMessage', message);
    }
});
